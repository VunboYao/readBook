import { nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, Ref, watch } from 'vue'
import { useTouch } from './use-touch'
import { getScrollParent } from './useScrollParent'

let totalLockCount = 0

const BODY_LOCK_CLASS = 'ut-overflow-hidden'

export function useLockScroll(rootRef: Ref<HTMLElement | undefined>, shouldLock: () => boolean) {
  const touch = useTouch()
  const DIRECTION_UP = '01'
  const DIRECTION_DOWN = '10'

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event)

    const direction = touch.deltaY.value > 0 ? DIRECTION_DOWN : DIRECTION_UP
    const el = getScrollParent(event.target as Element, rootRef.value) as HTMLElement

    /*
			scrollHeight, 包括隐藏的整体高度
			offsetHeight, 元素外部高度
			scrollTop, 元素滚动的高度
		*/
    const { scrollHeight, offsetHeight, scrollTop } = el
    let status = '11'

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01'
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10'
    }

    /*
      00: 弹窗高度和实际高度一致
      01: 实际高度 < 真实高度，且滚动到最顶部时。 阻止滚动
      10: 实际高度 < 真实高度，且滚动到最底部时。 阻止滚动
      11: 实际高度 < 真实高度，滚动处于中间值，未达到顶部/底部。 不阻止滚动

      方向:
      01: 上
      10: 下
    */

    if (
      status !== '11' &&
			touch.isVertical()
			&& !(parseInt(status, 2) & parseInt(direction, 2))
    ) {
      preventDefault(event, true)
    }
  }

  const lock = () => {
    document.addEventListener('touchstart', touch.start)
    document.addEventListener('touchmove', onTouchMove, { passive: false })

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS)
    }

    totalLockCount++
  }

  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start)
      document.removeEventListener('touchmove', onTouchMove)
    }

    totalLockCount--

    if (!totalLockCount) {
      document.body.classList.remove(BODY_LOCK_CLASS)
    }
  }

  const init = () => shouldLock() && lock()

  const destroy = () => shouldLock() && unlock()

  onMountedOrActivated(init)
  onDeactivated(destroy)
  onBeforeUnmount(destroy)

  watch(shouldLock, (value) => {
    value ? lock() : unlock()
  })
}

export const stopPropagation = (event: Event) => event.stopPropagation()

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

export function onMountedOrActivated(hook: () => any) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}

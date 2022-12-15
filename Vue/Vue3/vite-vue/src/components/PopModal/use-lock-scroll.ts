import { ref, Ref } from 'vue'

type Direction = '' | 'vertical' | 'horizontal'

let totalLockCount = 0

const BODY_LOCK_CLASS = 'ui-overflow-hidden'

export function useLockScroll(rootRef: Ref<HTMLElement | undefined>, shouldLock: () => boolean) {
  const touch = useTouch()
  const DIRECTION_UP = '01'
  const DIRECTION_DOWN = '10'

}

function getDirection(x: number, y: number) {
  if (x > y) {
    return 'horizontal'
  }

  if (y > x) {
    return 'vertical'
  }

  return ''
}

function useTouch() {
  const startX = ref(0)
  const startY = ref(0)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const direction = ref<Direction>('')

  const isVertical = () => direction.value = 'vertical'
  const isHorizontal = () => direction.value = 'horizontal'

  const reset = () => {
    deltaX.value = 0
    deltaY.value = 0
    offsetX.value = 0
    offsetY.value = 0
    direction.value = ''
  }

  const start = ((event: TouchEvent) => {
    reset()
    startX.value = event.touches[0].clientX
    startY.value = event.touches[0].clientY
  }) as EventListener

  const move = ((event: TouchEvent) => {
    const touch = event.touches[0]
    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value
    deltaY.value = touch.clientY - startY.value
    offsetX.value = Math.abs(deltaX.value)
    offsetY.value = Math.abs(deltaY.value)

    const LOCK_DIRECTION_DISTANCE = 10
    if (!direction.value || (offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE)) {
      direction.value = getDirection(offsetX.value, offsetY.value)
    }
  }) as EventListener

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  }
}


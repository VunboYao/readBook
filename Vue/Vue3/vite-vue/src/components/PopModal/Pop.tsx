
import { defineComponent, PropType } from 'vue'
import classes from './index.module.less'
import { DialogAction } from '@/components/PopModal/types'

export default defineComponent({
  props: {
    imgSrc: String,
    show: {
      type: Boolean,
      default: false,
    },
    // 关闭弹窗方法
    close: {
      type: Function as PropType<(value: DialogAction) => void>,
      default: () => null,
    },
  },
  setup(props) {

    const method1 = () => {
      console.log('handlelogic')
      props.close('cancel')
    }
    const Demo1 = () => {
      const { close, imgSrc } = props
      return (
        <div class={classes.wrap}>
          <img src={imgSrc} alt="guide"/>
          <button onClick={() => close('confirm')}>确定</button>
          <button onClick={() => method1()}>取消</button>
        </div>
      )
    }

    return () => {
      const { show } = props

      return show && Demo1()
    }
  },
})

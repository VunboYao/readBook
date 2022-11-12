import { defineComponent, PropType, reactive, ref, render } from 'vue'
import { callInterceptor, ComponentInstance, DialogAction, Interceptor, makeStringProp, numericProp, truthProp, unknownProp } from './types'

export default defineComponent({
  name: 'DialogComponent',
  props: {
    title: String,
    show: Boolean,
    width: numericProp,
    beforeClose: Function as PropType<Interceptor>,
    showCancelButton: truthProp,
    showConfirmButton: truthProp,
    cancelButtonText: String,
    confirmButtonText: String,
    cancelButtonColor: String,
    confirmButtonColor: String,
    allowHtml: Boolean,
    className: unknownProp,
    transition: makeStringProp('default'),
    callback: Function as PropType<(action?: DialogAction) => void>,
  },
  emits: ['confirm', 'cancel', 'close', 'update:show'],
  setup(props, { emit, slots }) {
    const loading = reactive({
      confirm: false,
      cancel: false,
      close: false,
    })

    const updateShow = (value: Boolean) => emit('update:show', value)
    const close = (action: DialogAction) => {
      updateShow(false)
      props.callback?.(action)
    }

    const getActionHandler = (action: DialogAction) => () => {
      if (!props.show) {
        return
      }

      emit(action)

      if (props.beforeClose) {
        loading[action] = true
        callInterceptor(props.beforeClose, {
          args: [action],
          done() {
            close(action)
            loading[action] = false
          },
          canceled() {
            loading[action] = false
          },
        })
      } else {
        close(action)
      }
    }

    const onCancel = getActionHandler('cancel')
    const onConfirm = getActionHandler('confirm')
    const onClose = getActionHandler('close')

    return () => {
      const {
        title,
        cancelButtonText,
        cancelButtonColor,
        confirmButtonText,
        confirmButtonColor,
        showCancelButton,
        showConfirmButton,
        show,
      } = props
      return (
        show &&
        <div>
          <h1>{title}</h1>
          <div>
            {showCancelButton && <button
              style={{ 'color': cancelButtonColor }}
              onClick={onCancel}
            >{cancelButtonText}</button>}
            {showConfirmButton && <button
              style={{ 'color': confirmButtonColor }}
              onClick={onConfirm}
            >{confirmButtonText}</button>}
          </div>
        </div>
      )
    }
  },
})

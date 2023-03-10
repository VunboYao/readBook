import { PureComponent } from 'react'
import { StoreContext } from './context'

export function connect(mapStateToProps, mapDispatchToProps) {
  return function(WrapperComponent) {
    class NewComponent extends PureComponent {
      // 第二个参数是context
      constructor(props, context) {
        super(props)

        this.state = mapStateToProps(context.getState())
      }

      componentDidMount() {
        // 组件订阅，获取mapState中的数据，赋值更新
        this.unsubscribe = this.context.subscribe(() => {
          this.setState(mapStateToProps(this.context.getState()))
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return (
          /*
          * 1.传入默认 props
          * 2. state
          * 3. mapDispatchToProps的方法
          *  */
          <WrapperComponent
            {...this.props}
            {...this.state}
            {...mapDispatchToProps(this.context.dispatch)}
          />
        )
      }
    }

    // !指定contextType的类型
    NewComponent.contextType = StoreContext

    return NewComponent
  }
}

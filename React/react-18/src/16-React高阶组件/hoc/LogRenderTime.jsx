import { PureComponent } from 'react'

function LogRenderTime(OriginComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props)
      this.beginTime = new Date().getTime()
    }

    componentDidMount() {
      this.endTime = new Date().getTime()
      const interval = this.endTime - this.beginTime
      console.log(`Render ${OriginComponent.name} Page cost ${interval}ms`)
    }

    render() {
      return <OriginComponent {...this.props}/>
    }
  }
}
export default LogRenderTime

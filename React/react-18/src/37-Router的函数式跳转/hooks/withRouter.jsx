import { useNavigate } from 'react-router-dom'

export default function withRouter(WrapperComponent) {
  /* !函数组件,参数是 props */
  return (props) => {
    /* Hooks必须在函数内部声明 */
    const navigate = useNavigate()

    /* !通过 router属性将导航方法传递到组件props上 */
    return <WrapperComponent {...props} router={{ navigate }}/>
  }
}

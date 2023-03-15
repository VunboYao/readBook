import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function withRouter(WrapperComponent) {
  /* !函数组件,参数是 props */
  return (props) => {
    /* Hooks必须在函数内部声明 */
    const navigate = useNavigate()

    /* 动态路由获取参数 */
    const params = useParams()

    // 当前路径的相关信息
    const location = useLocation()

    /* 查询字符串的参数获取 */
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)

    /* !通过 router属性将导航方法传递到组件props的router上 */
    return <WrapperComponent {...props} router={{ navigate, params, query, location }}/>
  }
}

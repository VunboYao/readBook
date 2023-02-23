import { UserContext } from './context'

export default function GrandchildFunc() {
  return (
   <>
     <h2>Func-consumer:</h2>
    {/*  函数中只能使用consumer的方式获取祖先数据 */}
    <UserContext.Consumer>
      {
        value => <h3>user: {value.nickName}</h3>
      }
    </UserContext.Consumer>
   </>
  )
}

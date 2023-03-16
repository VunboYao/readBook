import { memo, useContext } from 'react'
import { ThemeContext, UserContext } from './context'

/* const Home = memo(() => {
  return (
    <div>
      {/!* 嵌套，过于繁琐 *!/}
      <ThemeContext.Consumer>
        {
          (value) => {
            const { color, fontSize } = value
            return (
              <div>
                <span style={{ color, fontSize }}>Theme Consumer</span>

                <UserContext.Consumer>
                  {
                    (value) => {
                      return <h2>User: {value.name}-{value.age}</h2>
                    }
                  }
                </UserContext.Consumer>
              </div>
            )
          }
        }
      </ThemeContext.Consumer>
    </div>
  )
}) */

const Home = memo(() => {
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)

  const { color, fontSize } = theme
  return (
    <div>
      <span style={{ color, fontSize }}>Theme Consumer</span>
      <h2>User: {user.name}-{user.age}</h2>
    </div>
  )
})

export default Home

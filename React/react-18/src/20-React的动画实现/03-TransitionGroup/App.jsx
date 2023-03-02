import { PureComponent, createRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './style.css'

class App extends PureComponent {
  state = {
    friends: [
      { id: 1, name: 'Emma', nodeRef: createRef() },
      { id: 2, name: 'Duo', nodeRef: createRef() },
      { id: 3, name: 'Lisa', nodeRef: createRef() },
    ],
  }

  handleAdd() {
    const newFriend = { id: new Date().getTime(), name: 'Ben', nodeRef: createRef() }
    const friends = [...this.state.friends, newFriend]
    this.setState({
      friends,
    })
  }

  handleRemove(index) {
    const newFriends = [...this.state.friends]
    newFriends.splice(index, 1)
    this.setState({
      friends: newFriends,
    })
  }

  render() {
    const { friends } = this.state

    return (
      <div>
        <h2>My Friends</h2>

        {/* 默认div包裹，如果不希望被包裹，可以传入 null  */}
        <TransitionGroup component={'ul'}>
          {
            friends.map((item, index) => {
              return (
                <CSSTransition
                  key={item.id}
                  classNames={'friend'}
                  timeout={500}
                  nodeRef={item.nodeRef}
                >
                  {/*! nodeRef问题 */}
                  <li ref={item.nodeRef}>
                    <span>{item.name}</span>
                    <button onClick={() => this.handleRemove(index)}>Del</button>
                  </li>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>

        <button onClick={() => this.handleAdd()}>AddFriend</button>
      </div>
    )
  }
}

export default App

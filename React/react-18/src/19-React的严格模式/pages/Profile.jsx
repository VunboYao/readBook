import { PureComponent } from 'react'

class Profile extends PureComponent {
  constructor(props) {
    super(props)
    console.log('Profile: Constructor')
  }

  UNSAFE_componentWillMount() {
    console.log('Profile: UNSAFE_componentWillMount')
  }

  render() {
    console.log('Profile: Render')
    return (
      <div>
        {/* eslint-disable-next-line react/no-string-refs */}
        <h2 ref={'title'}>Profile Page</h2>
      </div>
    )
  }
}

export default Profile

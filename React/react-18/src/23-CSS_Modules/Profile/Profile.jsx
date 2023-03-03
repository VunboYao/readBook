import { PureComponent } from 'react'
import profileStyle from './Profile.module.css'

class Profile extends PureComponent {
  render() {
    return (
      <div>
        <div className={profileStyle.section}>Profile Section</div>
      </div>
    )
  }
}

export default Profile

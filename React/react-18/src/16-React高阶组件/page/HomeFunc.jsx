import enhancedUserInfo from '../hoc/enhanced_props'

export const Home = enhancedUserInfo((props) => {
  return <h1>Home: {props.name}-{props.age}-{props.banners}</h1>
})

export const Profile = enhancedUserInfo((props) => {
  return <h2>Profile: {props.name}-{props.age}</h2>
})

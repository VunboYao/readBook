export default function loginAuth(OriginComponent) {
  return (props) => {
    const token = localStorage.getItem('token')

    if (token) {
      return <OriginComponent {...props}/>
    } else {
      return <h2>Please login, while will redirect to page</h2>
    }
  }
}

import ThemeContext from '../context/ThemeContext'

export default function(OriginComponent) {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {
          // !将 context 数据和 props 数据统一增强至组件中
          value => <OriginComponent {...props} {...value}/>
        }
      </ThemeContext.Consumer>
    )
  }
}

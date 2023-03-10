import { PureComponent } from 'react'
import ThemeContext from './context/ThemeContext'
import ProductHoc from './page/ProductHOC'
import ProductOld from './page/ProductOld'

class App extends PureComponent {
  render() {
    return (
     <>
       <ThemeContext.Provider value={{ color: 'blue', size: 30 }}>
         {/* 单独使用consumer的方式获取数据 */}
         <ProductOld/>

         {/* 将consumer封装到hoc中，value与props植入增强 */}
         <ProductHoc/>
       </ThemeContext.Provider>
     </>
    )
  }
}

export default App

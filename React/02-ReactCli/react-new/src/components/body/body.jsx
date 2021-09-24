import React, { Component } from 'react'
import './body.css'
// TODO: context上下文从组件中获取。默认值仅在无法在父级查询到Provider时生效
const Ctx = React.createContext('VunboYao')
// TODO: 获取组件中的两个容器生产者与消费者
const { Provider, Consumer } = Ctx
export default class index extends Component {
  render() {
    return (
      // TODO：父级组件生命Provider并传递后辈组件需要的数据
      <Provider value={{ name: 'Vunbo' }}>
        <h3 className={'body'}>I am body</h3>
        <Son />
      </Provider>
    )
  }
}

class Son extends Component {
  render() {
    // TODO：后代组件通过Consumer中的value获取数据
    return <Consumer>{value => <h1>i am Son follow body, {value.name}</h1>}</Consumer>
  }
}

/*
TODO: 第二种方式:
1.声明上下文时就传递初始数据
const Ctx = React.createContext({name:VunboYao,age: 27})
2.则后代组件
可通过静态属性声明并获取：static contextType = Ctx
组件中则可通过this.context读取相关的属性
*/

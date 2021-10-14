import React,{PureComponent} from 'react'

// Context上下文
const hocContext = React.createContext({})
// 提取内置元素
const {Provider, Consumer} = hocContext

// 高阶组件实现
class Son3 extends PureComponent{
	render() {
		return (
				<>
					<p>{this.props.name}</p>
					<p>{this.props.age}</p>
				</>
		)
	}
}
class Son4 extends PureComponent{
	render() {
		return (
				<ul>
					<li>{this.props.name}</li>
					<li>{this.props.age}</li>
				</ul>
		)
	}
}
// 封装父组件生成：内置consumer，并想子组件传递props
const GenFather = function (Son) {
	return class father extends PureComponent{
		render() {
			return (
						<Consumer>
							{
								value => {
									return (<Son name={value.name} age={value.age}/>)
								}
							}
						</Consumer>
			)
		}
	}
}
const Father3 = GenFather(Son3)
const Father4 = GenFather(Son4)

export default class HOC extends PureComponent{
	render() {
		return (
				<>
					<Provider value={{name: 'yyb', age: '20'}}>
						<h3>传统的Provider实现</h3>
						<Father1/>
						<Father2/>
						<h3>高阶组件-1</h3>
						<Father3/>
						<Father4/>
					</Provider>
				</>
		)
	}
}

// 常规Context上下文方式
class Father1 extends PureComponent{
	render() {
		return (
				<div>
					<h2>Father1</h2>
					<Son1/>
				</div>
		)
	}
}
class Father2 extends PureComponent{
	render() {
		return (
				<div>
					<h2>Father2</h2>
					<Son2/>
				</div>
		)
	}
}
class Son1 extends PureComponent{
	render() {
		return (
				<Consumer>
					{
						value => (
								<>
									<p>{value.name}</p>
									<p>{value.age}</p>
								</>
						)
					}
				</Consumer>
		)
	}
}
class Son2 extends PureComponent{
	render() {
		return (
				<Consumer>
					{
						value => (
								<ul>
									<li>{value.name}</li>
									<li>{value.age}</li>
								</ul>
						)
					}
				</Consumer>
		)
	}
}

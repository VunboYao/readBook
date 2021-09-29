import React,{PureComponent} from 'react'
const hocContext = React.createContext({})
const {Provider, Consumer} = hocContext

export default class HOC extends PureComponent{
	render() {
		return (
				<>
					<Provider value={{name: 'yyb', age: '20'}}>
						<Father1/>
						<Father2/>
					</Provider>
				</>
		)
	}
}

class Father1 extends PureComponent{
	render() {
		return (
				<div>
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
				</div>
		)
	}
}
class Father2 extends PureComponent{
	render() {
		return (
				<div>
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
				</div>
		)
	}
}
class Son1 extends PureComponent{
	render() {
		return (
				<div>
					Son1
				</div>
		)
	}
}
class Son2 extends PureComponent{
	render() {
		return (
				<div>
					Son2
				</div>
		)
	}
}

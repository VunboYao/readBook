import React, {PureComponent} from 'react'
import './control.css'


const FnRef = React.forwardRef(function (props, fnRef) {
		return (
				<>
					<h4>函数式获取到的props:{props.name}</h4>
					<h4 ref={fnRef}>我是函数式的ref</h4>
				</>
		)
})
export default class Control extends PureComponent{
	state = {
		name: 'yyb',
		text: '',
		cbText: '',
		objText: '',
		fnText: ''
	}
	// 对象形式ref
	objRef = React.createRef()

	onChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	// 废弃的ref
	onRefStr = () => {
		const node = this.refs.name.textContent
		// 回调函数形式的setState声明
		this.setState((state,props) => ({text: node}), () => {
			console.log('state更新回调')
		})
	}

	// 回调的Ref捕获
	onRefCb = () => {
		this.setState({cbText: this.refCallback.textContent})
	}
	// 对象回调捕获。通过current获取
	onRefObj = () => {
		this.setState({objText: this.objRef.current.textContent})
	}

	// 函数式ref
	onFnRef = () => {
		this.setState(() => ({fnText: this.fnRef.innerText}))
	}
	render(){
		const {name, text, cbText, objText, fnText} = this.state
		return (
				<>
					<input type="text" value={name} onChange={this.onChange}/>
					<div className={'border'}>
						<h2 ref='name'>Ref测试</h2>
						<button onClick={this.onRefStr}>ref字符串捕获</button>
						<p>捕获的内容：{text}</p>
					</div>
					<div className={'border'}>
						<h2 ref={n => this.refCallback=n}>回调函数形式Ref</h2>
						<button onClick={this.onRefCb}>回调Ref捕获</button>
						<p>捕获的内容: {cbText}</p>
					</div>
					<div className={'border'}>
						<h2 ref={this.objRef}>对象的Ref</h2>
						<button onClick={this.onRefObj}>对象Ref</button>
						<p>捕获的内容: {objText}</p>
					</div>
					<div className="border">
						<FnRef ref={e => this.fnRef = e} name={'fnRef'} />
						<button onClick={this.onFnRef}>函数时Ref捕获</button>
						<p>捕获的内容: {fnText}</p>
					</div>
				</>
		)
	}
}

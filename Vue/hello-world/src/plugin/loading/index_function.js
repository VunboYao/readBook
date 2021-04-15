/* 函数式组件 */

import Loading from './loading.vue'; // 引入模板文件
import Vue from 'vue'

// 1.创建构造函数
const LoadingConstructor = Vue.extend(Loading)
let instance

// 2.创建方法
const main = (options, resolve, reject) => {
	if (instance) return
	// 2.1 el 挂载方式: 只在用 new 创建实例时生效。提供的元素只能作为挂载点。所有的挂载元素会被Vue生成的DOM替换。
	/*instance = new LoadingConstructor({
		el: document.createElement('div')
	})
	document.body.appendChild(instance.$el)*/

	// 2.1 手动挂载
	instance = new LoadingConstructor()
	const tag = document.createElement('div')
	document.body.appendChild(tag)
	instance.$mount(tag)

	// 2.2 参数处理
	if (!options || typeof options === 'function') {
		// 如果没有options，默认第一个是成功回调，第二个传关闭回调
		instance.resolve = options || function (){}
	} else {
		// 遍历传入的属性，取key、value值传入到实例属性中
		for (const [k,v] of Object.entries(options)) {
			instance[k] = v
		}
		instance.resolve = resolve || function () {}
		instance.reject = reject || function () {}
	}

	// 2.3实例关闭方法
	instance.close = () => {
		// 注销元素
		if (!instance) return
		instance.visible = false
		document.body.removeChild(instance.$el)
		instance = undefined
	}

	// 2.4显示元素
	Vue.nextTick(() => {
		instance.visible = true
	})
}

// 3.暴露关闭方法给外部使用
main.close = () => {
	if (!instance) return
	instance.close()
}

export default main

module.exports = {
	presets: [
		['@babel/preset-env', {
			// targets: 'last 2 version'
			/*targets: {
			"edge": "17",
			"firefox": "60",
			"chrome": "67",
			"safari": "11.1"
		}*/
			// 如何使用polyfill
			// false: 不使用polyfill来进行适配
			// usage: 自动检测所需要的polyfill
			// entry: 在入口文件中添加 `import 'core-js/stable'; import 'regenerator-runtime/runtime'; 这样做会根据 browserslist 目标导入所有的polyfill，但是对应的包也会变大
			/*useBuiltIns: 'usage',
			corejs: 3.8 // 设置corejs的版本，目前使用较多的是3.x的版本*/
		}],
		['@babel/preset-react']
	],
	// 工具库使用方式
	/*plugins: [
		['@babel/plugin-transform-runtime', {
			corejs: 3
		}]
	]*/
}

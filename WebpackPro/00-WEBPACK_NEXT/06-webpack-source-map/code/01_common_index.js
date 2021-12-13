/*
* 模块管理：
* key是模块路径，
* value是模块内容（函数）
* */
var __webpack_modules__ = {
	"./src/js/common.js":
			((module) => {
				const dateFormat = date => {
					return '2020-12-12'
				}
				const priceFormat = price => {
					return '100.00'
				}
				// 【4.将需要返回的方法暴露给传入的module的exports】
				module.exports = {
					dateFormat, priceFormat
				}
			})
}
// The module cache 【模块缓存】
var __webpack_module_cache__ = {
	/*"./src/js/common.js": {
		exports: {}
	}*/
}

// The require function 【2.require函数的实现】
function __webpack_require__(moduleId) {
	// Check if module is in cache【2.1检查缓存】
	var cachedModule = __webpack_module_cache__[moduleId]
	if (cachedModule !== undefined) {
		return cachedModule.exports
	}
	// Create a new module (and put it into the cache)【2.2利用对象引用地址内存共享问题，实现对数据的同步更新。更新缓存moduleId】
	var module = __webpack_module_cache__[moduleId] = {
		// no module.id needed
		// no module.loaded needed
		exports: {}
	}

	// Execute the module function【2.3执行模块代码,参数：模块，模块的导出，模块内第三方require使用的方法】
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__)

	// Return the exports of the module【2.4导出module.exports{dateFormat: Fun, priceFormat: Func}】
	return module.exports
}

/*********************************【1.开始执行代码逻辑】***************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
	const {dateFormat, priceFormat} = __webpack_require__("./src/js/common.js")
	console.log(dateFormat('abc'))
	console.log(priceFormat('abc'))
})()

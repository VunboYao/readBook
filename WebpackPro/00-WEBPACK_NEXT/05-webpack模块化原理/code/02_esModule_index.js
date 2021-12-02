// 定义一个对象。存放模块的映射。key：路径，value：函数
var __webpack_modules__ = ({
	"./src/js/esmodule.js":
			(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				// 【2.1记录为一个__esModule：true】
				__webpack_require__.r(__webpack_exports__)
				// 【2.2为module.exports中的key进行代理。exports中没有对应的函数】
				__webpack_require__.d(__webpack_exports__, {
					"sum": () => (sum),
					"multiple": () => (multiple)
				})

				const sum = (a, b) => {
					console.log(a + b)
				}
				const multiple = (a, b) => {
					console.log(a * b)
				}
			}
})

// The module cache 【模块的缓存】
var __webpack_module_cache__ = {}

// The require function 【require函数的实现】
function __webpack_require__(moduleId) {
	// Check if module is in cache
	var cachedModule = __webpack_module_cache__[moduleId]
	if (cachedModule !== undefined) {
		return cachedModule.exports
	}
	// Create a new module (and put it into the cache)
	var module = __webpack_module_cache__[moduleId] = {
		// no module.id needed
		// no module.loaded needed
		exports: {}
	}

	// Execute the module function
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__)

	// Return the exports of the module
	return module.exports
}

// define getter functions for harmony exports【定义getter方法进行代理，实现快速访问】
__webpack_require__.d = (exports, definition) => {
	for (var key in definition) {
		// 判断对象本身是否包含此属性且exports当前没有
		if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
			// 将key赋值到exports属性上。并将其getter属性映射为definition[key]
			Object.defineProperty(exports, key, {enumerable: true, get: definition[key]})
		}
	}
}

// webpack/runtime/hasOwnProperty shorthand 【判断是否包含某属性】
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

/* webpack/runtime/make namespace object */
// define __esModule on exports 【给module.exports定义一个：__esModule标识】
__webpack_require__.r = (exports) => {
	if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'})
	}
	Object.defineProperty(exports, '__esModule', {value: true})
}

/********************************【1.函数开始执行】**************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
	// 【1.1标识：__esModule】
	__webpack_require__.r(__webpack_exports__)
	// 【1.2执行】_js_esmodule_js__WEBPACK_IMPORTED_MODULE_0__ = exports
	var _js_esmodule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/esmodule.js");

	(0, _js_esmodule_js__WEBPACK_IMPORTED_MODULE_0__.multiple)(20, 30)
	;(0, _js_esmodule_js__WEBPACK_IMPORTED_MODULE_0__.sum)(20, 30)

})()


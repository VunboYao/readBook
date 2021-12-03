var __webpack_modules__ = ({
	"./src/js/common.js":
			(module) => {
				const dateFormat = date => {
					return '2020-12-12'
				}
				const priceFormat = price => {
					return '100.00'
				}
				module.exports = {
					dateFormat,
					priceFormat
				}
			},

	"./src/js/esmodule.js":
			(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				// 【__esModule：true 标识】
				__webpack_require__.r(__webpack_exports__)
				// 【对exports中的key进行数据代理。getter function】
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
// The module cache
var __webpack_module_cache__ = {}

// The require function
function __webpack_require__(moduleId) {
	// Check if module is in cache
	var cachedModule = __webpack_module_cache__[moduleId]
	if (cachedModule !== undefined) {
		return cachedModule.exports
	}
	// Create a new module (and put it into the cache)
	var module = __webpack_module_cache__[moduleId] = {
		exports: {}
	}

	// Execute the module function
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__)

	// Return the exports of the module
	return module.exports
}

/* webpack/runtime/compat get default export */
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = (module) => {
	// 【es模块，则返回module['default']，否则直接返回】
	var getter = module && module.__esModule ?
			() => (module['default']) :
			() => (module)
	__webpack_require__.d(getter, {a: getter})
	return getter
}

// define getter functions for harmony exports【定义对象中key的计算属性，getter方法数据代理】
__webpack_require__.d = (exports, definition) => {
	for (var key in definition) {
		if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
			Object.defineProperty(exports, key, {enumerable: true, get: definition[key]})
		}
	}
}

/* webpack/runtime/hasOwnProperty shorthand */
// 【自有属性判断】
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

/* webpack/runtime/make namespace object */
// define __esModule on exports 【exports中添加__esModule：true 标识】
__webpack_require__.r = (exports) => {
	if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'})
	}
	Object.defineProperty(exports, '__esModule', {value: true})
}

/**********************************【1.代码开始执行】**************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
	// 【1.1“./src/index.js”入口文件。标识为__esModule】
	__webpack_require__.r(__webpack_exports__)
	/* harmony import */
	var _js_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/common.js") // commonjs导出，es导入
	/* harmony import */
	var _js_common__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_js_common__WEBPACK_IMPORTED_MODULE_0__)
	const {multiple, sum} = __webpack_require__("./src/js/esmodule.js") // es导出，commonJS导入


	multiple(20, 30)
	sum(20, 30)

	console.log(
			_js_common__WEBPACK_IMPORTED_MODULE_0__.dateFormat(),
			_js_common__WEBPACK_IMPORTED_MODULE_0__.priceFormat()
	)
})()

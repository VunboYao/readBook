var __webpack_modules__ = ({
	"./src/js/esmodule.js":
			(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				// 【3.1记录标识__esModule: true】
				__webpack_require__.r(__webpack_exports__)
				// 【3.2为module.exports中的key进行代理。exports中没有对应的函数】
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
var __webpack_module_cache__ = {}

// The require function
function __webpack_require__(moduleId) {
	// Check if module is in cache【2.1缓存判断】
	var cachedModule = __webpack_module_cache__[moduleId]
	if (cachedModule !== undefined) {
		return cachedModule.exports
	}
	// Create a new module (and put it into the cache)【2.2利用对象引用地址共享内存，进行exports赋值】
	var module = __webpack_module_cache__[moduleId] = {
		exports: {}
	}

	// Execute the module function【2.3执行模块函数】
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__)

	// Return the exports of the module
	return module.exports
}

// define getter functions for harmony exports
__webpack_require__.d = (exports, definition) => {
	for (var key in definition) {
		if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
			Object.defineProperty(exports, key, {enumerable: true, get: definition[key]})
		}
	}
}

/* webpack/runtime/hasOwnProperty shorthand */
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

/* webpack/runtime/make namespace object */
__webpack_require__.r = (exports) => {
	if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'})
	}
	Object.defineProperty(exports, '__esModule', {value: true})
}

/**********************************【1.开始执行】**************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
	const {multiple, sum} = __webpack_require__("./src/js/esmodule.js")
	multiple(20, 30)
	sum(20, 30)
})()

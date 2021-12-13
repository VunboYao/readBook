// 定义了一个对象
// 模块的路径（key）:函数(value)
var __webpack_modules__ = {
  "./src/js/format.js":
    (function (module) {
      const dateFormat = () => {
        return '2020-12-12'
      }
      const priceFormat = () => {
        return '100.00'
      }
      // var module = __webpack_module_cache__[moduleId] = {exports: {}}
      // 将需要导出的变量，放入到module对象的exports中
      module.exports = {
        dateFormat,
        priceFormat
      }
    })
}

// cache
var __webpack_module_cache__ = {};

// 加载模块的函数
function __webpack_require__(moduleId) {
  // 1.获取模块value
  var cachedModule = __webpack_module_cache__[moduleId];
  // 2.如果不是未定义，取缓存值
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // 3.对象赋值及缓存处理：赋值为同一个变量
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };
  // 4.加载执行模块
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  // 5.导出module.exports{dateFormat: function, priceFormat：function}
  return module.exports;
}

// 开始执行代码
!function () {
  // 1.加载 ./src/js/format.js
  const { dateFormat, priceFormat } = __webpack_require__("./src/js/format.js")
  console.log(dateFormat())
  console.log(priceFormat())
}();

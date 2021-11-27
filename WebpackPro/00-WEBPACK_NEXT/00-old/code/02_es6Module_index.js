"use strict";
var __webpack_modules__ = ({
  "./src/js/math.js":
    (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      // 记录是一个__esModule => true
      __webpack_require__.r(__webpack_exports__);
      //
      __webpack_require__.d(__webpack_exports__, {
        "add": function () { return add; },
        "mul": function () { return mul; }
      });
      const add = (num1, num2) => {
        return num1 + num2
      }
      const mul = (num1, num2) => {
        return num2 * num1
      }
    })

});
// 2.缓存
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}

// __webpack_require__函数上的一个d属性，value为函数
!function () {
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      // 遍历对象。是当前实例的属性同时不在exports对象中
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        // 向exports中声明这个key，定义访问器属性。get时返回obj[key]
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
}();

// __webpack_require__函数上的一个o属性，判断属性是否是当前实例的属性（不是原型上）
!function () {
  __webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();

// r => 添加函数标识。 __esModule => true
!function () {
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
}();

// 声明一个webpack_exports对象
var __webpack_exports__ = {};
!function () {
  // 添加esModule标识
  __webpack_require__.r(__webpack_exports__);
  var _js_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/math.js");
  console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.add)(10, 20))
  console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.mul)(10, 20))
}();

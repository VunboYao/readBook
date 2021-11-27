var __webpack_modules__ = ({
  "./src/js/format.js":
    (function (module) {
      const dateFormat = () => {
        return '2020-12-12'
      }
      const priceFormat = () => {
        return '100.00'
      }
      module.exports = {
        dateFormat,
        priceFormat
      }
    }),
  "./src/js/math.js":
    (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      // module, module.exports, __webpack_require__
      "use strict";
      // __esModule => true
      __webpack_require__.r(__webpack_exports__);
      // getter实现访问器属性，进行数据映射
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
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// 2.The require function
function __webpack_require__(moduleId) {
  // 2.1 Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // 2.2 Create a new module (and put it into the cache)
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };

  // 2.3 Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // 2.4 Return the exports of the module
  return module.exports;
}

/************************************************************************/
/* webpack/runtime/compat get default export */
!function () {
  // commonJS中返回 function () { return module; }
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function () { return module['default']; } :
      function () { return module; };
    __webpack_require__.d(getter, { a: getter });
    return getter;
  };
}();

/* webpack/runtime/define property getters */
!function () {
  // define getter functions for harmony exports
  // getter实现访问器属性，进行数据映射
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
}();

/* webpack/runtime/hasOwnProperty shorthand */
!function () {
  __webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();

/* webpack/runtime/make namespace object */
!function () {
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
}();

/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function () {
  "use strict";
  // 1.define __esModule for __webpack_exports__
  __webpack_require__.r(__webpack_exports__);
  // 2.Execute "./src/js/format.js"
  /*
      __webpack_require__("./src/js/format.js") = module.exports = {
        dateFormat,
        priceFormat
      }
  */
  var _js_format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/format.js");
  var _js_format_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_js_format_js__WEBPACK_IMPORTED_MODULE_0__);
  /*
   _js_format_js__WEBPACK_IMPORTED_MODULE_0___default = function () { return module; } = {dateFormat, priceFormat}
  */
  console.log(_js_format_js__WEBPACK_IMPORTED_MODULE_0___default().dateFormat());
  console.log(_js_format_js__WEBPACK_IMPORTED_MODULE_0___default().priceFormat());

  const math = __webpack_require__("./src/js/math.js")
  console.log(math.add(10, 20));
  console.log(math.mul(10, 20));

}();

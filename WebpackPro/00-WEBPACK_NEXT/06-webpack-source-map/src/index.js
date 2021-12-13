const {multiple, sum} = require("./js/esmodule.js") // es导出，commonJS导入
import {dateFormat, priceFormat} from './js/common' // commonjs导出，es导入

console.log(abc)
multiple(20,30)
sum(20,30)

console.log(dateFormat(), priceFormat())

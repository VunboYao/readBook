import {multiple, sum} from "./js/math.js" // ES Module
const {dateFormat, priceFormat} = require('./js/format') // CommonJS => Node

multiple(20,30)
sum(20,30)

console.log(dateFormat())
console.log(priceFormat())


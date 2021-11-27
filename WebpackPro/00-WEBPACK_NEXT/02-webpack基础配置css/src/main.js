import {multiple, sum} from "./js/math.js"
const {dateFormat, priceFormat} = require('./js/format')
import './js/test'
import './js/component'

multiple(20,30)
sum(20,30)

console.log(dateFormat())
console.log(priceFormat())

/*
执行webpack命令，会执行node_modules下的.bin目录下的webpack。没有则执行全局的webpack
webpack-cli封装了对webpack的调用，类似一个服务调用管家
* 1.原生不支持require《CommonJS的模块化语法》
* 2.低版本浏览器不支持import export
* 3.默认执行webpack打包。需要有一个src文件，以及配置src/index.js《入口文件》
* 4.可通过引入打包后的dist/main.js查看对应的结果
* */

/*
* 1.相对路径问题：npx webpack --entry ./../src/main.js (解析路径问题)
* 	.bin中请求路径基于node_modules触发
* */

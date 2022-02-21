import _ from 'lodash'
import { date } from './utils/format'
import './css/style.css'
import { createApp } from 'vue'
import foo from './foo.vue'
const message = 'Hello Rollup'
console.log(message)

const sum = (num1, num2) => {
	return num1 + num2
}
class Person {}
console.log('date', date())
console.log(_.join(['abc', 'cba']))

createApp(foo).mount(document.getElementById('app'))

export { sum }

import _ from 'lodash'
import { date } from './utils/format'
const message = 'Hello Rollup'
console.log(message)

const sum = (num1, num2) => {
	return num1 + num2
}
console.log('date', date())
console.log(_.join(['abc', 'cba']))

export { sum }

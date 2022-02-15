import { name } from './bar.js'
console.log(name)

setTimeout(() => {
  name.age = 30
}, 2000)

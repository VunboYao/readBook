import * as foo from '/029-CommonJS.js'

console.log(foo.name,foo)

setTimeout(() => {
  console.log(foo.name)
}, 5000)

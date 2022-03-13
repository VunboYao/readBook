function Componse(...fns) {
  let length = fns.length
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError('Not a functions')
    }
  }

  return function (...args) {
    let index = 0
    let result = length ? fns[index].apply(this, args) : args
    while(++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }
}

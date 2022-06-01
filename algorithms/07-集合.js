class Set {
  constructor() {
    this.items = {}
  }

  add(value) {
    if (this.has(value)) return false

    this.items[value] = value
    return true
  }

  remove(value) {
    if (!this.has(value)) return false

    delete this.items[value]
    return true
  }

  has(value) {
    return this.items.hasOwnProperty(value)
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length
  }

  values() {
    return Object.keys(this.items)
  }
}

let set = new Set()
console.log(set.add('Duo'))
console.log(set.add('Bob'))
console.log(set.add('Bob'))
console.log(set.size());
console.log(set.values());
console.log(set.remove('Bob'));
console.log(set.remove('Bob'));
console.log(set.size());
console.log(set.clear());
console.log(set.size());

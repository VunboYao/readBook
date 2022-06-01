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

  // 并集
  union(otherSet) {
    return Object.assign(this.items, otherSet.items)
  }

  // 交集
  intersection(otherSet) {
    let intersection = new Set()
    for (let key in this.items) {
      let item = this.items[key]
      if (otherSet.has(item)) [
        intersection.add(item)
      ]
    }
    return intersection
  }
}


let set1 = new Set()
set1.add('Bob')
set1.add('Lily')
let set2 = new Set()
console.log(set2.add('Duo'))
console.log(set2.add('Bob'))
console.log(set2.intersection(set1));

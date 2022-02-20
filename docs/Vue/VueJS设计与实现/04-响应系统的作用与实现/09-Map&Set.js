

let set = new Set(['red', 'green', 'blue']);


for (let item of set) {
  console.log(item);
}
let c = Set.prototype[Symbol.iterator] === Set.prototype.values
console.log(c);
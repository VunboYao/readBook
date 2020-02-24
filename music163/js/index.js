const a = {
    b: 2
}
Object.defineProperty(a, 'b', {
    value: 3,
    writable: true,
    configurable: false,
    enumerable: true
})

console.log(a.b);
Object.defineProperty(a, 'b', {
    value: 4,
    writable: false,
    configurable: false,
    enumerable: true
})
console.log(a.b);
let val:number
val = 123

function test(a:any[],b:number) {
    return a.length + b
}

console.log(test([1, 2, 3, 4], 12));

const arr = [1,2,3,4, 2]
function demo() {
  for (let i = 0; i < arr.length; i++) {
    if (i >= 2) {
      return i
    }
  }
}

console.log(demo());

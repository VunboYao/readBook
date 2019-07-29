/* let a = [
  {id: 'a',count: 2},
  {id: 'b',count: 5}
]
let b = [
  {id: 'a', count: 3},
  {id: 'c', count: 4}
] */

/*
[{
    id: 'a',
    count: 5
  },
  {
    id: 'b',
    count: 5
  },
  {
    id: 'c',
    count: 4
  }
]

*/


/* function concat(arr1, arr2) {
  let arr = [...arr1,...arr2];
  arr.sort((a,b) => {
    return a.id.charCodeAt(0) - b.id.charCodeAt(0);
  })

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].id === arr[i+1].id) {
      arr[i].count += arr[i+1].count;
      arr.splice(i+1,1);
    }
  }
  return arr;
}

let c = concat(a,b);
console.log(c); */
/*
function concat(arr1, arr2) {
  let arr = [...arr1, ...arr2];
  let tempArr = []
  for (let i in arr) {
    let bol = tempArr.includes()
    console.log(arr[i]);
  }
  return tempArr;
}

let c = concat(a, b);
console.log(c); */

let a = [{
    id: 'a',
    count: 2
  },
  {
    id: 'b',
    count: 3
  },
  {
    id: 'a',
    count: 1,
  }
]

let b = [{
    id: 'a',
    count: 2
  },
  {
    id: 'c',
    count: 3
  }
]

/* let arr = [...a, ...b];

const ids = {}
const newArr = arr.filter((val, index) => {
  if (val.id in ids) {
    arr[ids[val.id]].count += val.count
    return false
  } else {
    ids[val.id] = index
    return true
  }
})
console.log(newArr)
 */

 function concat(arr1,arr2) {
   let arr = [...arr1,...arr2];
   let ids = {}
   const newArr = arr.filter((val, index) => {
      if (val.id in ids) {
        arr[ids[val.id]].count += val.count;
        return false;
      } else{
        ids[val.id] = index;
        return true;
      }
   })
   return newArr
 }
 console.log(concat(a,b));

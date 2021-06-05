let c = JSON.parse('{"p": 5}', (k, v) => {
  if (k === '') return v
  return v * 2
})
console.log(c); // { p: 10 }
async function async1() {
  console.log('async1 start')
  await async(2)
  console.log('3')
}
async1()

console.log('123')
async function async() {
  console.log('async 2')
}


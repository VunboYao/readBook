let name = {
	age: 20,
}
setTimeout(() => {
	console.log(name, 'old')
	name.age = 30
}, 3000)
export { name }

const a = [1,-1,3,5,0]

for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5 - i; j++) {
		if (a[j] > a[j + 1]) {
			let temp = a[j]
			a[j] = a[j + 1]
			a[j + 1] = temp
		}
	}
}
console.log(a)

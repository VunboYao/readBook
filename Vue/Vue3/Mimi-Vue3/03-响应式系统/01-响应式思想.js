const info = { counter: 10 }
function doubleCounter(params) {
	console.log(info.counter * 2)
}

doubleCounter()

info.counter++

// 自动执行 doubleCounter()

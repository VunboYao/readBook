var isValid = function (s) {
	if (s.length % 2 !== 0) {
		return false
	}
	var obj = new Map([
			['[',']'],
			['{','}'],
			['(',')']
	])
	var stack = []
	for (var i = 0; i < s.length; i++) {
			var t = s[i]
			if (obj.has(t)) {
				stack.push(t)
				continue
			}
		if (obj.get(stack[stack.length - 1]) === t) {
			stack.pop()
		} else {
			return false
		}

	}
	return stack.length === 0
};
// isValid('(]')
isValid(')')

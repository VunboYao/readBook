import { ArrayStack } from "./01-index";

function isValid(s: string): boolean {
	// 1.首先创建一个栈
	const stack = new ArrayStack<string>()

	// 2.遍历传入的符号
	for (let i = 0; i < s.length; i++) {
		const t = s[i]

		// 如果匹配对应的符号，则把相应的符号push到栈中
		switch (t) {
			case '(':
				stack.push(')')
				break
			case '[':
				stack.push(']')
				break
			case '{':
				stack.push('}')
				break
			default:
				// 如果出栈的和当前的不匹配，则false
				if (t !== stack.pop()) {
					return false
				}
		}
	}

	// 3.最终返回是否为空，不是空则无效
	return stack.isEmpty()
}

console.log(isValid("()"))
console.log(isValid("([]){}"))
console.log(isValid("(]"))

export {}

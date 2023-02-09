import { iStack } from "./types";

export class ArrayStack<T> implements iStack<T> {
	// 定义一个数组，用于存储元素
	private data: T[] = []

	// 入栈
	push(element: T): void {
			this.data.push(element)
	}

	// 出栈
	pop(): T | undefined {
		return this.data.pop()
	}

	// 查看栈顶元素
	peek(): T | undefined {
			return this.data[this.data.length - 1]
	}

	// 判空
	isEmpty(): boolean {
			return this.data.length === 0
	}

	size(): number {
			return this.data.length
	}
}

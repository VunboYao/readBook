type CalcFnType = (num1: number, num2: number) => number

type CalcType = ReturnType<CalcFnType>


function foo() {
	return 'abc'
}

type FooType = ReturnType<typeof foo>
interface iPartial {
	name: string
	age: number
	score?: number
}

// instance
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
type MyParameter<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never
type MyPartial<T> = {
	[K in keyof T]?: T[K]
}
type MyRequired<T> = {
	[K in keyof T]-?: T[K]
}
type MyReadonly<T> = {
	readonly [K in keyof T]: T[K]
}
type res = keyof any
type keys = keyof iPartial
type MyRecord<Keys extends keyof any, T> = {
	[K in Keys]: T
}
type MyPick<T, K extends keyof T> = {
	[P in K]: T[P]
}
type MyOmit<T, K extends keyof T> = {
	[P in keyof T as P extends K ? never : P]: T[P]
}
type MyExclude<T, K> = T extends K ? never : T

type myCalcType = MyReturnType<CalcFnType>
type myFooType = MyReturnType<typeof foo>
type myPartial = MyPartial<iPartial>
type myRequire = MyRequired<iPartial>
type myReadonly =  MyReadonly<iPartial>

type iExclude = 'name' | 'age' | 'score'
type t1 = 'shanghai' | 'beijing' | 'califolia' | 1
type myRecord = MyRecord<t1, iPartial>
type myPick = MyPick<iPartial, 'name'|'score'>
type myOmit = MyOmit<iPartial, 'name'>
type myExclude = MyExclude<iExclude, 'age' | 'name'>

class Person { 
	name: string
	age: number
	constructor(name:string, age: number) {
		this.name = name
		this.age = age
	}
}
type T = typeof Person
type PersonType = InstanceType<typeof Person>
function factory<T extends new (...args: any) => any>(a: T): InstanceType<T> {
	return new a()
}
let p1 = factory(Person)
export{}

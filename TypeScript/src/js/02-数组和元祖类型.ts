/* 数组类型 */

// 方式一
// 需求：要求定义一个数组，这个数组中将来只能是存储数值类型的数据
let arr1: Array<number> // 表示定义了一个名称叫做arr1的数组，这个数组中将来只能够存储数值类型的数据
arr1 = [1, 2, 3]
console.log(arr1)

let bool1: Array<boolean> = [false, true]
console.log(bool1)

// 方式二
// 需求：要求定义一个数组，这个数组中将来只能是存储字符串类型的数据
let arr2: string[] // 表示定义了一个名称叫做arr2的数组，这个数组中将来只能够存储字符串类型的数据
arr2 = ['a', 'b', 'c']
// arr2 = ['2', 1]
console.log(arr2)

// 联合类型
let arr3: (number | string | boolean)[] // 表示定义了一个名称叫做arr3的数组，这个数组中将来只能够存储字符串类型、布尔类型或数值类型的的数据
arr3 = [1, '12', 'b', true]
// arr3 = [1, '12', 'b', true]
console.log(arr3)

// 任意类型
let arr4: any[] // 表示定义了一个名称叫做arr4的数组，存储任意类型的数据
arr4 = [1, 'b', false, []]
// arr4 = 123
console.log(arr4)

/* 元祖类型 */
// TS中的元祖类型其实就是数组类型的扩展
// 元祖用于保存定长定数据类型的数据
let arr5: [string, boolean, number] // 表示一个名称叫做arr5的元祖，这个元祖将来可以存放三个元素。第一个是字符串，第二个是boolean,第三个是数值
arr5 = ['1', true, 1]
// arr5 = ['1', true, 1, '2'] // 超过指定长度报错
// arr5 = ['1', true, 'b'] // 类型必须一一对应
console.log(arr5)

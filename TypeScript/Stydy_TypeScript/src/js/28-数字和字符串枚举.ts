// todo:数字枚举

/*
todo:1.数字枚举的注意点：
默认从0开始递增
数字枚举的取值可以是字面量，也可以是常量，也可以是计算结果
*/


const num = 666

function getNum(): number {
  return 999
}

enum Gender {
  // Male = num, // 常量
  // Female = 9,// todo:如果使用常量来给前面的枚举值赋值了，那么后面的枚举值也需要手动赋值
  Male = getNum(), // todo: 计算的结果
  Female = 0, // todo:如果使用【常量/结算结果】来给前面的枚举值赋值了，那么后面的枚举值也需要手动赋值
}

/*
todo:2.枚举反向映射：可以根据枚举值获取到原始值，也可以根据原始值获取到枚举值
*/

/*
todo：3.字符串枚举.
 如果使用字符串给前面的枚举值赋值，后面的枚举值也必须手动赋值
*/
const str28 = 'yyb'

enum Gender2 {
  Male = 'www.hello.world',
  // Female = str28, // todo：和数字枚举不一样，字符串枚举不能使用【常量/计算结果】给枚举值赋值
  Female = 'vunbo', // todo:如果使用字符串给前面的枚举值赋值，后面的枚举值也必须手动赋值
  Yao = Male // todo:虽然字符串枚举不能够使用常量或计算结果给枚举值赋值， 但是可以使用内部的其他枚举值来赋值
}

/*
todo:4.异构枚举:
 枚举中包含数字又包含字符串，称为异构枚举
*/

enum Gender28 {
  Male = 6,
  Female = 'nv'
}

console.log(Gender28.Male); // 6
console.log(Gender28.Female); // 'nv'
console.log(Gender28[6]); // Male
console.log(Gender['nv']); // undefined todo:如果是字符串枚举，那么无法通过原始值获取到枚举值

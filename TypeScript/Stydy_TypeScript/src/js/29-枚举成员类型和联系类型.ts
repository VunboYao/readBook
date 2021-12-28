// todo:1.枚举成员类型 我们可以把枚举成员当作类型来使用

enum Gender29 {
  // Male,
  // Female
  Male = 'www.it666.com',
  Female = 'www.item.zb'
}

interface TestInterface {
  age: Gender29.Male
}

class Person29 implements TestInterface {
  // age: Gender29.Male
  // age: Gender29.Female // 由于类型不匹配，会报错
  // age: 0 // todo:数字枚举的本质就是数值，所以这里写一个数值不会报错

  age: Gender29.Male
  // age: Gender29.FeMale
  // age: 'www.it666.com' // todo：如果字符串枚举，那么只能是枚举成员的值，不能是其他的值
}

/*
2.连合枚举类型
2.1.todo:联合类型,将多种数据类型通过|连接起来。
*/
let value29: (number | string) // 联合类型

enum GenderOne {
  Male,
  Female
}

interface TestInterface29 {
  age: GenderOne // age: (GenderOne.Male | Gender.Female)
}

class PersonOne29 implements TestInterface29 {
  // age: GenderOne.Female
  age: GenderOne.Male
}

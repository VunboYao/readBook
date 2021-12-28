// todo:数字枚举与数值兼容
enum Gender34 {
    Male,
    Female
}

let value34: Gender34
value34 = Gender34.Male
value34 = 2


// todo:数字枚举与数字枚举不兼容
enum Gender345 {
    Male,
    Female
}

enum Animal34 {
    Dog,
    Cat
}

let value345: Gender345
value345 = Gender345.Female
// value345 = Animal34.Dog // error


// todo:字符串枚举与字符串不兼容
enum Gender346 {
    Male = 'abc',
    Female = 'def'
}

let value346: Gender346
value346 = Gender346.Female
// value346 = 'abc' // error

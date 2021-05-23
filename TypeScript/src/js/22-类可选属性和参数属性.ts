
// 可选属性
/* class Person22 {
  name: string
  age: number
  gender?: string
  say(name: string, age: number, gender?: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
} */


// 参数属性

/* class Person22 {
  name: string
  age: number
  gender: string
  say(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
} */

// 简写
class Person22 {
  constructor(public name:string,  public age: number, public gender: string) {}
}

let p22 = new Person22('yao', 22, 'man')
console.log(p22);

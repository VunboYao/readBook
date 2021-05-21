// 类实现接口
interface PersonInterface {
  name: string
  say(): void
}

// 实现某一个接口，就必须实现接口中的所有属性和方法

class Person25 implements PersonInterface {
  name:string = 'yyb'
  say(): void {
    console.log(`my name is ${this.name}`);
  }
}
let p25 = new Person25()
p25.say()


// 接口继承类
/* 注意点：
1. 只要一个接口继承了类，那么就会继承这个类中所有的属性和方法。但是只会继承属性和方法的声明，不会继承属性和方法的实现
2. 如果接口继承的类中包含了 protected 的属性和方法，那么就只有这个类的子类才能实现这个接口
*/
 class PersonOne {
   protected name: string = 'yyb'
   age: number = 23
   say(): void {
     console.log(`name = ${this.name}, age = ${this.age}`);
   }
 }

interface PersonOneInterface extends PersonOne {
  gender: string
}
class Student25 extends PersonOne implements PersonOneInterface {
  gender: string = 'male'
  name: string = 'yyb'
  age: number = 18
  say(): void {
    console.log(`my name is ${this.name}, age is ${this.age}, gender is ${this.gender}`)
  }
}
const POI = new Student25()
POI.say()

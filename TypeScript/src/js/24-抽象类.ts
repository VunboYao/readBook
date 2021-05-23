/*
1.什么是抽象类

抽象类是专门用于定义哪些不希望被外接直接创建的类
抽象类一般用于定义基类
抽象类和接口一样用于约束子类

2.抽象类和接口区别？
接口只能定义约束，不能定义具体实现
而抽象类中既可以定义约束，又可以定义具体实现

*/

abstract class Person24 {
  abstract name: string
  abstract say(): void
  eat(): void {
    console.log(this.name + '正在吃。。。');
  }
}

class Student24 extends Person24 {
  name: string = 'yyb'
  say():void {
    console.log('my name is ' + this.name);
  }
}

let  s24 = new Student24()
s24.say()
s24.eat()

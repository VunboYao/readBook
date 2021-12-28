/*
public: 在类中、子类、外部均可以使用
protected: 只能在类的内部使用和子类中使用
private: 私有的，只能在类的内部使用，不能在外部和子类使用
readonly: 只读的 《不能用在static上》只读属性必须在声明时或构造函数里被初始化
*/


class Person20 {
  public name: string // default is public
  protected age: number
  private gender: string

  constructor(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }

  // instance method
  say(): void {
    console.log(`my name is ${this.name}, my age is ${this.age}, my gender is ${this.gender}`);
  }

  // static key
  static food: string

  static eat(): void {
    // this 指向当前类
    console.log(`i am eating ${this.food}`);
  }
}


// 继承
class Student20 extends Person20 {
  book: string

  constructor(name: string, age: number, book: string, gender: string) {
    super(name, age, gender)
    this.book = book
  }

  say(): void {
    // console.log(this.gender) // private gender
    console.log(`i am rewriting say() ${this.name} ${this.age} ${this.book}`);
  }

  static eat(): void {
    console.log(`i am rewriting eat() ${this.food}`);
  }
}

let P20 = new Person20('yao', 28, 'man')
P20.say()
// console.log(P20.age); // protected

let S20 = new Student20('miniYao', 12, 'hello world', 'female')
S20.say()
// console.log(S20.age); // protected

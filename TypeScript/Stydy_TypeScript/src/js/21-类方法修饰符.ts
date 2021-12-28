/*
public: 该方法能在类的内部、子类、外部使用
protected: 只能在类的内部使用和子类中使用
private: 私有的，只能在类的内部使用，不能在外部和子类使用
*/


// TODO：奇淫技巧：有一个基类，所有的子类都需要继承自这个基类，但是不希望别人能够通过基类来创建对象

class Person21 {
  name: string
  age: number
  gender: string

  protected constructor(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }

  say(): void {
    console.log(`My name is ${this.name}, age is ${this.age}, gender is ${this.gender}`);
  }
}

class Student21 extends Person21 {
  constructor(name, age, gender) {
    super(name, age, gender)
  }
}

// const p21 = new Person21('yao', 28, 'man') // todo:不可使用new构建

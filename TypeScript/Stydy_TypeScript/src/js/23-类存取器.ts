// 存取器 todo: 通过getters/setters来截取对象成员的访问

class Person23 {
  private _age: number = 0
  set age(val: number) {
    console.log('set age');
    if (val < 0) {
      throw new Error('不能小于零')
    }
    this._age = val
  }

  get age(): number {
    console.log('is get age func');
    return this._age
  }
}

let p = new Person23()
p.age = 22
console.log(p.age);

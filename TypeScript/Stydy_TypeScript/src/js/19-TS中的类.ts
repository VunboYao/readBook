class Person {
    name: string // 和 ES6 的区别，需要先定义实例属性， 才能够使用实例属性
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    // instance method
    say(): void {
        console.log(`my name is ${this.name}, my age is ${this.age}`);
    }

    // static key
    static food: string

    static eat(): void {
        // this 指向当前类
        console.log(`i am eating ${this.food}`);
    }
}

let p19 = new Person('yyb', 28)
p19.say() // my name is yyb, my age is 28
Person.food = 'apple'
Person.eat() // i am eating apple


// 继承
class Student extends Person {
    book: string

    constructor(name: string, age: number, book: string) {
        super(name, age)
        this.book = book
    }

    say(): void {
        console.log(`i am rewriting say() ${this.name} ${this.age} ${this.book}`);
    }

    static eat(): void {
        console.log(`i am rewriting eat() ${this.food}`);
    }
}

let s19 = new Student('vunbo', 28, 'Hello World')
s19.say() // i am rewriting say() vunbo 28 Hello World
Student.food = 'pear'
Student.eat() // i am rewriting eat() pear

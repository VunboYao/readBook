class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayName() {
        console.log(this.name);
    }
}

let zs = new Person('zs', 18);
console.log(zs);


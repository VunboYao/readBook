/* 函数的参数，都是按值传递 */
/*function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function () {
        console.log(this.name);
    }
    return o;
}
let person1 = createPerson('Nick', 29, 'Software Engineer');
let person2 = createPerson('Greg', 27, 'Doctor');
console.log(person1)
console.log(person2)*/
/*
function Person(name, age, score) {
this.name = name;
this.age = age;
this.score = score;
}
Person.prototype.say = function() {
    console.log(this.name)
}
let p1 = new Person('zs', 18, 89);
console.log(p1 instanceof Person); // true*/
/*
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;

with(location) {
    let qs = search.substring(1)
    let hostName = hostname;
    let url = href;
}*/
/*
function bulidUrl() {
    let qs = '?debug=true';
    with(location) {
        var url = href + qs;
    }
    console.log(url)
}
bulidUrl();*/
/*
function displayInfo(args) {
    let output = ''
    if (typeof args.name === 'string') {
        output += 'Name: ' + args.name + '\n';
    }
    if (typeof args.age === 'number') {
        output += 'Age: ' + args.age + '\n';
    }
    console.log(output)
}
displayInfo({name: 'Nicholas', age: 29})
displayInfo({name: 'Greg'})*/
/*function compare(value1, value2) {
if (value1 < value2) {
    return -1;
} else if (value1 > value2) {
    return 1;
} else {
    return 0;
}
}
let values = [0, 1, 4, 10, 15];
console.log(values.sort()); // [ 0, 1, 10, 15, 4 ]
console.log(values.sort(compare)); // [ 0, 1, 4, 10, 15 ]*/
/*let colors = ['red', 'green', 'blue', 'yellow', 'purple']
console.log(colors.slice(1)); // [ 'green', 'blue', 'yellow', 'purple' ]
console.log(colors.slice(1, 4)); // [ 'green', 'blue', 'yellow' ]*/
/*
let colors = ['red', 'green', 'blue'];
let remove = colors.splice(0, 1);
console.log(colors); // [ 'green', 'blue' ]
console.log(remove); // [ 'red' ]

remove = colors.splice(1, 0, 'yellow', 'orange');
console.log(colors); // [ 'green', 'yellow', 'orange', 'blue' ]
console.log(remove); // []

remove = colors.splice(1, 1, 'red', 'purple');
console.log(colors); // [ 'green', 'red', 'purple', 'orange', 'blue' ]
console.log(remove); // [ 'yellow' ]*/
/*
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult); // false

let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult); // true

let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // [ 3, 4, 5, 4, 3 ]

let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult); // [ 2, 4, 6, 8, 10, 8, 6, 4, 2 ]
// 该方法适合创建包含的项与另一个数组一一对应的数组

numbers.forEach((item, index, array) => {
    // 执行某些操作, 与for一样
});*/
/*
let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur, index, array) => prev + cur);
console.log(sum); // 15

let values2 = [1, 2, 3, 4, 5];
let sum2 = values.reduce((prev, cur, index, array) => prev + cur, 10);
console.log(sum2); // 25
// 第二个参数为初始值*/
// console.log(Date.UTC(2000, 0)); // 946684800000
// console.log(Date.UTC(2005, 4, 5, 17, 55, 55)); // 1115315755000
/*
console.log(Math.round(Date.parse("1/3/2019") / 1000))
console.log(Math.round(new Date() / 1000));*/
/*
console.log(new Date().toString())
console.log(new Date().toLocaleString())
console.log(new Date().valueOf())*/
// console.log(new Date()./*
// let text = 'this has been a short summer';
// let pattern = /(.)hort/gmi;
// if (pattern.test(text)) {
//     console.log(RegExp.input);
//     console.log(RegExp.leftContext);
//     console.log(RegExp.rightContext);
//     console.log(RegExp.lastMatch);
//     console.log(RegExp.lastParen);
//     console.log(RegExp.multiline)
// }*/toDateString())
/*
let p1 = /^1[34578][0-9]{9}$/;
let string = 182664888418;
// console.log(p1.test(string))
let p2 = /http:(\/\/.+\.jpg)/;
let str = 'http://img.host.com/abc.jpg'

// console.log(str.replace(p2, '$1'))
let p3 = /^\d{4}[/-](0[1-9]|11|12)[/-]\d{2}$/;

let p4 = /^(\d{4})[/-](0?[1-9]|1[0-2])[/-]((0?[1-9])|([1|2][0-9])|30|31)$/ig

let p5 = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/ig;
*/
/*
let text = 'mom and dad and baby';
let pattern = /mom( and dad (and baby) ?)?/gi;
let matches = pattern.exec(text);
console.log(matches)
console.log(matches.index)
console.log(matches.input)
console.log(matches[0])
console.log(matches[1])
console.log(matches[2])*/
// console.log(p4.test('2018-12-30'))
/*
let str1 = '2018-12-30';
console.log(p4.exec(str1))

console.log(p4.toString())
console.log(p4.valueOf())*/
/*
let pattern = /^[0-9]*$/;
let pattern1 = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/
let a = /^(-)?\d+(\.\d{1,2})$/*/
/*
console.log(sum(10, 10))
let sum = function (num1, num2) {
    return num1 + num2;
}*/
/*
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

let data = [{name: 'Zachary', age: 28}, {name: 'Nicholas', age: 29}];
data.sort(createComparisonFunction('name'));
console.log(data[0].name); // Nicholas
data.sort(createComparisonFunction('age'));
console.log(data[0].name); // Zachary*/
// 高耦合
/*function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1)
    }
}
let trueFactorial = factorial;
factorial = function () {
    return 0;
}
console.log(trueFactorial(5)); // 120
console.log(factorial(5)); // 0*/
/*window.color = 'red';
let o = { color: "blue" };
function sayColor() {
    console.log(this.color);
}
sayColor();
o.sayColor = sayColor;
o.sayColor();*/
/*function outer() {
    inner()
}
function inner() {
    console.log(inner.caller)
}
inner(); // null
outer(); // 显示outer()函数的源代码

// 为了实现更松散的耦合，可以通过arguments.callee.caller来访问相同的信息
function outer() {
    inner();
}
function inner() {
    console.log(arguments.callee.caller);
}
outer(); // 显示outer()函数的源代码*/
/*function inner() {
    console.log(inner.caller)
}

console.log(Object.prototype.isPrototypeOf(inner))*/
/*window.color = 'red'
let o = { color: 'blue'}
function sayColor() {
    console.log(this.color)
}
let objectSayColor = sayColor.bind(o);
objectSayColor();

objectSayColor.toLocaleString()*/
/*window.a = 123;
function foo() {
    console.log(this.a)
}
foo(); // 123
let o = { a: 'abc'};
let boo = foo.bind(o); //改变this指向
boo(); // abc*/
/*let s1 = 'some text'
let s2 = s1.substring(2)
/!*
* 1.创建String类型的一个实例
* 2.在实例上调用指定的方法
* 3.销毁这个实例
* *!/
let s1 = new String('some text');
let s2 = s1.substring(2);
s1 = null;*/
/*
let stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
let positions = new Array();
let pos = stringValue.indexOf("e");
while(pos > -1){
    positions.push(pos);
    pos = stringValue.indexOf("e", pos + 1);
}
console.log(positions); //"3,24,32,35,52"*/
/*let text = "cat, bat, sat, fat";
let c1 = text.split(' ');
console.log(c1);*/
/*let stringValue = 'yellow'
console.log(stringValue.localeCompare('brick')); // 1
console.log(stringValue.localeCompare('yellow')); // 0
console.log(stringValue.localeCompare('zoo')); // -1*/
/*console.log(String.fromCharCode(104, 101, 108, 108, 111)); // hello
console.log('hello'.charCodeAt(2)); // 108*/
/*let uri = 'http://www.wrox.com/illegal value.html#start';
console.log(encodeURI(uri));
// http://www.wrox.com/illegal%20value.html#start
console.log(encodeURIComponent(uri));
// http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.html%23start*/
/*function selectFrom(lowerValue, upperValue) {
    let choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
let num = selectFrom(2, 10);
console.log(num); // 介于2和10之间（包括2和10）的一个数值
let colors = ['red', 'green', 'blue', 'yellow', 'black', 'purple', 'orange', 'brown']
let color = colors[selectFrom(0, colors.length - 1)]
console.log(color)*/
/*let person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
//抛出错误
Object.defineProperty(person, "name", {
    configurable: true, // TypeError: Cannot redefine property: name
    value: "Nicholas"
});*/
/*let book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book,'year', {
    get: function () {
        return this._year;
    },
    set: function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
book.year = 2005;
console.log(book.edition); // 2*/
/*let book = {}
Object.defineProperties(book, {
    _year: {
        writable: true,
        value: 2004
    },
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get: function () {
            return this._year;
        },
        set: function (newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
let descriptor = Object.getOwnPropertyDescriptor(book, '_year');
console.log(descriptor.value); // 2004
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // undefined

let descriptor1 = Object.getOwnPropertyDescriptor(book, 'year');
console.log(descriptor1.value); // undefined
console.log(descriptor1.configurable); // false
console.log(typeof descriptor1.get); // function*/
/*function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName() {
    console.log(this.name);
}
let p1 = new Person('Nicholas', 29, 'Software Engineer');
p1.sayName(); // Nicholas
let p2 = new Person('Nick', 29, 'Software Engineer');
p2.sayName(); // Nick
console.log(p1.sayName === p2.sayName); // true*/
/*function Person() {}
Person.prototype.name = 'Nickolas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
};*/
/*console.log(person1.hasOwnProperty('name')); // false
console.log('name' in person1); // true

person1.name = 'Greg';
console.log(person1.name); // Greg  ——来自实例
console.log(person1.hasOwnProperty('name')); // true
console.log('name' in person1); // true

delete person1.name;
console.log(person1.name); // Nicholas ——来自原型
console.log(person1.hasOwnProperty('name')); // false
console.log('name' in person1); // true*/
/*function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}

console.log(hasPrototypeProperty(person1, 'name')); // true
person1.name = 'Greg';
console.log(hasPrototypeProperty(person1, 'name')); // false*/
/*let keys = Object.keys(Person.prototype);
console.log(keys); // [ 'name', 'age', 'job', 'sayName' ]

let person1 = new Person();
person1.name = 'Rob';
person1.age = 32;
let p1Keys = Object.keys(person1);
console.log(p1Keys); // [ 'name', 'age' ]*/
/*let keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys); // [ 'constructor', 'name', 'age', 'job', 'sayName' ]*/
/*function Person() {}
let friend = new Person();
Person.prototype = {
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName: function () {
        console.log(this.name);
    }
}
friend.sayName(); // Uncaught TypeError: friend.sayName is not a function*/
/*String.prototype.strFirstUpper = function () {
    let first = this.substr(0, 1); // this.charAt(0)
    let free = this.substring(1); // this.substr(1)
    first = first.toLocaleUpperCase();
    return first + free;
}
let str = 'yyb';
console.log(str.strFirstUpper()); // Yyb

let _s = new String('yyb'); // 创建一个临时的字符串对象
_s.strFirstUpper(); // 调用该方法
_s = null; // 释放该对象*/
/*function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Shelby', 'Court'];
}
Person.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    }
}
let person1 = new Person('Nicholas', 29, 'Software Engineer');
let person2 = new Person('Greg', 25, 'Doctor');

person1.friends.push('Van');
console.log(person1.friends); // [ 'Shelby', 'Court', 'Van' ]
console.log(person2.friends); // [ 'Shelby', 'Court' ]

console.log(person1.friends === person2.friends); // false
console.log(person1.sayName === person2.sayName); // true*/
/*function Person(name, age, job) {
    // 属性
    this.name = name;
    this.age = age;
    this.job = job;

    // 方法
    if (typeof this.sayName !== 'function') {
        Person.prototype.sayName = function () {
            console.log(this.name);
        }
    }
}
let friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); // Nicholas*/
/*function Person(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
let friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); // Nicholas

function SpecialArray() {
    let values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function () {
        return this.join('|');
    };
    return values;
}
let colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString()); // "red|blue|green"*/
/*function ToUpper(value) {
    let str = new String(value);
    str.toUp = function () {
        return this.charAt(0).toUpperCase() + this.substr(1);
    }
    return str;
}
let a = new ToUpper('ssss');
console.log(a.toUp()); // Ssss*/
/*function Person(name, age, job) {
    let o = new Object();
    o.sayName = function () {
        console.log(name);
    }
    return o;
}
let friend = Person('Nicholas', 29, 'Software Engineer')
friend.sayName(); // Nicholas*/
/*function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
}
function SubType() {
    this.subprototype = false;
}

// 继承了 SuperType
SubType.prototype = new SuperType();
// 添加新方法
SubType.prototype.getSubValue = function () {
    return this.subprototype;
}
// 重写超类型中的方法
SubType.prototype.getSuperValue = function() {
    return false;
}

let instance = new SubType();
console.dir(instance.getSuperValue());*/
/*function SuperType() {
    this.colors = ['red', 'blue', 'green']
}
function SubType() {}
// 继承了 SuperType
SubType.prototype = new SuperType();

let instance = new SubType();
instance.colors.push('black');
console.log(instance.colors); // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green', 'black' ]*/
/*function SuperType(name) {
    this.name = name;
    this.say = function () {
        console.log(name);
    }
}
function SubType() {
    // 继承了 SuperType， 同时还传递了参数
    SuperType.call(this, 'Nicholas');

    // 实例属性
    this.age = 20;
}
let instance = new SubType();
console.log(instance.name); // Nicholas
console.log(instance.age); // 20
console.dir(instance);
instance.say();*/
/*function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
    console.log(this.age);
}

let instance = new SubType('Nicholas', 29);
instance.colors.push('brown');
console.log(instance.colors); // [ 'red', 'blue', 'green', 'brown' ]
instance.sayName(); // Nicholas
instance.sayAge(); // 29

let instance1 = new SubType('Greg', 27);
console.log(instance1.colors); // [ 'red', 'blue', 'green' ]
instance1.sayName(); // Greg
instance1.sayAge(); // 27*/
/*function object(o) {
    function F() {
    }
    F.prototype = o;
    return new F();
}
let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'court', 'van']
}
let anotherPerson = Object.create(person, {
    name: {
        value: 'Greg'
    }
});
console.log(anotherPerson.name);  // Greg*/
/*let anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

let yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends); // [ 'Shelby', 'court', 'van', 'Rob', 'Barbie' ]*/
/*function object(o) {
    function F() {
    }
    F.prototype = o;
    return new F();
}
function createAnother(original) {
    let clone = object(original); // 通过调用构造函数创建一个新对象
    clone.sayHi = function () { // 以某种方式来增强这个对象
        console.log('hi');
    };
    return clone;   // 返回这个对象
}
let person = {
    name: 'Nicholas',
    friends: ['shelby', 'court', 'Van']
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // hi*/

/*function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}*/

/*function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};
function SubType(name, age){
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    console.log(this.age);
};*/

function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype);  // 创建对象
    prototype.constructor = subType;              // 增强对象
    superType.prototype = prototype;              // 指定对象
}
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
    console.log(this.age);
}
























































































































































































































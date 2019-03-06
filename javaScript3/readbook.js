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
/*
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
*/
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
        } else {
            this.edition = newValue - this._year;
        }
    }
});
book.year = 2003;
console.log(book.edition); // 2*/
/*function factorial(num) {
    if (num < 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
let factorial = (function f(num) {
    if (num < 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});*/
/*function createComparisonFunction(propertyName) {
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
// 创建函数
let compare = createComparisonFunction('name');

//调用函数
let result = compare({name: 'Nicholas'}, {name: 'Greg'});

//解除对匿名函数的引用（以便释放内存）
compare = null;*/
/*function createFunctions() {
    let result = new Array();
    for (let i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }
    return result;
}*/
/*function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = (function(num) {
            return function() {
                console.log(num);
            };
        })(i);
    }
    return result;
}

console.dir(createFunctions());*/
/*function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar();
}
var baz = foo()
baz();*/
/*var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
console.log(object.getNameFunc()()); // My Object*/
/*
(function () {
   // 这里是块级作用域
})();*/
/*var blocked = false;
try {
    var wroxWin = window.open("http://www.wrox.com", "_blank");
    if (wroxWin == null){
        blocked = true;
    }
} catch (ex){
    blocked = true;
}
if (blocked){
    alert("The popup was blocked!");
}*/
/*let a = confirm('Are you sure?');
if (a) {
    alert('I am so glad you re sure！ ')
} else {
    alert('I am sorry to hear you are not sure!')
}*/
/*var result = prompt("What is your name? ", "");
console.log(result);
if (result !== null) {
    alert("Welcome, " + result);
}*/
/*function getQueryStringArgs() {
    // 取得查询字符串并去掉开头的问好
    let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        // 保存数据的对象
        args = {},
        // 取得每一项
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null;
    // 逐个将每一项添加到args对象中
    for (let i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

function hasPlugin(name) {
    name = name.toLowerCase();
    for (let i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}

console.log(hasPlugin('Flash'));
console.log(hasPlugin('QuickTime'));*/
/*function getElement(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        return document.all[id];
    } else {
        throw new Error('No way to retrieve element');
    }
}*/
/*let android = /Android (\d+\.\d+)/.test(navigator.userAgent);
console.log(RegExp.$1);

let iOS = /CPU (?:iPhone )?OS (\d+_\d+)/.test(navigator.userAgent);
console.log(RegExp.$1); // 11_0
let system = RegExp.$1.replace('_', '.');
console.log(system); // 11.0*/
/*
let a = document.getElementById('div');
let p = document.getElementsByTagName('p');*/
/*let deepList = a.cloneNode(true)
console.log(deepList.childNodes.length); // 7
let shallowList = a.cloneNode(false);
console.log(shallowList.childNodes.length); // 0*/
/*let Img = document.getElementsByTagName('img')
console.log(Img.namedItem('img'));

var animals = [     { animal: 'Horse', name: 'Henry', age: 43 },     { animal: 'Dog', name: 'Fred', age: 13 },     { animal: 'Cat', name: 'Frodo', age: 18 }     ];
console.table(animals);*/
/*console.time('Timer1');
var items = [];
for(var i = 0; i < 100000; i++){
    items.push({index: i});
}
console.timeEnd('Timer1');*/
/*function getQueryStringArgs() {
    let qs = location.search.length > 0 ? location.search.substring(1) : '',
        args = {},
        items = qs.length > 0 ? qs.split('&') : [],
        item = null,
        name = null,
        value = null;
    for (let i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}*/
/*var fragment = document.createDocumentFragment();

let ul = document.getElementById('myList');

let li = null;
for (let i = 0; i < 3; i++) {
    li = document.createElement('li');
    li.appendChild(document.createTextNode('Item' + (i + 1)));
    fragment.appendChild(li);
}
ul.appendChild(fragment);*/
/*function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
loadScript("client.js");*/
/*function loadStyles(url) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
loadStyles("styles.css");*/
/*
let table = document.createElement('table');
table.border = '1';
table.width = '100%';
let tbody = document.createElement('tbody');
let tr1 = document.createElement('tr');
let tr2 = document.createElement('tr');
let td1 = document.createElement('td');
let td2 = document.createElement('td');
let td3 = document.createElement('td');
let td4 = document.createElement('td');
td1.appendChild(document.createTextNode('Cell 1, 1'))
td2.appendChild(document.createTextNode('Cell 2, 1'))
td3.appendChild(document.createTextNode('Cell 1, 2'))
td4.appendChild(document.createTextNode('Cell 2, 2'))
tr1.appendChild(td1)
tr1.appendChild(td2)
tr2.appendChild(td3)
tr2.appendChild(td4)
tbody.appendChild(tr1)
tbody.appendChild(tr2)
table.appendChild(tbody)
document.body.appendChild(table)*/
/*let table = document.getElementsByTagName('table')[0]
let a = table.insertRow(1);
a.insertCell(0).innerText = '1221'
a.insertCell(1).innerText = '1221221*/
// table.rows[1].cells[1].innerText = '121212';
/*let a = document.getElementsByTagName('div')[0].webkitMatchesSelector('.div');
console.log(a);*/
/*function matchesSelector(element, selector) {
    if (element.matchesSelector) {
        return element.matchesSelector(selector);
    } else if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector) {
        return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector) {
        return element.webkitMatchesSelector(selector);
    } else {
        throw new Error('Not supported.')
    }
}*/
/*let activeList = document.getElementsByTagName('li');
let a = 0; // 暂存当前 active 类
Array.from(activeList).forEach((item,index) => {
    item.onclick = function () {
        activeList[a].classList.toggle('active'); // 移除当前的类
        this.classList.add('active'); // 添加类
        a = index;
    }
})*/
/*let button = document.getElementById('myButton');
button.focus();
console.log(document.activeElement === button); // true
console.log(document.hasFocus()); // true*/
/*if (document.compatMode === 'CSS1Compat') {
    alert('Standards mode')
} else {
    alert('Quirks mode')
}*/
/*let a = document.getElementById('myButton')

// 作为前一个同辈元素插入
a.insertAdjacentHTML('beforebegin', '<p>Hello world!</p>');
// 作为第一个子元素插入
a.insertAdjacentHTML('afterbegin', '<p>Hello world!</p>');
// 最为最后一个子元素插入
a.insertAdjacentHTML('beforeend', '<p>Hello world!</p>');
// 作为后一个同辈元素插入
a.insertAdjacentHTML('afterend', '<p>Hello world!</p>');*/
/*function getInnerText(element) {
    return (typeof element.textContent === 'string') ? element.textContent : element.innerText;
}*/
/*let supportsDOM2Core = document.implementation.hasFeature('Core', '2.0');
let supportsDOM3Core = document.implementation.hasFeature('Core', '3.0');
let supportsDOM2HTML = document.implementation.hasFeature('HTML', '2.0');
let supportsDOM2Views = document.implementation.hasFeature('Views', '2.0');
let supportsDOM2XML = document.implementation.hasFeature('XML', '2.0');*/
/*// 取得元素在页面上的偏移量
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}*/
/*let ul = document.getElementById('ul');
console.log(ul.childElementCount);
let newD = document.createElement('p');
newD.textContent = '0000';
let span = document.querySelector('.span');
ul.lastElementChild.appendChild(newD);
ul.removeChild(ul.lastChild)

console.log(ul.getBoundingClientRect())*/
/*let filter = {
    acceptNode: function (node) {
        return node.tagName.toLocaleLowerCase() === 'p' ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
}

let iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, filter, false)*/
/*let div = document.getElementById('div1');
let iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, null, false)

let node = iterator.nextNode();
while(node !== null) {
    console.log(node.tagName);
    node = iterator.nextNode();
}*/
/*let div = document.getElementById('div1')
let filter = function (node) {
    return node.tagName.toLowerCase() === 'li' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
let walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, filter,  false)*/
/*
let btn = document.getElementById('myBtn')
btn.onclick = function (ev) {
    alert(ev.eventPhase);
    // alert('btn')
    // ev.stopPropagation()
}
document.body.onclick = function (e) {
    alert(e.eventPhase);
}
document.body.addEventListener('click', function (e) {
    alert(e.eventPhase);
},true)*/
/*window.addEventListener('load', function() {
   let image = document.createElement('img');
   image.addEventListener('load', function(e) {
       alert(e.target.src);
   });
   document.body.appendChild(image);
   image.src = './img/bg.jpg';
});*/
/*
let fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    let p = document.createElement('p');
    p.textContent = i;
    fragment.appendChild(p);
}
*/
// 无限加载
/*let loading = document.querySelector('.loading');
let flag = true;
window.addEventListener('scroll', (e) => {
    let top = document.documentElement.scrollTop; // 获取页面滚动的高度
    let allH = document.documentElement.offsetHeight; // 获取页面总高度
    let crH = document.documentElement.clientHeight;// 视图区高度
    console.log("当前滚动高度" + top);
    console.log("总的高度" + allH);
    // 300的误差即继续加载
    if (top > (allH - crH - 600)) { // 加载区间判定
        if (flag) {
            // 中间件判定正在加载
            flag = false;
            loading.style.display = 'block'; // 显示loading
            f();
        }
    }
})
async function f() { // 异步判定
    let b = await setTimeout(() => {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < 100; i++) {
            let p = document.createElement('li');
            p.textContent = i;
            fragment.appendChild(p);
        }
        document.getElementById('ul').appendChild(fragment);
        flag = true; // 加载结束
        loading.style.display = 'none'; // 关闭loading
    }, 500);
}*/
/*window.addEventListener('click', function (e) {
    console.log(e.clientX);
    console.log(e.clientY);
    console.log(e.pageX);
    console.log(e.pageY);
    console.log(e.screenX);
    console.log(e.screenY);
})*/
/*document.addEventListener('click', function (e) {
    let keys = [];
    if (e.shiftKey) {
        keys.push('shift');
    }
    if (e.ctrlKey) {
        keys.push('ctrl');
    }
    if (e.altKey) {
        keys.push('alt')
    }
    if (e.metaKey) {
        keys.push('meta')
    }
    alert('keys: ' + keys.join(','))
})*/
// let textbox = document.getElementById('myText')
// textbox.addEventListener('textInput', function (e) {
//     console.log(e.data);
// })
/*let isSupported = document.implementation.hasFeature('MutationEvents', '2.0')
console.log(isSupported);*/
/*window.addEventListener('load', function (e) {
    let ul = document.getElementById('myList')

    document.addEventListener('DOMSubtreeModified', function (e) {
        console.log(e.type);
        console.log(e.target);
    });
    document.addEventListener('DOMNodeRemoved', function (e) {
        console.log(e.type);
        console.log(e.target);
        console.log(e.relatedNode);
    })
    ul.firstChild.addEventListener('DOMNodeRemovedFromDocument', function (e) {
        console.log(e.type);
        console.log(e.target);
    })
    ul.parentNode.removeChild(ul);
})*/
/*window.addEventListener('load', function (e) {
    let list = document.getElementById('myList')
    let item = document.createElement('li')
    item.appendChild(document.createTextNode('Item 4'))

    document.addEventListener('DOMSubtreeModified', function (e) {
        console.log(e.type);
        console.log(e.target);
    })
    document.addEventListener('DOMNodeInserted', function (e) {
        console.log(e.type);
        console.log(e.target);
        console.log(e.relatedNode);
    });
    item.addEventListener('DOMNodeInsertedIntoDocument', function (e) {
        console.log(e.type);
        console.log(e.target);
    })
    list.appendChild(item);
})*/
/*window.addEventListener('load', function (e) {
    let div = document.getElementById('myDiv')
    div.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        let menu = document.getElementById('myMenu')
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px'
        menu.style.visibility = 'visible';
    })
    document.addEventListener('click', function (e) {
        document.getElementById('myMenu').style.visibility = 'hidden';
    })
})*/
/*window.addEventListener('beforeunload', function (e) {
    let mes = 'i am really going to miss you if you go.'
    e.returnValue = mes;
    return confirm('确定退出吗？');
})*/
/*document.addEventListener('readystatechange', function (e) {
    if (document.readyState === 'complete') {
        console.log('1');
    }
})*/
/*(function () {
    let showCount = 0;
    // window.addEventListener('load', function () {
    //     alert('load fired')
    // })
    window.addEventListener('pagehide', function (e) {
        showCount++;
        alert('Show has been fired ' + showCount + ' times.'  + e.persisted)
    })
})();*/
/*window.addEventListener('hashchange', function (e) {
    console.log('old URL' + e.oldURL + '\nNew URL: ' + e.newURL);
})*/
/*window.addEventListener('load', function (e) {
    let div = document.getElementById('myDiv');
    div.innerHTML = 'Current orientation is ' + window.orientation;
    window.addEventListener('MozOrientation', function (e) {
        div.innerHTML = `X=${e.x},Y=${e.y},Z=${e.z}`;
    })
})*/
/*window.addEventListener('deviceorientation', function (e) {
    let output = document.getElementById('myDiv');
    output.innerHTML = `Alpah=${e.alpha}, Beta=${e.beta}, Gamma=${e.gamma}`
})*/
/*function handleTouchEvent(e) {
    if (e.touches.length === 1) {
        let output = document.getElementById('myDiv');
        switch (e.type) {
            case 'touchstart':
                output.innerHTML = `Touch started ${parseInt(e.touches[0].clientX)}, ${parseInt(e.touches[0].clientY) }`;
                break;
            case 'touchend':
                output.innerHTML += `<br>Touch ended ${parseInt(e.changedTouches[0].clientX)}, ${parseInt(e.changedTouches[0].clientY)}`;
                break;
            case 'touchmove':
                e.preventDefault();
                output.innerHTML += `<br>Touch moved ${parseInt(e.changedTouches[0].clientX)}, ${parseInt(e.changedTouches[0].clientY)}`;
                break;
        }
    }
}*/
/*function handleGestureEvent(e) {
    let output = document.getElementById('myDiv')
    switch (e.type) {
        case 'gesturestart':
            output.innerHTML = `Gseture started (rotation=${e.rotation}, scale=${e.scale})`;
            break;
        case 'gestureend':
            output.innerHTML = `<br>Gseture ended (rotation=${e.rotation}, scale=${e.scale})`;
            break;
        case 'gesturechange':
            output.innerHTML = `<br>Gseture changed (rotation=${e.rotation}, scale=${e.scale})`;
            break;
    }
}
document.addEventListener('gesturestart', handleGestureEvent)
document.addEventListener('gestureend', handleGestureEvent)
document.addEventListener('gesturechange', handleGestureEvent)*/
/*let btn = document.getElementById('myBtn')
// 创建事件对象
let event = document.createEvent('MouseEvents');
// 初始化事件对象
event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0,0,false,false,false,false,0, null);
// 触发事件
btn.dispatchEvent(event);*/
/*let text = '中英文自建需要 english 增加空格'
let pat = /(\w+)/ig;
console.log(text.replace(pat, ' $1 ').replace(/\s{2,}/ig,' '))*/
/*
document.documentElement.addEventListener('mousewheel', function (e) {
    console.log(e.wheelDelta);
})*/
/*
var textbox = document.getElementById('myTextbox');
var event;
if (document.implementation.hasFeature('KeyboardEvents', '3.0')) {
    event = document.createEvent('KeyboardEvent');
    event.initKeyboardEvent('keydown', true, true, window, 'a', 0, 'Shift', 0);
}
textbox.dispatchEvent(event)
*/
/*var textbox = document.getElementById('myTextbox');
var event = document.createEvent('Events');
event.initEvent('keypress', true, true);
event.view = document.defaultView;
event.altKey = false;
event.keyCode = 65;
event.charCode = 65;
textbox.dispatchEvent(event);*/
/*let li = document.createElement('li');

var event = document.createEvent('MutationEvents')
event.initMutationEvent('DOMNodeInserted', true, false, li, '', '','', 0);
document.documentElement.dispatchEvent(event);*/
/*let form = document.forms[0];
let sub = form.elements[1];
form.addEventListener('submit', function (e) {
    sub.disabled = true;
})*/
/*
let div = document.getElementById('myDiv');
div.tabIndex = -1;
div.focus();*/
/*let textbox = document.forms[0].elements[1];
textbox.addEventListener('focus', function (e) {
    if (e.target.style.backgroundColor !== 'red') {
        e.target.style.backgroundColor = 'yellow';
    }
})
textbox.addEventListener('blur', function (e) {
    if (/[^\d]/.test(e.target.value)) {
        e.target.style.backgroundColor = 'red';
    } else {
        e.target.value.backgroundColor = '';
    }
})
textbox.addEventListener('change', function (e) {
    let target = e.target;
    // alert(target.value);
})*/
// let textBox = document.forms[0].elements[1];
/*textbox.addEventListener('select', function (e) {
    console.log(getSelectedText(this));
})

function getSelectedText(text) {
    return text.value.substring(text.selectionStart, text.selectionEnd);
}*/
/*
textbox.value = 'Hello World';
textbox.focus();
console.log(textbox.setSelectionRange(0, 3));
*/
/*textbox.addEventListener('keypress', function (e) {
    let target = e.target;
    let charcode = e.charCode;
    if (!/\d/.test(String.fromCharCode(charcode))) {
        e.preventDefault();
    }
})*/
/*textbox.addEventListener('copy', function (e) {
    e.preventDefault(); // 取消默认的复制事件
    let text = window.getSelection().toString(); // 获取复制的内容
    if (text.length >= 10) {
        text += '\n'
            + '作者：YYB\n'
            + '链接：https://www.baidu.com/\n'
            + '来源：666\n'
            + '著作版权归作者所有。请勿转载!'
        return e.clipboardData.setData('text', text); // 返回新的剪切板数据
    } else {
        return e.clipboardData.setData('text', text); // 返回原来的数据
    }
})*/
/*textbox.addEventListener('paste', function (e) {
    let text = e.clipboardData.getData('text'); // 获取剪贴板数据
    // 如果是非数字，禁止粘贴
    if (!/^\d*$/.test(text)) {
        e.preventDefault();
    }
})*/
// 复制版权后缀
/*document.body.addEventListener('copy', function (e) {
    // 禁止默认的复制事件
    e.preventDefault();

    // 新的剪切板数据
    let newText = null;

    // 获取复制的文本
    let copyText = window.getSelection().toString();

    // 如果超出10字符，则添加版权
    if (copyText.length >= 10) {
        newText = copyText + `\n${'作者：YYB'}\n${'链接：http://www.vunbo.com/'}\n${'著作版权归作者所有，未经转载，请勿转载！'}`;
    } else {
        newText = copyText;
    }

    // 兼容模式
    if (e.clipboardData) {
        return e.clipboardData.setData('text/plain', newText);
    } else {
        // IE模式下
        return window.clipboardData.setData('text/plain', newText);
    }
});*/
/*textbox.addEventListener('select', function (e) {
    console.log(this.value.substring(this.selectionStart, this.selectionEnd));
})*/
/*textbox.value = 'hello world';
textbox.focus();
textbox.setSelectionRange(0,3);*/
/*textBox.addEventListener('keypress', function (e) {
    let charCode = e.charCode;
    if (!/\d/.test(String.fromCharCode(charCode))) {
        e.preventDefault()
    }
})*/
/*textBox.addEventListener('paste', function(e) {
    let text = e.clipboardData.getData('text');
    if (!/^\d*$/.test(text)) {
        e.preventDefault();
    }
})*/
/*document.body.addEventListener('copy', function (e) {
    e.preventDefault();
    let newText;
    let copyText = window.getSelection().toString()
    if (copyText.length > 10) {
        newText = copyText + `\n${'作者：YYB'}\n${'链接https://www.baidu.com'}\n${'版权所有，禁止转载'}\n${'来源：www.internet.com'}`
    } else {
        newText = copyText;
    }
    if (e.clipboardData) {
        return e.clipboardData.setData('text/plain', newText);
    } else {
        return window.clipboardData.setData('text', newText)
    }
})*/
/*;(function () { // 立即执行函数
   function tabForward(e) {
       let target = e.target; // 获取target
       // 判断当前输入的值长度
       if (target.value.length === target.maxLength) {
           // 获取父级表单
           let form = target.form;
           for (let i = 0; i < form.elements.length; i++) {
               // 判断当前input
               if (form.elements[i] === target) {
                   // 如果存在下一个则跳转并自动focus
                   if (form.elements[i+1]) {
                       form.elements[i+1].focus();
                   }
                   return;
               }
           }
       }
   }
   let textbox1 = document.getElementById('texTel1');
   let textbox2 = document.getElementById('texTel2');
   let textbox3 = document.getElementById('texTel3');
    textbox1.addEventListener('keyup', tabForward)
    textbox2.addEventListener('keyup', tabForward)
    textbox3.addEventListener('keyup', tabForward)
})()*/
// let input = document.forms[0].elements[0];
/*if (input.validity && !input.validity.valid) {
    if (input.validity.valueMissing) {
        alert('Please specify a value')
    } else if (input.validity.typeMismatch) {
        alert('Please enter an email address')
    } else {
        alert('Value is invalid')
    }
}*/
/*if (document.forms[0].checkValidity()) {
    // 表单有效，继续
} else {
    // 表单无效
}*/
/*let select = document.forms[0].elements['location'];

let selectedIndex = select.selectedIndex;
let selectOption = select.options[selectedIndex];
alert('Selected index: ' + selectedIndex + '\nSelected text: ' + selectOption.text + '\nSelected value: ' + selectOption.value);

function getSelectedOptions(selectbox) {
    let result = []
    let option = null;
    for (let i = 0; i < selectbox.options.length; i++) {
        option = selectbox.options[i];
        if (option.selected) {
            result.push(option)
        }
    }
    return result;
}*/
/*let newOption = document.createElement('option')
newOption.appendChild(document.createTextNode('Option text'))
newOption.setAttribute('value', 'Option value')
let selectbox = document.forms[0].elements['location'];
selectbox.appendChild(newOption)

// 通过 Option 构造函数创建新选项，接受两个参数：文本(text)和值(value).
let otherOption = new Option('OtherOption text', 'Option value');
selectbox.appendChild(otherOption)

// add() 方法：要添加的新选项和将位于新选项之后的选项。如果想在列表的最后添加一个选项，应该将第二个参数设置为null. 在IE中，第二个参数是可选的。
let thirdOption = new Option('third Option text', 'Option value')
selectbox.add(thirdOption, undefined); // 最佳方案*/
/*let selectbox1 = document.getElementById('selLocation1')
let selectbox2 = document.getElementById('selLocation2')

selectbox2.appendChild(selectbox1.options[0])

let optionToMove = selectbox1.options[1];
selectbox1.insertBefore(optionToMove, selectbox1.options[optionToMove.index - 1])*/
/*function serialize(form) {
    let parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    // 遍历所有的元素
    for (i = 0; i < form.elements.length; i++) {
        field = form.elements[i];
        // 判断类型
        switch (field.type) {
            // 单选与多选
            case 'select-one':
            case 'select-multiple':
                if (field.name.length) {
                    for (j = 0; j < field.options.length; j++) {
                        option = field.options[j];
                        // 如果元素被选中
                        if (option.selected) {
                            optValue = '';
                            // 兼容性判断
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute('value') ? option.value : option.text);
                            } else {
                                optValue = (option.attributes['value'].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined:
            case 'file':
            case 'submit':
            case 'reset':
            case 'button':
                break;
            case 'radio':
            case 'checkbox':
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join('&');
}*/
/*window.addEventListener('load', function () {
    frames['richedit'].document.designMode = 'on'
    frames['richedit'].document.execCommand('fontsize', false, 1);
    let result = frames['richedit'].document.queryCommandEnabled('blod');
    console.log(result);
    let isBold = frames['richedit'].document.queryCommandState('bold');
    console.log(isBold);
    let fontSize = frames['richedit'].document.queryCommandValue('bold');
    console.log(fontSize);
})*/
/*let selection = frames['richedit'].getSelection();
let selectedText = selection.toString();
let range = selection.getRangeAt(0);
let span = frames['richedit'].document.createElement('span')
span.style.backgroundColor = 'yellow';
range.surroundContents(span);*/
/*let num = 0;
for (let i = 1; i < 10; i++) {
    if (i % 5 === 0) {
        continue;
    }
    num ++;
}
console.log(num);*/
// 找到所有的匹配的字符串
/*let stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
let positions = new Array();
let pos = stringValue.indexOf("e");
while(pos > -1){
    positions.push(pos);
    pos = stringValue.indexOf("e", pos + 1);
}
console.log(positions); //"3,24,32,35,52"*/

// let range = document.createRange();
/*let day = new Date()
console.log(day.valueOf());
console.log(day.getFullYear());
console.log(day.getMonth());
console.log(day.getDate());
console.log(day.getDay());
console.log(day.getHours());
console.log(day.getMinutes());
console.log(day.getSeconds());
console.log(day.getMilliseconds());*/
/*let text = 'this has been a short number'
let pattern = /(..)or(.)/g;
if (pattern.test(text)) {
    console.log(RegExp.$1);
}
let pat = /^[2-9]\d{3}[/-](0?[1-9]|1[0-2])[/-]((0?[1-9])|([1|2][0-9])|30|31)$/;
console.log(pat.test('2218-12-31'));*/
/*console.log(Math.max(1, 2, 3));
let a = [1,2,31,1]
console.log(Math.max.apply(this, a));*/
/*let book = {
    _year: 2004,
    edition: 1
}
Object.defineProperty(book, 'year', {
    get() {
        return this._year;
    },
    set(newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
})
book.year = 2008;
console.log(book.edition);
let one = Object.getOwnPropertyDescriptor(book, 'year');
console.log(one);
console.log(typeof one.get);*/
/*function object(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function () {
    console.log(this.age);
}*/
/*function Person(name) {
    this.getName = function () {
        return name;
    }
    this.setName = function (value) {
        name = value;
    }
}
let person = new Person('Nicholas');
console.log(person.getName()); // Nicholas
person.setName('Greg')
console.log(person.getName()); // Greg*/
/*(function () {
    // 私有变量和私有函数
   let privateVariable = 10;
   function privateFunction() {
       return false;
   }

   // 构造函数
   MyObject = function () {}
   // 共有/提权方法
   MyObject.prototype.publicMethod = function () {
       privateVariable++;
       return privateFunction();
   }
})()*/
/*(function () {
    let name = ''

    Person = function (value) {
        name = value;
    };

    Person.prototype.getName = function () {
        return name;
    };

    Person.prototype.setName = function (value) {
        name = value;
    }
})()

let p1 = new Person('Nicholas')
console.log(p1.getName()); // Nicholas
p1.setName('Greg');
console.log(p1.getName()); // Greg

let p2 = new Person('Michael');
console.log(p1.getName()); // Michael
console.log(p2.getName()); // Michael*/
/*function getQueryStringArgs() {
    let qs = (location.search.search.length > 0 ? location.search.substring(1) : ''),
        args = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null;
    for (let i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}*/
/*
let form = document.forms[0];
console.log(form);

console.log(document.defaultView.getComputedStyle(form).width);
console.log(form.getBoundingClientRect());*/
/*var range1 = document.createRange();
var range2 = document.createRange();
var p1 = document.getElementById('p1');
var p1Index = -1;
var i, len;
for (i = 0, len = p1.parentNode.childNodes.length; i < len; i++) {
    if (p1.parentNode.childNodes[i] === p1) {
        p1Index = i;
        break;
    }
}
range1.setStart(p1.parentNode, p1Index);
range1.setEnd(p1.parentNode, p1Index + 1);
range2.setStart(p1, 0);
range2.setEnd(p1, p1.childNodes.length);*/
/*var range1 = document.createRange()
var range2 = document.createRange()
var p1 = document.getElementById('p1')
range1.selectNodeContents(p1);
range2.selectNodeContents(p1)
range2.setEndBefore(p1.lastChild);
console.log(range1.compareBoundaryPoints(Range.START_TO_START, range2));// 0
console.log(range1.compareBoundaryPoints(Range.END_TO_END, range2)); // 1*/
// window.addEventListener('load', function () {
//     frames['richedit'].document.designMode = 'on';
// })
// iframe框架中富文本编辑
/*window.onload = function () {
    var editor, bugGroup, doc, box;
    // 获取iframe window
    editor = document.getElementById('HtmlEdit').contentWindow;
    // 获取iframe document
    doc = document.getElementById('HtmlEdit').contentDocument;
    bugGroup = document.getElementById('butGroup')
    bugGroup.addEventListener('click', function (e) {
        switch(e.target.id) {
            case 'bold': addBold(); break;
            case 'copy': copy(); break;
            case 'big': big(); break;
            case 'italic': italic(); break;
            case 'underline': insertorderedlist(); break;
            case 'backColor': createlink(); break;
            case 'p':insertparagraph();break;
        }
    })
    editor.document.designMode = 'on'
    function addBold() {
        editor.document.execCommand('Bold', false, null);
        document.execCommand('Bold', false, null)
    }
    function copy() {
        editor.document.execCommand('copy', false, null);
    }
    function big() {
        editor.document.execCommand('fontsize', false, '3');
        console.log(doc.body.innerHTML);
    }
    function italic() {
        editor.document.execCommand('italic', false, null);
    }
    function insertorderedlist() {
        editor.document.execCommand('insertorderedlist', false, null);
        console.log(doc.body.innerHTML);
    }
    function createlink() {
        editor.document.execCommand('createlink', false, 'https://www.baidu.com/')
    }
    function insertparagraph() {
        editor.document.execCommand('insertparagraph', false, null);
        console.log(doc.body.innerHTML);
    }
}*/
// 富文本编辑器
/*function exec(command, value){
    document.execCommand(command, false, value);
}
document.getElementById('buttonGroup').addEventListener('click', function (e) {
    switch (e.target.id) {
        case 'italic':
            exec('italic',null)
            break;
        case 'justifycenter':
            exec('justifycenter', null);
            break;
        case 'outdent':
            exec('outdent', null);
            break;
        case 'paste':
            exec('paste', null);
            break;
        case 'bold':
            exec('bold',null );
            break;
        case 'underline':
            exec('underline', null);
            break;
        case 'copy':
            exec('copy', null);
            break;
        case 'inserthorizontalrule':
            exec('inserthorizontalrule', null);
            break;
    }
})*/
// 高亮选择的文本
/*document.getElementById('bold').addEventListener('click', function (e) {
    let selection = frames['richedit'].getSelection(); // 获取选择的文本
    let selectedText = selection.toString(); // 取得选择的文本
    let range = selection.getRangeAt(0); // 取得代表选区的范围
    let span = frames['richedit'].document.createElement('span'); // 突出显示选择的文本
    span.style.backgroundColor = 'yellow';
    range.surroundContents(span); // 将选区添加到了带有黄色背景的 <span> 元素中
})*/
/*let drawing = document.getElementById('drawing')
if (drawing.getContext) {
    let ctx = drawing.getContext('2d')
    /!*ctx.fillStyle = '#00f';
    ctx.fillRect(10,10, 50, 50);
    ctx.fillStyle = 'rgba(240,100,100,.5)';
    ctx.fillRect(30,30,50,50);*!/
    // 绘制红色描边矩形
    /!*  ctx.strokeStyle = 'red';
      ctx.strokeRect(10,10,50,50);
      // 绘制半透明的蓝色描边矩形
      ctx.strokeStyle = 'rgba(0,0,255,.5)';
      ctx.strokeRect(30,30,50,50);*!/
    // ctx.clearRect(40,40,10,10);
    /!*ctx.beginPath();
    ctx.strokeStyle = 'red';
    // 开始路径
    ctx.beginPath();

    // 绘制外圆
    ctx.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // 绘制内圆
    ctx.moveTo(194, 100);
    ctx.arc(100,100,94, 0, 2 * Math.PI, false);

    // 绘制分针
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 20);

    // 绘制时针
    ctx.moveTo(100, 100);
    ctx.lineTo(35, 100);

    // 描边路径
    ctx.stroke();
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('12', 100, 20);*!/
    /!*  ctx.moveTo(20,20);
      ctx.lineTo(100,40);
      ctx.quadraticCurveTo(20,20,200,200);
      ctx.stroke();*!/
    /!* ctx.textBaseline = 'middle';
     var fontSize = 100;
     ctx.font = fontSize + 'px Arial';
     while(ctx.measureText('Hello world!').width > 130) {
         fontSize--;
         ctx.font = fontSize + 'px Arial';
     }
     ctx.fillText('Hello world!',10, 10);
     ctx.fillText('Font size is ' + fontSize + 'px', 10, 50);

     let imgUrl = drawing.toDataURL('image/png');
     let image = document.createElement('img')
     image.src = imgUrl;
     document.body.appendChild(image);*!/
    /!*!// 开始路径
     ctx.beginPath();
     // 绘制外圆
     ctx.arc(100,100,99,0,2*Math.PI, false)
     // 绘制内圆
     ctx.moveTo(194,100)
     ctx.arc(100,100,94,0, 2*Math.PI, false)

     // 变换原点
     ctx.translate(100,100)
     ctx.rotate(1);
     // 绘制分针
     ctx.moveTo(0,0)
     ctx.lineTo(0,-85)
     // 绘制时针
     ctx.moveTo(0,0)
     ctx.lineTo(-65, 0);
     // 描边路径
     ctx.stroke()*!/
    /!*ctx.fillStyle = '#f00'
    ctx.save();
    ctx.fillStyle = '#0f0'
    ctx.translate(100,100)
    ctx.save();

    ctx.fillStyle = '#00f'
    ctx.fillRect(0,0,100,200); //  从点（100，100）开始绘制蓝色矩形

    ctx.restore();
    ctx.fillRect(10,10,100,200); // 从点（110，110）开始绘制绿色矩形

    ctx.restore();
    ctx.fillRect(0,0,100,200); // 从点（0，0）开始绘制红色矩形*!/
    /!* let image = document.images[0];
     // ctx.drawImage(image, 10, 10, 400,399);
     ctx.drawImage(image, 200, 100, 200,200,0,100,200,200);*!/

    /!* ctx.shadowOffsetX = 5;
     ctx.shadowOffsetY = 5;
     ctx.shadowBlur = 4;
     ctx.shadowColor = 'rgba(0,0,0,0.5)'

     ctx.fillStyle = '#f00'
     ctx.fillRect(10,10,50,50)
     ctx.fillStyle = 'rgba(0,0,255,1)';
     ctx.fillRect(30,30,50,50);*!/

    // 渐变
    /!* var gradient = createRectLinearGradient(ctx,30,30,70,70)
     gradient.addColorStop(0, 'white');
     gradient.addColorStop(1, 'black');

     // 绘制红色矩形
     ctx.fillStyle = '#f00'
     ctx.fillRect(10,10, 50,50);

     // 绘制渐变矩形
     ctx.fillStyle = gradient;
     ctx.fillRect(30,30,70,70);
 *!/

    /!*!// 径向渐变
     var gradient1 = ctx.createRadialGradient(55,55,10,55,55,30)
     gradient1.addColorStop(0, 'white');
     gradient1.addColorStop(1, 'black')

     ctx.fillStyle = '#f00'
     ctx.fillRect(10,10,50,50)

     ctx.fillStyle = gradient1;
     ctx.fillRect(30,30,50,50);
 *!/

    /!*var image = document.images[0]
    var pattern = ctx.createPattern(image, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(10,10,600,600);*!/
    /!*var imageData = ctx.getImageData(10,5,50,50);
    var data = imageData.data,
        red = data[0],
        green = data[1],
        blue = data[2],
        alpha = data[3];*!/

}
function createRectLinearGradient(ctx, x, y, width, height) {
    return ctx.createLinearGradient(x, y, x + width, y + height)
}*/
/*let drawing = document.getElementById('drawing');
if (drawing.getContext) {
    let ctx = drawing.getContext('2d'),
        image = document.images[0],
        imageData, data,
        i, len, average,
        red, green, blue, alpha;

    // 绘制原始图像
    ctx.drawImage(image, 0, 0);

    // 取得图像数据
    imageData = ctx.getImageData(0,0,image.width, image.height);
    data = imageData.data;

    for (i = 0, len = data.length; i < len; i+=4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        alpha = data[i + 3];

        average = Math.floor((red + green + blue) / 3);
        data[i] = average;
        data[i + 1] = average;
        data[i + 2] = average;
    }
    // 回写图像数据并显示结果
    imageData.data = data;
    ctx.putImageData(imageData, 0, 0);

    // 绘制红色矩形
    ctx.fillStyle = '#f00'
    ctx.fillRect(10,10,50,50)

    // 修改全局透明度
    ctx.globalAlpha = 0.5;

    // 绘制蓝色矩形
    ctx.fillStyle = 'rgba(0,0,255,1)'
    ctx.fillRect(30,30,50,50)

    // 重置全局透明度
    ctx.globalAlpha = 0;
}*/
/*
let drawing = document.getElementById('drawing');

let ctx = drawing.getContext('2d')
ctx.fillStyle = '#f00'
ctx.fillRect(10,10,50,50)

ctx.globalCompositeOperation = 'destination-over'
ctx.fillStyle = 'rgba(0,0,255,1)'
ctx.fillRect(30,30,50,50)*/
/*var buffer = new ArrayBuffer(20)
// var bytes = buffer.byteLength;
var view = new DataView(buffer);

var view = new DataView(buffer, 9)

var view = new DataView(buffer, 9 , 10)*/
/*var iframeWindow = document.getElementById('myframe').contentWindow;
iframeWindow.postMessage('A secret', 'http://localhost:63342');

window.addEventListener('message', function (e) {
    if (e.origin === 'http://localhost:63342') {
        // processMessage(e.data);
        e.source.postMessage("Received!", "http://localhost:63342");
    }
})*/
/*document.getElementById('myframe').addEventListener('dragover', function (e) {
    e.preventDefault();
})

document.getElementsByTagName('p')[0].addEventListener('dragstart', function (e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('pId',this.id);
})
document.getElementById('myframe').addEventListener('dragenter', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
})
document.getElementById('myframe').addEventListener('drop', function (e) {
    let id = e.dataTransfer.getData('pId');
    let p = document.getElementById(id);
    p.parentNode.removeChild(p);
    this.appendChild(p);
})*/
/*window.onload = function () {
    let player = document.getElementById('player'),
        btn = document.getElementById('video-btn'),
        curtime = document.getElementById('curtime'),
        rate2 = document.getElementById('rate2'),
        rate3 = document.getElementById('rate3'),
        fullScreen = document.getElementById('fullScreen'),
        setInterval1,
        duration = document.getElementById('duration');

    btn.addEventListener('click', function (e) {
        if (player.paused) {
            player.play();
            btn.value = 'Pause';
        } else {
            player.pause();
            btn.value = 'Play';
            // 暂停时清楚获取播放时间的定时器
            clearInterval(setInterval1);
        }
    })

    // 2倍速率
    rate2.addEventListener('click', function () {
        player.playbackRate = 2;
    })

    // 3倍速率
    rate3.addEventListener('click', function () {
        player.playbackRate = 3;
    })

    // 全屏
    fullScreen.addEventListener('click', function () {
        player.requestFullscreen();
    })

    // 初始化时显示当前播放时间00：00
    curtime.innerHTML = formatTime(player.currentTime);

    /!* 初始化时，定时器获取总播放时间 *!/
    setTimeout(function () {
        duration.innerHTML = formatTime(player.duration);
    },100);

    // 监听播放时，获取当前播放时间。
    player.addEventListener('playing', function (e) {
        setInterval1 = setInterval(function () {
            curtime.innerHTML = formatTime(player.currentTime);
        },250);
    })
}
/!*播放时间格式化*!/
function formatTime(time) {
    // 设定初始时间
    let minute = 0,
        seconds = 0;
    minute = parseInt(time / 60); // 求余获取分数整数
    seconds = parseInt(time % 60); // 秒数

    // 时间格式补全--00：00
    // 转换成字符串再使用ES6语法补全
    let strMinute = minute.toString().padStart(2, '0');
    let strSec = seconds.toString().padStart(2, '0');
    return `${strMinute}:${strSec}`;
}*/
/*var audio = new Audio('./assets/kiro.mp3')
audio.addEventListener('canplaythrough', function (e) {
    audio.play();
})*/
/*history.pushState({name: 'Nicholas'}, '1111','drag.html')
// history.replaceState({name:"Greg"}, "Greg's page");
window.addEventListener('popstate', function (e) {
    let state = e.state;
    if (state) {
        console.log(state);
    }
})*/
/*function CustomError(message) {
    this.name = 'CustomError'
    this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError('My message');*/
/*function process(values) {
    values.sort();
    for (let i = 0; i < values.length; i++) {
        if (values[i] > 100) {
            return values[i];
        }
    }
    return -1;
}*/
/*
function getQueryStringArgs() {
    let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
        args = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null;
    for (let i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

console.log(getQueryStringArgs());
*/
/*var A = function () {}
A.prototype.n = 1;
var b = new A();
A.prototype = {
    n: 2,
    m: 3
}
var c = new A()
console.log(b.n);// 1
console.log(b.m);// undefined
console.log(c.n);// 2
console.log(c.m);// 3*/
/*var F = function () {}
Object.prototype.a = function () {
    console.log('a');
}
Function.prototype.b = function () {
    console.log('b');
}

var f = new F();
f.a(); // 'a'
// f.b(); //  Not a function
F.a(); // 'a'
console.dir(f)
console.dir(F)
F.b(); // b

function Person(name) {
    this.name = name;
}
let p = new Person('Tom');
console.log(p.__proto__); // Person.prototype
console.log(Person.__proto__); // object.prototype

var foo = {},
    F = function () { }
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);// value a
console.log(foo.b); // undefined

console.log(F.a); // value a
console.log(F.b); // undefined*/
/*
* 1,
* undefined,
* 2,
* 3
*
* 'a'
* not a function
* 'a' ????
* 'b'
*
* Person.prototype
* Function.prototype ?
*
* 'value a'
* 'undefined'
* 'value a'
* 'value b'
* */
/*console.log(Object.__proto__ === Function.prototype);
function Person() {}

console.dir(Person.__proto__);
console.log(Number.__proto__ === Function.prototype);*/
/*function ClassMachine() {
    console.log('类型创造机器');
}
let thingOne = {}
thingOne.__proto__ = ClassMachine.prototype;
console.dir(thingOne);
ClassMachine.call(thingOne)
ClassMachine.prototype.action = function () {
    console.log('动作制造机');
}
thingOne.action();*/
/*function fn1() {
    console.log(1);
    this.num = 111;
    this.sayHey = function() {
        console.log("say hey.");
    }
}
function fn2() {
    console.log(2);
    this.num = 222;
    this.sayHello = function() {
        console.log("say hello.");
    }
}
fn1.call(fn2); // 1
console.log(fn1.num); // undefined
// fn1.sayHey(); // fn1.sayHey is not a function
fn2(); // 2
console.log(fn2.num); // 111
// fn2.sayHello(); // fn2.sayHello is not a function
fn2.sayHey(); //say hey*/
/*
function add(a, b){
    this.demo = 2;
    return a + b;
}
function sub(a, b){
    this.demo = 3;
    return a - b;
}

// apply() 的用法
var a1 = add.apply(sub, [4, 2]); // sub 调用 add 的方法
var a2 = sub.apply(add, [4, 2]);

console.log(add.demo);

console.log(a1) // 6
console.log(a2) // 2*/
/*window.onerror = function(message, url, line) {
    alert(message);
}
let image = new Image();
image.onload = function () {
    console.log('Image loaded');
}
image.addEventListener('error', function(e) {
    console.log('Image not loaded');
})
image.src = 'xx.gif'; // 指定不存在的文件*/
/*function concat(str1, str2, str3) {
    let result = str1 + str2;
    if (str3) { // 绝对不要这样
        result += str3;
    }
    return result;
}
function concat(str1, str2, str3) {
    let result = str1 + str2;
    if (typeof str3 == 'string') {
        result += str3;
    }
    return result;
}*/
/*function addQueryStringArg(url, name, value) {
    if (url.indexOf('?') === -1) {
        url += '?';
    } else {
        url += '&';
    }
    url += decodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}*/
/*function logError(sev, msg) {
    let img = new Image();
    img.src = 'log.php?sec=' + encodeURIComponent(sev) + '&msg=' + encodeURIComponent(msg);
}*/
/*function divide(num1, num2) {
    return num1 / num2;
}

function divide1(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error('divide(): Both arguments must be numbers.')
    }
    return num1 / num2;
}*/
/*function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function divide(num1, num2) {
    assert(typeof num1 === 'number' && typeof num2 === 'number', "divide(): Both arguments must be numbers.")；
    return num1 / num2;
}*/

let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C. Za'
    ],
    edition: 3,
    year: 2011,
    toJSON: function () {
        return this.title;
    }
};

let jsonText = JSON.stringify(book,function (key, value) {
  switch (key) {
      case 'authors':
          return value.join(',')
      case 'year':
          return 5000
      case 'edition':
          return undefined;
      default:
          return value;
  }
})

let json = JSON.stringify(book);
console.log(json);



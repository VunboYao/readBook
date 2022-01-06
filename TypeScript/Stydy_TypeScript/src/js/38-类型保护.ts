{
    /*
    * todo:类型保护
    *  对于联合类型的变量，在使用时如何确切告诉编译器它是哪一种类型
    *  通过类型断言或者类型保护
    * */

    let getRandomValue = (): (string | number) => {
        let num = Math.random()
        return (num >= 0.5) ? 'abc' : 123.123
    }
    let value = getRandomValue()
    console.log(value)

    // todo: 类型断言，每次使用都需要手动告诉编译器，冗余代码较多
    /* if ((value as string).length) {
         console.log((value as string).length)
     } else {
         console.log((value as number).toFixed())
     }*/

    // todo: 定义一个类型保护函数，这个函数的返回类型是一个布尔类型。
    /*function isString(value: string|number) : value is string{
        return typeof value === 'string'
    }
    if (isString(value)) {
        console.log(value.length)
    } else {
        console.log(value.toFixed())
    }*/

    /* todo: 除了可以通过定义类型保护函数的方式告诉编译器使用时联合类型的变量具体是声明类型以外。还可以使用typeof实现类型保护
         注意点：如果使用typeof来实现类型保护：只能使用 === / !==
                     如果使用typeof来实现类型保护，只能保护 number/string/boolean/symbol类型
     */
    /* if (typeof value === 'string') {
         console.log(value.length)
     } else {
         console.log(value.toFixed())
     }*/

    /*
    * todo：除了可以通过typeof来实现类型保护，还可以通过instanceof来实现类型保护
    * */
    class Person {
        name: string = 'yyb'
    }

    class Animal {
        age: number = 12
    }

    let getRandomObject = (): (Person | Animal) => {
        let num = Math.random()
        return (num >= 0.5) ? new Person() : new Animal()
    }
    let obj = getRandomObject()
    console.log(obj)
    if (obj instanceof Person) {
        console.log(obj.name)
    } else {
        console.log(obj.age)
    }

    /*
    * todo: in 操作符
    * */
    type Fish = {
        swim: () => void
    }
    type Dog = {
        running: () => void
    }

    function walk(animal: Fish | Dog) {
        if ('swim' in animal) {
            animal.swim()
        } else {
            animal.running()
        }
    }
}

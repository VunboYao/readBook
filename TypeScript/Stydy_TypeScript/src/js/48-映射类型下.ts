{
    /*
    * Pick映射类型
    * 将原有类型中的部分内容映射到新类型中
    * */
    interface TestInterface {
        name: string
        age: number
    }

    type MyType = Pick<TestInterface, 'name'>
}

{
    /*
    * Record映射类型
    * 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
    * */
    type Animal = 'person' | 'dog' | 'cat'

    interface TestInterface {
        name: string
        age: number
    }

    type MyType = Record<Animal, TestInterface>
    let res: MyType = {
        person: {
            name: 'zs',
            age: 18
        },
        dog: {
            name: 'zs',
            age: 18
        },
        cat: {
            name: 'zs',
            age: 18
        }
    }
}

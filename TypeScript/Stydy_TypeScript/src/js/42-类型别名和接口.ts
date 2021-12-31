// 接口和类型别名异同

// todo：都可以描述属性和方法
{
    type MyType = {
        name: string
        say(): void
    }

    interface MyInterface {
        name: string

        say(): void
    }
}

// todo：都允许拓展
{
    // 接口扩展
    /*interface MyInterface  {
        name: string
        say(): void
    }
    interface MyInterface2 extends MyInterface {
        age: number
    }

    let value:MyInterface2 = {
        name: 'yyb',
        age: 123,
        say(){}
    }*/

    // type扩展
    type MyType = {
        name: string
        say(): void
    }
    type MyType2 = MyType & {
        age: number
    }

    let value: MyType2 = {
        name: 'yyb',
        age: 12,
        say() {
        }
    }
}

// todo： type可以声明基本类型别名，联合类型，元组等类型，interface不能
{
    type MyType = boolean
    type MyType2 = boolean | string | number
    type MyType3 = [string, boolean, number]
}

// todo：type不会自动合并
{
    interface MyInterface {
        name: string
    }

    interface MyInterface {
        age: string
    }

    let value: MyInterface = {
        name: 'yyb',
        age: '12'
    }
}

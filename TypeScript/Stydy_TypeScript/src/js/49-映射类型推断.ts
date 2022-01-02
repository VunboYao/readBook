{
    /*
    * 由映射类型进行推断
    * 对于Readonly, Partial 和 Pick 的映射类型，我们可以对映射之后的类型进行拆包，还原映射之前的类型，这种操作我们称之为拆包
    * */

    interface MyInterface {
        name: string
        age: number
    }

    type MyType<T> = {
        +readonly [P in keyof T]: T[P]
    }

    type test = MyType<MyInterface>

    type UnMyType<T> = {
        -readonly [P in keyof T]: T[P]
    }

    type test2 = UnMyType<MyInterface>
}

{
    /*
    * todo: 类型别名
    *   给一个类型起个名字，但是他们都代表同一个类型
    * */

    // 给string类型起一个别名叫做MyString，那么无论是MyString还是string都表示string
    type MyString = string
    let value: MyString
    value = 'abc'
    // value = 123 // error
    // value = true // error

    /*
    * todo: 类型别名也可以使用泛型
    * */
    type MyType<T> = { x: T, y: T }
    let value2: MyType<number>
    value2 = {x: 123, y: 123}
    // value2 = {x: 123, y: '123'} // error

    /*
    * todo: 可以在类型别名类型的属性中使用自己
    * */
    type MyType2 = {
        name: string
        // 一般用于定义一些树状结构或者嵌套结构
        children?: MyType2
    }
    let value3: MyType2 = {
        name: 'one',
        children: {
            name: 'two',
            children: {
                name: 'three'
            }
        }
    }


    /*
    * todo: 接口和类型别名是相互兼容的
    * */

    type myType4 = {
        name: string
    }

    interface myInterFace {
        name: string
    }

    let valuea: myType4 = {
        name: 'yyb'
    }
    let valueb: myInterFace = {
        name: 'zs'
    }
    valueb = valuea
    valuea = valueb
}

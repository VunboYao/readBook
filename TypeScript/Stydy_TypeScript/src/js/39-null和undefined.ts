{
    /*
    * null和undefined
    * TS具有两种特殊类型， null 和 undefined， 分别具有值 null 和 undefined
    *
    * 1.默认情况下，可以将null和undefined赋值给任意类型
    * 2. 默认情况下, null和undefined可以相互赋值
    *
    * todo:注意点： 在企业中，如果不想把null和undefined赋值给任意类型
    *   或者不想让null和undefined相互赋值，可以开启 strictNullChecks
    * */

    /* let value1: null
     let value2: undefined
     value = value2
     value2 = value1

     let value3: number
     value3 = value1
     value3 = value2*/


    /*
    * todo:如果开启了strictNullChecks，还想把null和undefined赋值给其他的类型。就必须在声明的时候使用联合类型
    * */
    let value: null | number | undefined
    value = null
    value = undefined

    /*
    * todo: 对于可选属性和可选参数而言，如果开启了strictNullChecks，默认情况下数据类型就是联合类型
    *   就是当前的类型 + undefined
    * */

    class Person {
        name?: string
    }

    function say(age?: number) {
    }

}

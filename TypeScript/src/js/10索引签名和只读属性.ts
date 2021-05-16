/*
* TODO：什么是索引签名
* 索引签名用于描述那些 ”通过索引得到” 的类型，比如arr[0]或obj['key']
* */

{
    interface FullName {
        [propName: string]: string

        // 占位符key值string: value(string)
    }

    let obj10: FullName = {
        // TODO: 只要key和value满足索引签名的限定即可，无论有多少个都无所谓
        firstName: 'Vunbo',
        lastName: 'Yao',
        // middleName: false // error
        false: '666' // 对象中，无论key是什么类型，最终都会被自动转换成字符串类型
    }
    console.log(obj10)
}

{
    // 索引签名
    interface stringArray{
        [propName: number]: string
    }
    let arr10:stringArray = {
        0: 'a',
        1: 'b',
        2: 'c'
    }
    // let arr10:stringArray = ['d', 'e', 'f']
    console.log(arr10[0])
    console.log(arr10[1])
    console.log(arr10[2])
}


/*
* TODO: 只读属性：让对象属性只能在对象刚刚创建的时候修改
* */

{
    interface FullName {
        readonly firstName: string
        lastName: string
    }
    let MyName:FullName = {
        firstName: 'Vunbo',
        lastName: 'Yao'
    }
    // MyName.firstName = 'vunbo' // error 只读，禁止修改
    console.log(MyName)

    // TODO: TS内部对只读属性进行了扩展，扩展出来一个只读数组
    // let arr10:Array<string> = ['a1', 'b1', 'c1']
    let arr10:ReadonlyArray<string> = ['a1', 'b1', 'c1']
    console.log(arr10[1])
    // arr10[1] = '666' // error
    console.log(arr10[1])
}

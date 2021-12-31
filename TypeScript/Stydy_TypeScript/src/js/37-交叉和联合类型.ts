{
    /*
      1.交叉类型
         格式：type1 & type2 & ...
         交叉类型是将多个类型合并为一个类型
      */
    let mergeFn = <T, U>(arg1: T, arg2: U): T & U => {
        let res: T & U
        res = Object.assign(arg1, arg2)
        return res
    }

    let res = mergeFn({name: 'yyb'}, {age: 28})
    console.log(res)

    /*
      2.联合类型
          格式： type1 | type2 | ...
          联合类型是多个类型中的任意一个类型
      */
    let value: string | number
    value = 'abc'
    value = 123
}

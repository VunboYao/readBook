{
    // 去除 null 和 undefined 检测
    function getLength(value:string|null|undefined) {
        value = 'abc'
        return () => {
            // return value.length // error
            // return (value || '').length
            // return (value as string).length
            // 可以使用“！”来去除null和undefined
            // todo: ! 的含义就是这个变量一定不是null和undefined.(类型中去除null和undefined)
            return value!.length
        }
    }
    let fn = getLength('www.vunbo.com')
    let res = fn()
    console.log(res)
}

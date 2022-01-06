type person = {
    name: string
    friend?: {
        name: string
        age?: number
    }
}

const info:person = {
    name: 'kobe',
    // friend: {
    //     name: 'yyb'
    // }
}
// todo: '可能缺省值'？.prop
console.log(info.name)
console.log(info.friend?.age) // friend有可能为空


export{}

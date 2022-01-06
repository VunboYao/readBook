type Method = 'GET' | 'POST'
function request(url: string, method: Method){}

type request = {
    url: string
    method: Method
}

const options = {
    url: 'www.vunbo.com',
    method: 'POST' // 默认推理为：字符串类型
}

const options2 = {
    url: 'www.vunbo.com',
    method: 'POST' // 默认推理：字符串类型
} as const // todo:置为只读模式


// request('www', 'POST')
// request(options.url, options.method) // Error: string不能分配给Method
request(options.url, options.method as Method) // todo:类型断言


export {}

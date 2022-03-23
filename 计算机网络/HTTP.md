# 经典5层模型

- 应用层：HTTP、FTP
- 传输层：TCP/UDP
- 网络层：为数据在节点之间传输创建逻辑链路-IP
- 数据链路层：通信的实体间建立数据链路连接
- 物理层：定义物理设备如何传输数据

# 传输层

- 提供可靠的端到端服务
- 传输层向高层屏蔽了下层数据通信的细节

# HTTP2

- 所有数据以二进制传输。http1.1是字符串居多
- 同一个连接里面发送多个请求，不再需要按照顺序来
- 头信息压缩以及推送等提高效率的功能

# 三次握手

- HTTP基于TCP连接之上
- 客户端发起创建连接：SYN = 1， Seq = X
- 服务端返回客户端：SYN = 1， ACK = X + 1， Seq = Y
- 客户端创建连接：ACK = Y + 1， Seq = Z

## 为什么要三次握手？

- 防止服务端开启多余的无用请求
- 避免网络延迟造成的服务器多余开销

# URI

Uniform Resource Identifier 统一资源标识符

用来唯一标识互联网上的信息资源

包含：URL和URN

## URL

Uniform Resource Locator统一资源定位器

`http://user:pass@host.com:80/path?query=string#hash`

`协议:身份:密码hostName：端口/路由/查询条件/局部内容、锚点`

## URN

永久统一资源定位符，资源移动之后还能被找到

## CURL

- `curl Baidu.com`

# CORS跨越

浏览器为了安全，防止跨越。

服务器端可以设置对应的解决方式：

- 允许特定源：`'Access-Control-Allow-Origin': 'http://127.0.0.1:8888'`
- 允许所有：`'Access-Control-Allow-Origin': '*'`

# CORS预请求

## 允许的方法

- GET

- HEAD

- POST

## 允许的Content-Type

- text/plain
- multipart/form-data
- Application/x-www-form-urlencoded

## 其他限制

- 请求头 
- XMLHttpRequestUpload对象均没有注册任何事件监听器
- 请求中没有使用ReadableStream对象

## 预请求

- 通过先执行一个 `Request Method: OPTIONS`,判断是否允许执行接下来的操作。
- **预请求：根据OPTIONS Method获取服务端允许的认可, 再实际发送请求**

```js
const server = Http.createServer((req, res) => {
  res.writeHead(200, {
    // * 允许特定源跨域访问
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8888'
    'Access-Control-Allow-Origin': '*', // 允许跨域
    'Access-Control-Allow-Headers': 'X-Test-Cors', // 允许特定的请求头
    'Access-Control-Allow-Methods': 'PUT, POST, DELETE', // 允许特定的请求方法
    'Access-Control-Max-Age': '10' // 跨域允许的时长，客户端不需要再次预请求
  })
  res.end('Hello Http') // 相当于res.write 和 res.close
})
```

# Cache-Control缓存

## 可缓存性

- public：返回的内容，经过的代理服务器、客户端等，任何地方均可以缓存
- private：只有发起请求的客户端才可以缓存
- no-cache：任何一个节点都不可以缓存。**可以在本地缓存，但是每次发起的请求需要去服务器验证，验证通过后才可以使用缓存。**

## 到期

- `max-age=<seconds>`，设置多少秒后才会过期，客户端才会再次重新请求
- `s-maxage=<seconds>`, 与max-age一样，但是只在代理服务器上生效
- `max-stale=<seconds>`, 发起请求方主动带的请求头。即便缓存已过期，也不去请求新的。浏览器端用不到。

## 重新验证

- must-revalidate，设置了max-age过期后，必须重新去服务器验证
- proxy-revalidate，针对代理服务器设置的，过期后必须重新去验证

## 其他

- no-store，本地和代理服务器都不可以存储。必须去服务器获取。
- no-transform，告诉代理服务器，禁止压缩、格式转换等。

```js
if (req.url === '/script.js') {
  const html = fs.readFileSync('97-max-age.html', 'utf8')
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
    'Cache-Control': 'max-age=200' // 缓存200s,在此期间会一直读取缓存
  })
  res.end(`console.log('script loaded')`)
}
```

防止服务器修改后，仍在缓存期间，打包时文件名称添加`contenthash`

# 资源验证

## 验证头

- Last-Modified（**服务器返回**）
  - 给资源设置上次修改时间
  - 配合If-Modified-Since或者If-UnModified-Since使用（**客户端上送**）
  - 对比上次修改时间以验证资源是否需要更新
- Etag（**服务器返回**）
  - 数据签名。更加严格的验证
  - 配合If-Match或者If-Non-Match使用（**客户端上送**）
  - 对比资源的签名判断是否使用缓存

## Etag验证

- 服务器如果返回no-cache，但客户端下次请求，仍然需要去验证。如果Etag相同，则返回304
- Last-Modified时间同理

```js
if (req.url === '/script.js') {
  const etag = req.headers['if-none-match']
  if (etag === '99999') {
    // 返回码304 Not Modified
    res.writeHead(304, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=2000, no-cache',
      'Last-Modified': '123456',
      'Etag': '99999' // etag校验
    })
    res.end(`console.log('none msg')`)
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=2000, no-cache', // no-cache 需要来服务器验证.如果通过，返回304
      // 'Cache-Control': 'max-age=2000, no-store', // no-store，一直去服务器请求
      'Last-Modified': '123456',
      'Etag': '99999'
    })
    res.end(`console.log('script loaded')`)
  }

}
```
























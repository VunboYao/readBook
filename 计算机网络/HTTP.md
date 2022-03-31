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

## fom中允许的Content-Type

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
- private：只有发起请求的客户端才可以缓存.**代理服务器不能缓存**
- no-cache：任何一个节点都不可以缓存。**可以在本地缓存，但是每次发起的请求需要去服务器验证，验证通过后才可以使用缓存。**

## 到期

- `max-age=<seconds>`，设置多少秒后才会过期，客户端才会再次重新请求
- `s-maxage=<seconds>`, 与max-age一样，**但是只在代理服务器上生效**
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

# Cookie属性

服务器

- 通过Set-Cookie 设置，下次请求会自动带上，键值对、可以设置多个

- max-age和expires设置过期时间
- secure只在https的时候发送
- HttpOnly，禁止JS访问。无法通过document.cookie访问

```js
res.writeHead(200, {
    'Content-Type': 'text/html',
    // test.com下的二级域名都可以访问
    'Set-cookie': ['id=1234;max-age=10;domain=test.com;', 'age=20; HttpOnly']
})
res.end(html)
```

# HTTP长连接

- HTTP1.1中，浏览器TCP最多支持并发6个HTTP连接，需要排队等待
- Connection: keep-alive。复用TCP连接。close则不会复用
- HTTP2中，同一个域名下，可以在一个TCP连接中进行并发请求。**信道复用**

# 数据协商

## 请求

- Accept: 想要接收的数据类型
- Accept-Encoding: 可接收的数据压缩类型
- Accept-Language: 可接收的语言类型。`q`代表权重。默认1最高
- User-Agent: 客户端的相关信息

## 返回

- Content-Type:  返回的数据类型
- Content-Encoding: 对应Accept-Encoding
- Content-Languate: 对应Accept-Language

**X-Content-Type-Options: "nosniff"**.不主动去解析返回的内容类型来展示

- gzip压缩

```js
const html = fs.readFileSync('95-form.html')

res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Encoding': 'gzip'
})
res.end(zib.gzipSync(html)) // 压缩内容
```

- Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryLaNz9X837v8bDBvQ

  ```tex
  ------WebKitFormBoundaryLaNz9X837v8bDBvQ
  Content-Disposition: form-data; name="name"
  
  12313
  ------WebKitFormBoundaryLaNz9X837v8bDBvQ
  Content-Disposition: form-data; name="pwd"
  
  1313
  ------WebKitFormBoundaryLaNz9X837v8bDBvQ--
  
  ```

- **multipart/form-data 对请求的数据类型进行分割**

  ```tex
  针对表单中元素、文件上传时分割
  
  ------WebKitFormBoundarym8UkYI125mkwfEO9
  Content-Disposition: form-data; name="name"
  
  12312
  ------WebKitFormBoundarym8UkYI125mkwfEO9
  Content-Disposition: form-data; name="pwd"
  
  321313
  ------WebKitFormBoundarym8UkYI125mkwfEO9
  Content-Disposition: form-data; name="file"; filename="开发手册.pdf"
  Content-Type: application/pdf
  
  
  ------WebKitFormBoundarym8UkYI125mkwfEO9--
  ```

# Redirect

- 服务器返回报文头中：**Location**
- 301-永久跳转。重定向的路径会被缓存。后续会从缓存中读取。**不会去服务器，若服务器更新，也无法感知**（**除非清缓存**）
- 302-临时跳转。**每次都需要经过服务器**

```js
http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(302, {
      'Location': '/new' // 同域
    })
    res.end('')
  }

  if (req.url === '/new') {
    res.writeHead(302, {
      'Content-Type': 'text/html'
    })
    res.end('<h2>Hello World</h2>')
  }

}).listen(8888)
```

# Content-Security-Policy

## 作用

- 限制资源获取
- 报告资源获取越权

## 限制方式

- default-src限制全局
- 制定资源类型
  - Connect-src
  - img-src
  - font-src
  - frame-src
  - style-src
  - script-src
  - media-src

该策略禁止任何资源的加载，除了来自`cdn.example.com的样式表。`

```js
Content-Security-Policy: default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports
```

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

## 描述策略

- 一个策略由一系列策略指令所组成，每个策略指令都描述了一个针对某个特定类型资源以及生效范围的策略
- 策略应当包含一个`default-src`策略指令

```
Content-Security-Policy: default-src 'self'; script-src https://example.com
```

​	与下列代码等价：

```
Content-Security-Policy: connect-src 'self';
                         font-src 'self';
                         frame-src 'self';
                         img-src 'self';
                         manifest-src 'self';
                         media-src 'self';
                         object-src 'self';
                         script-src https://example.com;
                         style-src 'self';
                         worker-src 'self'
```
# Nginx

## 反向代理

- 正向代理：在客户端中配置代理服务器，通过代理服务器进行互联网访问
- 反向代理：**客户端**对代理是**无感知**的，客户端不需要任何配置就可以访问。只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端。此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器的地址，隐藏了真实服务器IP地址

## 负载均衡

增加服务器的数量，将请求分发到各个服务器上，将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器。

- 轮询（默认）：每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。
- weight: 权重。默认1。权重越高，分配的客户端越多
- ip_hash：每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器
- fair(第三方)： 按后端服务器的响应时间来分配请求，响应时间短的优先分配

## 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度。降低原来单个服务器的压力

- 一种是纯粹把静态文件独立成单独的域名，放在独立的服务器上
- 一种是动态跟静态混合在一起发布，通过nginx来分开
- expires参数：可以使浏览器缓存过期时间，减少与服务器之间的请求和流程。无需去服务端验证，直接通过浏览器自身确认是否过期即可。适合不经常变动的资源。

## 高可用

当nginx宕机后，请求可以继续

- 提供一台主Nginx服务器，一台备份Nginx服务器
- keepalived：利用虚拟IP绑定2个Nginx服务器的地址。当主服务器宕机，自动切换到备份服务器

## 原理

master和worker两个角色

- master只有一个（管理者）
- worker有多个，独立的进程。减少异常退出带来的风险
- worker争抢机制

## 配置实例

```conf
server {
  listen        80;
  server_name   test.com; // 监听需要被代理的地址

  location / {
    proxy_pass  http://127.0.0.1:8888; // 目标地址
    proxy_set_header Host $host; // 将真实的test.com传到服务端
  }
}


server {
  listen        80;
  server_name   a.test.com; // 监听需要被代理的地址

  location / {
    proxy_pass  http://127.0.0.1:8888; // 目标地址
    proxy_set_header Host $host; // 将真实的a.test.com传到服务端
  }
}
```

- Host: 监听客户端的host, 判断需要代理到什么地方

## 代理缓存

```conf
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m; // 配置缓存

server {
	listen 80;
	server_name test.com;

	location / {
    proxy_cache my_cache; // 使用缓存
		proxy_pass http://127.0.0.1:8888;
		#proxy_set_header Host $host;
	}
}
```

## Vary请求头

通过设置该请求头，必须每次请求头相同时，才会缓存

```js
// Server
res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 's-maxage=200',
    'Vary': 'X-Test-Cache'
})
res.end('success')

// Client
fetch('/data', {
    headers: {
        'X-Test-Cache': index++ // 每次变更，不会缓存
    }
}).then(res => {
    return res.text()
}).then(text => {
    document.getElementById('data').innerHTML = text
})
```

# HTTPS

1. 客户端发起：随机数+（支持的）加密套件
2. 服务端返回：随机数+（选择的）加密套件
3. 服务端返回：（公钥）证书
4. 客户端发起：通过公钥加密的随机数发起，服务端通过私钥解密

```js
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m; // 缓存配置

server { // 默认指向HTTP
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name test.com;
  return 302 https://$server_name$request_uri;
}

server {
	listen 443;
	server_name test.com;

  ssl on; // 开启HTTPS
  ssl_certificate_key ../localhost-privkey.pem;
  ssl_certificate ../localhost-cert.pem;

	location / {
    proxy_cache my_cache;
		proxy_pass http://127.0.0.1:8888;
		proxy_set_header Host $host;
	}
}
```

# HTTP2

- 信道复用
- 分帧传输
- Server Push：服务端向客户端推送消息

```js
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name test.com;
  return 302 https://$server_name$request_uri;
}

server {
	listen 443 http2; # 通过nginx开启http2
	server_name test.com;
  http2_push_preload on; # HTTP2  push 资源

  ssl on;
  ssl_certificate_key ../localhost-privkey.pem;
  ssl_certificate ../localhost-cert.pem;

	location / {
    proxy_cache my_cache;
		proxy_pass http://127.0.0.1:8888;
		proxy_set_header Host $host;
	}
}
```


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


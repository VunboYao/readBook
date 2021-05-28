# NVM

- nvm list 查看当前安装的Node.JS所有版本
- nvm install 版本号 安装指定版本的Node.js
- num uninstall 版本号 卸载指定版本的Node.js
- num use 版本号 选择指定版本的Node.js
- nvm list available 查看可下载版本

#  Yarn

- npm install -g yarn 全局安装
- yarn --version 查看版本
- yarn init -y 初始化
- yarn add xx --save 安装生产依赖
- yarn add xx --dev 安装开发依赖
- yarn remove xxx 移除包
- yarn upgrade xxx 更新依赖
- yarn global add xxx 全局安装
- yarn global upgrade xxx 全局更新
- yarn global remove xxx 全局删除

# 环境代码区别

- 浏览器内置提供window 全局对象, this 默认指向window
- NodeJS则是global, this 默认指向空对象 {}

# 全局属性和方法

- __dirname: 该文件所处的目录
- __filename: 当前文件的绝对路径

# 模块暴露的方式

- **都需要先 require 导入**
- exports.xxx = xxx, 不能直接赋值 exports = xxx
- module.exports.xxx = xxx
- global.xxx = xxx

# require 导入注意点

- 可以省略后缀
- 先.js, .json, .node 文件
- 导入自定义模块时,必须添加路径
      
# NPM 包管理

## 全局管理

- npm install -g xx 全局安装
- npm install -g xx@1.0.0 安装特定版本
- npm uninstall -g xxx 卸载
- npm update -g xxx 更新

## 本地管理

- npm config list 查看配置
- npm init -y 初始化 package.json
- npm install xxx (生产环境包依赖)等同于 npm install xxx --save  
- npm install xxx --save-dev (安装开发环境包依赖) 
- npm install === npm install --development 安装开发依赖
- npm install --production 安装生产依赖
- npm update 更新包
- npm uninstall xxx 卸载包
- `npm list -g --depth 0` 查看全局安装的包
- 版本差异:
    - `x.y.z`
        - 第一个数字是主版本
        - 第二个数字是次版本
        - 第三个数字是补丁版本
        - `^`，表示更新**补丁版本**、**次版本**
        - `~`，表示更新**补丁版本**
    - '5.0.3', 表示指定安装的 5.0.3 版本
    - '~5.0.3', 表示安装 5.0.X 中最新的版本
    - '^5.0.3', 表示安装 5.X.X 中最新的版本

# fs

- `stat()`, 文件信息

  ```javascript
  let fs = require('fs')
  // 读取文件状态，判断是文件/文件夹
  fs.stat(__dirname, (err, status) => {
    if (status.isFile()) {
      console.log('is a File');
    } else if (status.isDirectory()) {
      console.log('is a Directory');
    }
  })
  
  // 同步
  let status = fs.statSync(__filename)
  ```

- `readFile()`，读取文件

  ```javascript
  // 1.获取读取文件的路径
  let path = Path.join(__dirname, 'www/index.html')
  // 2.读取文件
  fs.readFile(path, 'utf8', (err, data) => {
    if(err) {
      throw new Error('readFile error')
    }
    console.log(data); // 指定第二个参数
    // console.log(data.toString()); // 未指定第二个参数，则返回buffer
  })
  
  let data = fs.readFileSync(path, 'utf8')
  ```

- `writeFile（file，data[, options],callback)`：写入文件

  ```javascript
  let str = Path.join(__dirname, 'www/demo.txt')
  fs.writeFile(str, 'some demo txt', 'utf-8', (err) => {
    if (err) {
      throw new Error('writeFile error')
    } else {
      console.log('success');
    }
  })
  
  let  res = fs.writeFileSync(str, 'some demo sync txt', 'utf-8')
  ```

- `appendFile(file, data[,options],callback)`: 追加文件

  ```javascript
  let str = Path.join(__dirname, 'www/append.txt')
  let br = '\n'
  const content = `${'some append.txt'}${br}`
  fs.appendFile(str, content, 'utf8', err => {
    if (err) throw err;
    console.log('success appendFile');
  })
  let file = fs.appendFileSync(str, content, 'utf8')
  ```

- `createReadStream(path[, options])`: 文件读取流

  ```javascript
  let readStr = Path.join(__dirname, 'www/demo.txt')
  
  // 2.Create ReadStream
  let readStream = fs.createReadStream(readStr, {
    encoding: 'utf8',
    highWaterMark: 1
  })
  
  // 3. Open Stream
  readStream.on('open', () => {
    console.log('ReadStream Open');
  })
  
  readStream.on('error', () => {
    console.log('ReadStream error');
  })
  
  readStream.on('data', (data) => {
    console.log('ReadStream has get Data: ', data);
  })
  
  readStream.on('close', () => {
    console.log('ReadStream Close');
  })
  ```

- `createWriteStream(path[,options])`：文件写入流

  - writeStream 写入流执行完成后. 需要执行 writeStream.end()

  ```javascript
  // 1.write url
  let writeStr = Path.join(__dirname, 'www/new.txt')
  // 2.CreateWriteStream
  let writeStream = fs.createWriteStream(writeStr, {
    encoding: 'utf-8'
  })
  // 3.Listening Open
  writeStream.on('open', () => {
    console.log('writeStream Open');
  })
  
  writeStream.on('error', () => {
    console.log('writeStream error');
  })
  
  writeStream.on('close', () => {
    console.log('writeStream Close');
  })
  
  let index = 0
  let str = 'www.vunbo.com'
  let timerId = setInterval(() => {
    writeStream.write(str[index])
    console.log('writing data: ', str[index]);
    index++
    if (index === str.length) {
      clearInterval(timerId)
      writeStream.end()
    }
  }, 1000)
  ```

- `mkdir/rmdir/readdir`：目录操作

  ```javascript
  // Create dir
  let str = Path.join(__dirname, 'abc')
  fs.mkdir(str, (err) => {
    if (err) throw err;
    console.log('success mkdir');
  })
  
  // delete dir
  fs.rmdir(str, err => {
    if (err) throw err;
    console.log('delete dir success');
  })
  
  fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      let fileStr = Path.join(__dirname, file)
      let status = fs.statSync(fileStr)
      if (status.isFile()) {
        console.log('isFile: ' + file);
      } else if (status.isDirectory()) {
        console.log('isDirectory: ' + file);
      }
    })
  })
  ```

## 生成文件夹

```javascript
class CreateProject{
  constructor(projectPath, projectName) {
    this.projectPath = projectPath
    this.projectName = projectName
    this.subFiles = ['js', 'css', 'image', 'index.html']
  }

  initProject() {
    // 主文件目录
    let projectP = Path.join(this.projectPath, this.projectName)
    // 写入文件
    fs.mkdirSync(projectP)
    // 遍历内置文件
    this.subFiles.forEach(file => {
      // 子文件目录
      let subPath = Path.join(projectP, file)
      // 扩展名检查
      if (Path.extname(file)) {
        fs.writeFileSync(subPath, '')
      } else {
        fs.mkdirSync(subPath)
      }
    })
  }
}

let a = new CreateProject(__dirname, 'taobao')
a.initProject()
```



## 读写流实现拷贝

- readStream.pipe(writeStream), 读取流管道方法实现拷贝

```javascript
// 1.Create url
let readUrl = Path.join(__dirname, 'www/demo.mp4')
let writeUrl = Path.join(__dirname, 'www/write.mp4')

// 2.Create ReadStream
let readStream = fs.createReadStream(readUrl)
// 3.Create WriteStream
let writeStream = fs.createWriteStream(writeUrl)
// 4.Listening ReadStream
readStream.on('open', () => {
  console.log('readSteam open');
})
readStream.on('error', () => {
  console.log('readSteam error');
})
readStream.on('close', () => {
  console.log('readSteam close');
  // 读取结束，写入结束
  writeStream.end()
})
readStream.on('data', (data) => {
  console.log('readSteam data: ', data);
  // 写入数据
  writeStream.write(data)
})

// 5.Listening WriteStream
writeStream.on('open', () => {
  console.log('writeStream open');
})
writeStream.on('error', () => {
  console.log('writeStream error');
})
writeStream.on('close', () => {
  console.log('writeStream close');
})


// pipe() 实现快速拷贝
let readUrl = Path.join(__dirname, 'www/demo.mp4')
let writeUrl = Path.join(__dirname, 'www/write2.mp4')

// 2.Create ReadStream
let readStream = fs.createReadStream(readUrl)
// 3.Create WriteStream
let writeStream = fs.createWriteStream(writeUrl)
readStream.pipe(writeStream)
```



# 核心原理

执行引入的文件，但引入的为字符串，如何执行字符串中的代码？

## 执行字符串代码

- eval， 执行字符串， 存在依赖关系， 字符串可以访问外界数据， 不安全
- new Function， 存在依赖关系， 字符串可以访问外界数据， 不安全

## vm

- **vm.runInThisContext**: 提供了一个安全的环境执行字符串中的代码。提供的代码不能访问本地的变量， **但是可以访问全局的变量** *global上的变量*
- **vm.runInNewContext:** 提供了一个安全的环境执行字符串中的代码。**不能访问本地与 global 上的变量**

## 手写Node模块系统-代码实现

```js
const path = require('path')
const fs = require('fs')
const vm = require('vm')

class YModule {
    constructor(id) {
        this.id = id // 保存当前模块的绝对路径
        this.exports = {}
    }
}
YModule._cache = {}
YModule._extensions = {
    '.js': function(module) {
        // 1. 读取JS代码
        const script = fs.readFileSync(module.id)
        // 2. 将JS代码包裹到函数中
        const strScript = YModule.wrapper[0] + script + YModule.wrapper[1]
        // 3. 将字符串转换为JS代码
        const jsScript = vm.runInThisContext(strScript)
        // 4. 执行转换之后的JS代码
        jsScript.call(module.exports, module.exports, yRequire)
    },
    '.json': function(module) {
        const json = fs.readFileSync(module.id)
        const obj = JSON.parse(json)
        module.exports = obj
    }
}
YModule.wrapper = ['(function (exports, require, module, __filename, __dirname) {', '\n});']

function yRequire(filePath) {
    // 1. 将传入的相对路径转换为绝对路径
    const absPath = path.join(__dirname, filePath)
    // 2. 尝试从缓存中获取当前模块
    const cachedModule = YModule._cache[absPath]
    if (cachedModule) {
        return cachedModule.exports
    }
    // 3. 如果没有缓存就自己创建一个Module对象
    const module = new YModule(absPath)
    YModule._cache[absPath] = module
    // 4.利用 tryModuleLoad 方法加载模块
    tryModuleLoad(module)
    // 5.返回模块的 exports
    return module.exports
}

function tryModuleLoad(module, filename) {
    // 1.取出模块后缀
    const extName = path.extname(module.id)
    YModule._extensions[extName](module)
}

// const aModule = yRequire('07-core.js')
const aModule = yRequire('./07-core.js')
console.log(aModule);
```

# 面试

- NodeJS 中 this 为什么是空对象？
- **答：call(module.exports)传入的 exports 默认为空**
- NodeJS中为什么可以直接用exports, require, module, __filename, __dirname
- **答：因为以上都是直接传入包装函数的参数**
- NodeJS中为什么不能直接给exports赋值， 而可以给module.exports赋值
- **答：exports 指向 module.exports 的对象，如果直接赋值，将中断对象的连接关系，从而不再相等。**

# EventLoop

- 宏任务， setTimeout, setInterval
- 微任务， promise, MutationObserver, process.nextTick(node), 优先执行

  > *1. 任务队列个数不同*
  >
  > *浏览器事件环有2个事件队列（宏任务与微任务）*
  >
  > *NodeJS事件环有6个事件队列*
  >
  > *2. 微任务队列不同*
  >
  > *浏览器事件环中有专门存储微任务的队列*
  >
  > *NodeJS事件环中没有专门存储微任务的队列*
  >
  > *3. 微任务执行时机不同*
  >
  > *浏览器事件环中每执行完一个宏任务都会去清空微任务队列*
  >
  > *NodeJS事件环中只有同步代码执行完毕和其他队列之间切换的时候会去清空微任务队列*
  >
  > *4. 微任务优先级不同*
  >
  > *浏览器事件环中如果多个微任务同时满足执行条件，采用先进先出*
  >
  > *NodeJS事件环中如果多个微任务同时满足执行条件，会按照优先级执行*

- **Node中执行完任务队列后，或切换队列时，才会去检查微任务**

- 单独运行setTimeout\setImmediate执行结果随机。若在事件循环中，poll执行完会切换到check，永远先执行setImmediate

  > *NodeJS中的任务队列*
  >
  > *timers       执行setTimeout() 和 setInterval() 中到期的 callback*
  >
  > *pending callbacks 执行系统操作的回调， 如： TCP, UDP通信的错误callback*
  >
  > *idle,prepare    只在内部使用*
  >
  > *poll        执行与 I/O 相关的回调。（除了close回调，定时器回调和setImmediate（）之外，几乎所有回调都执行*
  >
  > *check       执行 setImmediate的callback*
  >
  > *close       执行close事件的callback, 例如socket.on('close', ()=>{})*

 ```javascript
// 面试题
const path = require('path')
const fs = require('fs')

fs.readFile(path.join(__dirname, '07-core.js'), () => {
    setTimeout(() => {
        console.log('setTimeout');
    })
    setImmediate(() => {
        console.log('setImmediate');
    })
})
// 先 setImmediate 后 setTimeout.因为 readFile在 poll 事件环中， 再执行 check， 最后 timers
 ```



# npm 包发布

- npm addUser
- npm publish

## package.json核心属性

- main: 指定入口文件

## script

- 通过设置指令：npm run 'key'，执行特定的命令

- test: 可省略为 npm test

- start: 同 test

- bin: 添加一个 key/value， 定义全局包，输出特定的指令, 执行特定的文件。

  > 添加 #！/usr/bin/env node 标识环境为node
  >
  > `bin:{`
  >
  > ​	'demo': 'index.js'
  >
  > `}`

# path

- `require('path')`
- `basename`(): 获取路径的最后一部分，第二个参数**过滤文件扩展名**
- `dirname()`: 用于获取路径中的目录，除了最后一部分的内容
- `extname()`: 获取路径中最后一部分的扩展名
- `isAbsolute()`: 方法检测 `path` 是否为绝对路径
  - Linux操作系统中`/`开头就是绝对路径。**`/`左斜杠**
  - Windows操作系统中盘符开头就是绝对路径。 `\`右斜杠
- `sep()`: 获取当前系统的路径分隔符

- `delimiter`: 路径定界符。
  - Windows 上用 `;`
  - Linux 上用 `：`
- `parse()`: 用于将路径换成对象
- `format()`：用于将对象换成路径
- `join()`: 将所有给定的 `path` 片段连接到一起
  - 如果参数中有`..`，那么会自动根据前面的参数生成的路径，去到上一个路径

- `normalize()`: 规范化给定的 path
- `relative()` : 根据当前工作目录返回 `from` 到 `to` 的相对路径

- `resolve()`: 将路径或路径片段的序列解析为绝对路径。后边的绝对路径会覆盖前边的参数。

# CommonJS模块

- `__filename`: 当前的模块文件的绝对路径
- `__dirname`：当前模块的目录名。相当于 `path.dirname()`

# http

## req, res

- `res.end()`, 只会执行一次,**异常多次执行报错**
- `res.write()`, 发送请求主体。不具备结束请求的功能
- `req.method`, 返回接口请求方式GET/POST

## 服务器建立

```javascript
const Port = 3000
const Http = require('http')
Http.createServer((req,res) => {
  // 通知浏览器返回数据的类型
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8'
  })
  res.end('你好，世界')
}).listen(Port, () => {
  console.log('listening port: ' + Port);
})
```

## 路由分发

```javascript
Http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8'})
  if (req.url.startsWith('/index')) {
    res.end('i am Index')
  } else if (req.url.startsWith('/login')) {
    res.end('i am Login')
  }
  res.end('你好。朋友') // 404
}).listen(Port, () => {
  console.log(`Serving is running in: ${Host}:${Port}`)
})

// 路由返回页面
Http.createServer((req, res) => {
  readFile(req, res)
}).listen(Port, () => {
  console.log(`${Host}:${Port}`)
})

function readFile(req, res) {
  let readPath = Path.join(__dirname, 'www', req.url)
  Fs.readFile(readPath, 'utf8', (err, data) => {
    if (err) {
      res.end('Serving Error')
    } else {
      res.end(data)
    }
  })
}
```

## 服务返回静态资源

- 加载其他资源不能写`utf-8`
- 服务器在响应数据时，如果没有设置响应头，在某些浏览器上将不能正常展示数据

```javascript
Http.createServer((req, res) => {
  readFile(req, res)
}).listen(Port, () => {
  console.log(`${Host}:${Port}`)
})

function readFile(req, res) {
  // 文件路径
  let readPath = Path.join(__dirname, 'www', req.url)
  // 扩展名
  const extName = Path.extname(readPath)
  // 对应数据类型的响应头类型
  let type = mime[extName]
  if (type.startsWith('text')) {
    type += ';charset=utf8'
  }
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': type
  })
  Fs.readFile(readPath, (err, data) => {
    if (err) {
      res.end('Serving Error')
    } else {
      res.end(data)
    }
  })
}
```

## 静态资源服务封装

```javascript
const Path = require('path')
const Fs = require('fs')
const mime = require('./mime.json')

function readFile(req, res, rootPath) {
  // 文件路径
  let readPath = Path.join(rootPath, req.url)
  // 扩展名
  const extName = Path.extname(readPath)
  // 对应数据类型的响应头类型
  let type = mime[extName]
  // 存在文件扩展类型
  const mimeType = type && type.startsWith('text')
  if (!mimeType) {
    res.end('Unavailable mime Type ')
    return
  }
  if (mimeType) {
    type += ';charset=utf8'
  }
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': type
  })
  Fs.readFile(readPath, (err, data) => {
    if (err) {
      res.end('Serving Error')
    } else {
      res.end(data)
    }
  })
}

module.exports.staticServer = readFile


// 引用资源文件
const ss = require('./10-StaticServer.js')
Http.createServer((req, res) => {
  // const rootPath = Path.join(__dirname, 'www')
  const rootPath = '/Users/vunboyao/Desktop/readBook/CSS'
  ss.staticServer(req, res, rootPath)
}).listen(Port, () => {
  console.log(`${Host}:${Port}`)
})
```

# url

解析url路径信息

- **url.parse()解析参数为字符串，传值为`req.url`**

```javascript
const Url = require('url')
let str = "http://root:123456@www.vunbo.com:90/index.html?name=yyb&age=26#apple"
let obj = Url.parse(str, true)
console.log(obj)
```

# querystring(查询字符串)

用于解析和格式化 URL 查询字符串的实用工具

- `parse(str[,sep[,eq[,options]]])`, 解析字符串
  - 别名：`decode()`
- `stringify(obj,[,sep[,eq[,options]]])`：序列化为URL查询字符串的对象
  - 别名：`encode()`

## 获取post请求数据

```javascript
Http.createServer((req, res) => {
  console.log(req.method)
  let params = ''
  req.on('data', chunk => {
    params += chunk
  })
  req.on('end', () => {
    let obj = querystring.parse(params)
    res.end(`${obj.userName}:${obj.password}`)
  })
}).listen(Port)
```


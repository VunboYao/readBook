const Path = require('path')
const Fs = require('fs')
const Http = require('http')

// 读取文件状态，判断是文件/文件夹
/* fs.stat(__dirname, (err, status) => {
  if (status.isFile()) {
    console.log('is a File');
  } else if (status.isDirectory()) {
    console.log('is a Directory');
  }
})
const status = fs.statSync(__filename) */

// 1.获取读取文件的路径
/* let path = Path.join(__dirname, 'www/index.html')

// 2.读取文件
fs.readFile(path, 'utf8', (err, data) => {
  if(err) {
    throw new Error('readFile error')
  }
  console.log(data); // 指定第二个参数
  // console.log(data.toString()); // 未指定第二个参数，则返回buffer
})

let data = fs.readFileSync(path, 'utf8')
console.log(data); */

/* let str = Path.join(__dirname, 'www/demo.txt')
fs.writeFile(str, 'some demo txt', 'utf-8', (err) => {
  if (err) {
    throw new Error('writeFile error')
  } else {
    console.log('success');
  }
})

let  res = fs.writeFileSync(str, 'some demo sync txt', 'utf-8') */

/* let str = Path.join(__dirname, 'www/append.txt')
let br = '\n'
const content = `${'some append.txt'}${br}`
fs.appendFile(str, content, 'utf8', err => {
  if (err) throw err;
  console.log('success appendFile');
})
let file = fs.appendFileSync(str, content, 'utf8') */
// 1.Create Url of ReadFile
/* let readStr = Path.join(__dirname, 'www/demo.txt')

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
}) */
// 1.write url
/* let writeStr = Path.join(__dirname, 'www/new.txt')
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
}, 1000) */

// 1.Create url
/* let readUrl = Path.join(__dirname, 'www/demo.mp4')
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
}) */

/* let readUrl = Path.join(__dirname, 'www/demo.mp4')
let writeUrl = Path.join(__dirname, 'www/write2.mp4')

// 2.Create ReadStream
let readStream = fs.createReadStream(readUrl)
// 3.Create WriteStream
let writeStream = fs.createWriteStream(writeUrl)
readStream.pipe(writeStream) */

// Create dir
/* let str = Path.join(__dirname, 'abc')
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
}) */

// 创建目录文件实例
/* class CreateProject{
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
a.initProject() */

// create server
const Port = 3000
const Host = '127.0.0.1'
const mime = require('./mime.json')
const ss = require('./10-StaticServer.js')
/*Http.createServer((req, res) => {
  // 通知浏览器返回数据的类型
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8'
  })
  res.end('你好，世界')
}).listen(Port, () => {
  console.log('listening port: ' + Port);
})*/

/*Http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8'})
  if (req.url.startsWith('/index')) {
    res.end('i am Index')
  } else if (req.url.startsWith('/login')) {
    res.end('i am Login')
  }
  res.end('你好。朋友') // 404
}).listen(Port, () => {
  console.log(`Serving is running in: ${Host}:${Port}`)
})*/

/*Http.createServer((req, res) => {
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
}*/

/*Http.createServer((req, res) => {
  // const rootPath = Path.join(__dirname, 'www')
  const rootPath = '/Users/vunboyao/Desktop/readBook/CSS'
  ss.staticServer(req, res, rootPath)
}).listen(Port, () => {
  console.log(`${Host}:${Port}`)
})*/

const Url = require('url')
const querystring = require('querystring')
// let str = "http://root:123456@www.vunbo.com:90/index.html?name=yyb&age=26#apple"
// let obj = Url.parse(str, true)
// console.log(obj)
/*Http.createServer((req, res) => {
  console.log(req.method)
  let params = ''
  req.on('data', chunk => {
    params += chunk
  })
  req.on('end', () => {
    let obj = querystring.parse(params)
    res.end(`${obj.userName}:${obj.password}`)
  })
}).listen(Port)*/

/*
1.Node模块
1.1在CommonJS规范中一个文件是一个模块
1.2在CommonJS规范中通过exports暴露数据
1.3在CommonJS规范中通过require()倒入模块


*/

const tet = require('./00HelloWorld')
console.log(tet)





































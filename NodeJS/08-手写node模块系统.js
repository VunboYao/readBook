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

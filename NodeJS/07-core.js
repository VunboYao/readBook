// {
//     // 1. 内部实现一个 require 方法
//     function require(path) {
//         return self.require(path)
//     }

//     // 2. 通过 Module 对象的静态_load 方法加载模块文件
//     Module.prototype.require = function(path) {
//         return Module._load(path, this, /* isMain */ false)
//     }

//     // 3. 通过 Module 对象的静态 _resolveFilename 方法，得到绝对路径并添加后缀名
//     const filename = Module._resolveFilename(request, parent,isMain)

//     // 4. 根据路径判断是否有缓存， 如果没有就创建一个新的 Module 模块对象并缓存起来
//     const cacheModule = Module._cache[filename]
//     if (cacheModule) {
//         return cacheModule.exports
//     }
//     const module = new Module(filename, parent)
//     Module._cache[filename] = module
//     function Module(id, parent) {
//         this.id = id
//         this.exports = {}
//     }

//     // 5. 利用 tryModuleLoad 方法加载模块
//     tryModuleLoad(module, filename)
//         // 5.1 取出模块后缀
//         const extension = path.extname(filename)
//         // 5.2 根据不同后缀查找不同方法并执行对应的方法， 加载模块
//         Module._extensions[extension](this, filename)
//         // 5.3 如果是 JSON 就转换成对象
//         module.exports = JSON.parse(internalModule.stripBOM(content))
//         // 5.4 如果是 JS 就包裹一个函数
//         const wrapper = Module.wrap(content)
//         NativeModule.wrap = function(script) {
//             return NativeModule.wrapper[0] + script + NativeModule.wrapper[1]
//         }
//         NativeModule.wrapper = ['(function (exports, require, module, __filename, __dirname) {', '\n});']
//         // 5.5 执行包裹函数之后的代码，拿到执行结果(String => Function)
//         const compiledWrapper = vm.runInThisContext(wrapper)
//         // 5.6 利用 call 执行 fn 函数，修改 module.exports 的值
//         const args = [this.exports, require, this, filename, dirname]
//         const result = compiledWrapper.call(this.exports, args)
//         // 5.7 返回 module.exports
//         return module.exports
// }

exports.name = 'yyb'
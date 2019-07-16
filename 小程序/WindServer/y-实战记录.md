# 洋葱模型

- await 阻塞线程。等待异步方法返回的结果，await 后可以是表达式，求值。如果返回的是Promise, await会直接返回结果，不必 `res.then(res=>{求值})`
- async 配合 await 使用。 async 函数总返回 promise
- 洋葱模型，以 `await next()` 为分界线

# Koa 基础

- ctx 上下文

  - ctx.path
  - ctx.method

- next() 执行下一个中间件

- ```js
  const Koa = require('koa');
  const app = new Koa();
  app.listen(3000);
  ```

# Koa-router

- <https://www.npmjs.com/package/koa-router>

- `npm install koa-router`

  ```js
  var Koa = require('koa');
  var Router = require('koa-router');
  
  var app = new Koa();
  var router = new Router();
  
  router.get('/', (ctx, next) => {
    // ctx.router available
  });
  
  app.use(router.routes())
  ```

  

# 服务自动重启

- 安装 `cnpm i nodemon -g`

- 启动 `nodemon app.js`

  

# 自动导入module文件

- `cnpm i require-directory`

- ```js
  const requireDirectory = require('require-directory');
  const Router = require('koa-router');
  
  const modules = requireDirectory(module, './app/api/v1', {
    visit: whenLoadModule
  });
  
  function whenLoadModule(obj) {
    if (obj instanceof Router) {
      app.use(obj.routes())
    }
  }
  ```

# Process.cwd()

- 获取绝对路径


import _ from 'lodash'

// TODO:异步导入。魔法注释.针对output.chunkFilename中name命名
/* import(/!* webpackChunkName: 'foo' *!/'./foo').then(() => {
  console.log('123')
}) */

// TODO：异步导入。生产环境会自动生成一个独立的包(随机数字命名)。默认命名为:optimization.chunkIds: "deterministic"
/* import('./bar02').then(() => {
  console.log('res02 async')
}) */

console.log(_.join(['Hello', 'Webpack']))
console.log('Hello Webpack')

/*
* prefetch=>魔法注释 webpackPrefetch: true
* Preload
* */

// 懒加载
const button = document.createElement('button')
button.innerHTML = 'LoadEle'
button.addEventListener('click', () => {
  // 1.懒加载
/*  import(/!* webpackChunkName: 'lazy' *!/'./lazy').then((res) => {
    document.body.appendChild(res.default)
  }) */
  // 2.TODO:预获取。浏览器限制时下载
  /* import(
    /!* webpackChunkName: 'prefetch' *!/
    /!* webpackPrefetch: true *!/
    './lazy'
  ).then((res) => {
    document.body.appendChild(res.default)
  }) */
  // 3.预加载。与父级一同加载。并行
  import(
    /* webpackChunkName: 'preload' */
    /* webpackPreload: true */
    './lazy'
  ).then((res) => {
    document.body.appendChild(res.default)
  })
})
document.body.appendChild(button)

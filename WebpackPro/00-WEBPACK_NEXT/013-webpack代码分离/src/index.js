import _ from 'lodash'
// import dayJs from 'dayjs'

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
// console.log(dayJs(), 'index')

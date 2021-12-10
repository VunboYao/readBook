import _ from 'lodash'
import dayJs from 'dayjs'

// 魔法注释
import(/* webpackChunkName: 'foo' */'./foo').then(() => {
  console.log('123')
})

import('./bar02').then((res) => {
  console.log('res02 async')
})

console.log(_.join(['Hello', 'Webpack']))
console.log('Hello Webpack')
console.log(dayJs(), 'index')

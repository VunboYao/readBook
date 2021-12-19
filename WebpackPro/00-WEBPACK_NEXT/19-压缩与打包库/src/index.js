import { sum } from './math'
import './index.css'

const title = document.getElementById('root')
title.setAttribute('class', 'title')
title.innerText = 'Hello Vue3'

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
    './foo'
  ).then((res) => {
    const res2 = res.default.add(1, 4)
    document.body.appendChild(res2)
  })
})
document.body.appendChild(button)

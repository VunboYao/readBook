import js0 from './js/00-test'
import './css/00-test.css';

const name = js0.getFullName()
const element = js0.component(name)
document.body.appendChild(element)

// 处理less scss
import './css/01-less.less'
import './css/01-sass.scss';
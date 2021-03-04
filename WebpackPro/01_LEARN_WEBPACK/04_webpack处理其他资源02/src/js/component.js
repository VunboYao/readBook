// import 'css-loader!../css/component.css';
import '../css/component.css';
import '../css/less.less';
import carSrc from '../img/car.jpg';

function component() {
  const element = document.createElement('div')

  element.innerHTML = ['Hello', 'Webpack'].join(' ')
  element.classList.add('content')

  // 2.image
  const carImg = new Image()
  carImg.classList.add('car-image')
  // carImg.src = require('./../img/car.jpg').default
  carImg.src = carSrc
  element.appendChild(carImg)

  // 3.增加一个div，用于存放图片
  const bgDiv = document.createElement('div')
  bgDiv.style.width = '200px'
  bgDiv.style.height = '200px'
  bgDiv.style.display = 'inline-block'
  bgDiv.className = 'bg-image'
  bgDiv.style.backgroundColor = 'red'
  element.appendChild(bgDiv)

  // 4.font
  const iEle = document.createElement('i')
  iEle.classList.add('iconfont')
  iEle.classList.add('icon-baoxincai')
  element.appendChild(iEle)

  return element
}

document.body.appendChild(component())

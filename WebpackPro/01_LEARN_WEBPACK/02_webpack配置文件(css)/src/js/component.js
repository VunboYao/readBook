// import 'css-loader!../css/component.css';
import '../css/component.css';
import '../css/less.less';

function component() {
  const element = document.createElement('div')

  element.innerHTML = ['Hello', 'Webpack'].join(' ')
  element.classList.add('content')
  return element
}

document.body.appendChild(component())

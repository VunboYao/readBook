require('./demo.css');
require('./sass.scss');

import logo from './home.png'

let image = new Image();
image.src = logo;
document.body.appendChild(image);

class Log{
  constructor() {
    console.lo('error')
  }
}
let log = new Log();
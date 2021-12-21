import code from './doc.md'
import './index.css'
import 'highlight.js/styles/default.css'

const msg = 'Hello'
const fun = () => {
	return msg + ' World'
}

document.body.innerHTML = code

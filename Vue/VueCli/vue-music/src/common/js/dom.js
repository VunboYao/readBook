/**
 * container define className ?
 * @param el
 * @param className
 * @returns {boolean}
 */

// Configuration of different browser CSS
const elementStyle = document.createElement('div').style
const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}


export function addClass(el, className) {
  if (hasClass(el,className)) return

  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ')
}

export function hasClass(el,className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className);
}
export default function getData(el,name,val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute (name)
  }
}
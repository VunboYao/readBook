import FilterData from './index'
import Vue from 'vue'

const FilterDataCon = Vue.extend(FilterData)
let instance

const main = (options=[], resolve, reject) => {
  if (instance) return
  instance = new FilterDataCon({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
  if (!options && !options.length && typeof options === 'function') {
    instance.resolve = options || function (){}
  } else {
    options.originData.forEach(item => {
      item.checked = true
    })
    for (const [k,v] of Object.entries(options)) {
      instance[k] = v
    }
    instance.resolve = resolve || function (){}
    instance.reject = reject || function (){}
    console.log(instance)
  }

  instance.close = () => {
    if (!instance) return
    instance.visible = false
    document.body.removeChild(instance.$el)
    instance = undefined
  }

  Vue.nextTick().then(() => {
    instance.visible = true
  })
}

main.close = () => {
  if (!instance) return
  instance.close()
}
export {
  main as FilterData
}

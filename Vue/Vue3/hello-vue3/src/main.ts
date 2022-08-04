import { createApp } from 'vue'
import App from './App.vue'
import pluginObject from './plugins/01-object'
import pluginFun from './plugins/02-functions'
const app = createApp(App)

app.use(pluginObject)
app.use(pluginFun)

let sensors = require('sa-sdk-javascript')
sensors.init({
  show_log: true,
  is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  use_client_time: true,
  send_type: 'beacon',
  heatmap: {
    element_selector: 'button',
    scroll_delay_time: 1000,
    // 同data-sensors-click，写了该属性，点击时就会自动收集埋点
    track_attr: ['hotrep', 'anotherprop', 'button', 'customF', "data-prop2"],
    clickmap: 'not_collect',
    // 滚动触边视图，默认4秒机制
    scroll_notice_map: 'default',
    // 配置采集元素,叶子节点时采集s
    collect_tags: {
      div: true,
      button: 'false',
      // span: true,
    },
    // get_vtrack_config: true,
  },
})

// 注册公共属性
sensors.registerPage({
  current_url: location.href,
  referrer: document.referrer,
  common: 'property',
})
sensors.quick('autoTrack') //用于采集 $pageview 事件。

app.config.globalProperties.$sensors = sensors

app.mount('#app')

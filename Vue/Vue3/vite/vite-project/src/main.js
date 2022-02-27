import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routers'
import App from './App.vue'

import { errorHandler } from './global' // 全局属性注册
import i18nPlugin, { translateSource } from './plugins' // 插件注册
import { vFocus } from './directives' // 全局指令

// 创建APP
const app = createApp(App)

app.use(i18nPlugin, translateSource)
app.use(errorHandler)
app.directive('focus', vFocus)
app.use(router)
app.use(createPinia()) // 需要在路由，App创建之后
app.mount('#app')

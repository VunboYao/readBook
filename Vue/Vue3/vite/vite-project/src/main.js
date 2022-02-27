import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { errorHandler } from './global' // 全局属性注册
import i18nPlugin, { translateSource } from './plugins' // 插件注册
import { vFocus } from './directives' // 全局指令


const app = createApp(App)

app.use(i18nPlugin, translateSource)
app.use(errorHandler)
app.directive('focus', vFocus)
app.use(createPinia())
app.mount('#app')

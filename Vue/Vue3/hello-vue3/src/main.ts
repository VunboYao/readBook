import { createApp } from 'vue'
import App from './App.vue'
import pluginObject from './plugins/01-object'
import pluginFun from './plugins/02-functions'
import Pinia from '@/store'
import Router from '@/router'
const app = createApp(App)

app.use(pluginObject)
app.use(pluginFun)
app.use(Router)
app.use(Pinia)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import pluginObject from './plugins/01-object'
import pluginFun from './plugins/02-functions'
const app = createApp(App)

app.use(pluginObject)
app.use(pluginFun)

app.mount('#app')

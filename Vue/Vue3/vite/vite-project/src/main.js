import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { errorHandler } from './global'
import i18nPlugin, { translateSource } from './plugins'


const app = createApp(App)

app.use(i18nPlugin, translateSource)
app.use(errorHandler)
app.use(createPinia())
app.mount('#app')

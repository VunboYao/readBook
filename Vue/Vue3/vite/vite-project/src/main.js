import { createApp } from 'vue'
import App from './App.vue'

import { errorHandler } from './global'


const app = createApp(App)

app.use(errorHandler)
app.mount('#app')

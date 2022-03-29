import { createApp } from 'vue'
import App from './App'

createApp(App).mount('#app')

// * 环境变量
console.log(import.meta.env)

// * 自定义的环境变量
console.log(import.meta.env.VITE_TITLE)

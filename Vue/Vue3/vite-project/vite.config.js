import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite' // api自动导入
import Components from 'unplugin-vue-components/vite' // 组件自动导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      // 自动导入依赖库的api
      imports: ['vue', 'vue-router', 'pinia']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@comp': '/src/components',
      '@view': '/src/views',
      '@direct': '/src/directives'
    },
  },
})

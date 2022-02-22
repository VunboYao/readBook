import Vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
    legacy({
      targets: ['defaults', 'not ie 11']
    })
  ]
})
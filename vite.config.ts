import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetUpExtend from 'vite-plugin-vue-setup-extend'  // 引入插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetUpExtend(),  // 使用插件
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

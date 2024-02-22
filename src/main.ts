import './assets/main.css'

import { createApp } from 'vue'   // 引入创建函数，用于创建应用
import App from './App.vue'       // 引入“根”组件，

import {createPinia}  from 'pinia'  // 引入pinia
import router from './router'  // 引入router

// createApp(App).mount('#app')    // 创建一个“根”组件，将其挂载到 id = "app" 的容器中， 这个容器在index.html中定义

// 创建应用
const app = createApp(App)

// 创建pinia
const pinia = createPinia()

// 使用Pinia
app.use(pinia)

// 使用路由器
app.use(router)

// 挂载应用到app容器中
app.mount('#app')
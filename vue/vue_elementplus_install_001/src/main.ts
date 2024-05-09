import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/main.scss'
import { ElButton, ElCard } from 'element-plus'

const app =  createApp(App)
app.component('ElButton',ElButton)
app.component('ElCard',ElCard)

app.mount('#app')

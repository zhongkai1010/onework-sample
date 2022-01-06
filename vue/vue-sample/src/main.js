/*
 * @Author: 钟凯
 * @Date: 2022-01-06 19:26:45
 * @LastEditTime: 2022-01-06 19:38:36
 * @LastEditors: 钟凯
 * @Description: 
 * @FilePath: \vue-sample\src\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/base.css'
import App from './App.vue'


createApp(App)
    .use(ElementPlus)
    .mount('#app')

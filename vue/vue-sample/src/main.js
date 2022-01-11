/*
 * @Author: 钟凯
 * @Date: 2022-01-06 19:26:45
 * @LastEditTime: 2022-01-06 19:38:36
 * @LastEditors: 钟凯
 * @Description:
 * @FilePath: \vue-sample\src\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import devtools from '@vue/devtools'
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/css/base.css';
import App from './App.vue';
import routes from './routes/index';
import userStore from './store/userStore';

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
});

 
createApp(App).use(userStore).use(router).use(ElementPlus)
    .mount('#app');
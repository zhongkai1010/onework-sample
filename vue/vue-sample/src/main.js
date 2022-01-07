/*
 * @Author: 钟凯
 * @Date: 2022-01-06 19:26:45
 * @LastEditTime: 2022-01-06 19:38:36
 * @LastEditors: 钟凯
 * @Description:
 * @FilePath: \vue-sample\src\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/css/base.css';
import App from './App.vue';
import Index from './views/Index.vue';
import Login from './views/Login.vue';

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
});

const store = createStore({
    state() {
        return {
            count: 0,
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
});

createApp(App).use(store).use(router).use(ElementPlus)
    .mount('#app');
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "root",
    path: "/",
    component: () => import("../layout/index.vue"),
    redirect: "/home",
    children: [
      {
        name: "home",
        path: "home/:id?",
        component: () => import("../views/home/index.vue"),
      },
      {
        name: "user",
        path: "user",
        component: () => import("../views/user/index.vue"),
      },
      {
        name: "role",
        path: "role",
        component: () => import("../views/role/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/404.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

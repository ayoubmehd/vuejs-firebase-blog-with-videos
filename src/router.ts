import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/:any(.*)*",
    name: "not-found",
    component: () => import("./views/404.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

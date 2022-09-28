import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/new",
    component: () => import("./views/NewBlog.vue"),
  },

  {
    path: "/new/upload",
    component: () => import("./views/Uploading.vue"),
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

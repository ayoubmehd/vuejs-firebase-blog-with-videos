import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "./store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./views/Home.vue"),
    meta: {
      title: "Home",
    },
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
    path: "/register",
    component: () => import("./views/Register.vue"),
    name: "register",
    meta: {
      public: true,
      layout: "empty",
    },
  },
  {
    path: "/login",
    component: () => import("./views/Login.vue"),
    name: "login",
    meta: {
      public: true,
      layout: "empty",
    },
  },

  {
    path: "/:id",
    component: () => import("./views/SingleBlog.vue"),
    name: "blog",
  },
  {
    path: "/:id/edit",
    component: () => import("./views/EditBlog.vue"),
    name: "blog-edit",
  },
  {
    path: "/:any(.*)*",
    name: "not-found",
    component: () => import("./views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (!store.state.user && !to.meta.public) {
    return "/login";
  }

  return true;
});

export default router;

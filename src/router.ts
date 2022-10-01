import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "./store";

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
    path: "/register",
    component: () => import("./views/Register.vue"),
    name: "register",
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    component: () => import("./views/Login.vue"),
    name: "login",
    meta: {
      public: true,
    },
  },

  {
    path: "/:id",
    component: () => import("./views/SingleBlog.vue"),
    name: "blog",
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
  if (!!store.state.user) return true;

  if (!!to.meta.public) return true;

  if (!store.state.user) {
    return "/login";
  }

  return false;
});

export default router;

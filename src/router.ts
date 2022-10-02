import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getUserInfo } from "./firebase";
import store from "./store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    components: {
      MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/Home.vue"),
    },
    meta: {
      title: "Home",
    },
  },
  {
    path: "/new",
    components: {
      MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/NewBlog.vue"),
    },
  },

  {
    path: "/new/upload",
    components: {
      MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/Uploading.vue"),
    },
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
    components: {
      MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/SingleBlog.vue"),
    },
    name: "blog",
  },
  {
    path: "/:id/edit",
    components: {
      MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/EditBlog.vue"),
    },
    name: "blog-edit",
  },
  {
    path: "/:any(.*)*",
    name: "not-found",
    components: {
      MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/404.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta.public) {
    return true;
  }

  const user = await getUserInfo();

  if (!user) {
    store.commit("setUser", { user });
    return "/login";
  }

  return true;
});

export default router;

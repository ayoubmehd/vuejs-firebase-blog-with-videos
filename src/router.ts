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
    path: "/verfiy-email",
    components: {
      // MainNavbar: () => import("./Layout/MainNavbar.vue"),
      default: () => import("./views/VerfiyEmail.vue"),
    },
    name: "verfiy-email",
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
  const user = await getUserInfo();

  store.commit("setUser", { user });
  if (to.name === "verfiy-email") {
    return true;
  }

  if (to.meta.public) {
    return true;
  }

  if (!user) {
    return "/login";
  }

  if (!user.emailVerified) {
    console.log(user.emailVerified);

    return "/verfiy-email";
  }

  return true;
});

export default router;

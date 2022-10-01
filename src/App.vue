<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { auth } from "./firebase";

const router = useRouter();
const store = useStore();

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    store.commit("setUser", { user });

    if (!!user) {
      router.push({
        path: "/",
      });
    } else {
      router.push({
        name: "login",
      });
    }
  });
});
</script>

<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { auth } from "./firebase";
import LayoutDefault from "./Layout/Default.vue";
import LayoutEmpty from "./Layout/Empty.vue";

const router = useRouter();

const route = useRoute();
const store = useStore();

const CurrentLayout = ref(LayoutDefault);

onMounted(() => {
  if (route.meta.layout === "empty") {
    CurrentLayout.value = LayoutEmpty;
  }

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
  <CurrentLayout>
    <router-view></router-view>
  </CurrentLayout>
</template>

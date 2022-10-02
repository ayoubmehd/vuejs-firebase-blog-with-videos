<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { auth } from "./firebase";

const store = useStore();

// onMounted(() => {
//   auth.onAuthStateChanged((user) => {
//     store.commit("setUser", { user });
//   });
// });
</script>

<template>
  <router-view name="MainNavbar"></router-view>
  <router-view></router-view>
</template>

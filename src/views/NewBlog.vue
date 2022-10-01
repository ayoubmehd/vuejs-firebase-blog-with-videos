<script setup lang="ts">
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/index";
import BlogEditor from "../components/BlogEditor.vue";
import { useStore } from "vuex";

const store = useStore();
</script>
<template>
  <div class="flex items-center justify-center h-screen overflow-auto">
    <BlogEditor></BlogEditor>
  </div>
</template>

<style scoped></style>

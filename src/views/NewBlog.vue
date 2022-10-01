<script setup lang="ts">
import BlogEditor from "../components/BlogEditor.vue";
import { useStore } from "vuex";

const store = useStore();
</script>
<template>
  <div class="flex justify-center">
    <BlogEditor></BlogEditor>
  </div>
</template>

<style scoped></style>

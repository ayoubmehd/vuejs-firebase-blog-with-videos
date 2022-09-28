<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const { videos } = store.getters;

const videosProgress = ref([]);

onMounted(() => {
  videosProgress.value = videos.map(() => 0);
});
</script>
<template>
  <div v-for="(content, index) in videos">
    <FormKit
      v-model="videosProgress[index]"
      type="range"
      label="Volume"
      min="0"
      max="11"
      help="Select your volume level."
    />
    <pre wrap>{{ videosProgress[index] }}</pre>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { onMounted, ref } from "vue";
import { storage } from "../firebase";

const props = defineProps<{
  path: string;
}>();

const starsRef = storageRef(storage, props.path);

const url = ref<string>("");

onMounted(() => {
  (async () => {
    url.value = await getDownloadURL(starsRef);
  })();
});
</script>
<template>
  <video controls crossorigin="anonymous" v-if="!!url" :src="url"></video>
</template>

<style scoped></style>

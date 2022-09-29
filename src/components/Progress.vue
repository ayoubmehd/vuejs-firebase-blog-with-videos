<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  value: number;
}>();

const style = computed(() => {
  return {
    width: `${props.value}%`,
  };
});
</script>
<template>
  <div class="w-full w-96">
    <div class="h-8 bg-slate-900" :style="style"></div>
  </div>
</template>

<style scoped></style>

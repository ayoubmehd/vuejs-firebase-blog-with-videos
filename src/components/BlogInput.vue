<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type: string;
  modelValue: string | File | null;
}>();

const content = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const emit = defineEmits(["update:modelValue"]);

function getFile($event: any) {
  content.value = $event.target.files[0];
}
</script>
<template>
  <FormKit
    v-if="type === 'text'"
    v-model="content"
    type="textarea"
    label="Your Essay"
    placeholder="Remember to write in complete sentences."
    help="I'll know if you didn't read the book!"
  />

  <FormKit
    v-else
    type="file"
    @change="getFile"
    label="Your Essay"
    accept="video/*"
    prefix-icon="fileVideo"
    placeholder="Remember to write in complete sentences."
    help="I'll know if you didn't read the book!"
  />
</template>

<style scoped></style>

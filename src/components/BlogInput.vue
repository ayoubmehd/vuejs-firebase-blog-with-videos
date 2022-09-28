<script setup lang="ts">
import {
  addDoc,
  setDoc,
  collection,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { ref as storageRef } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { storage } from "../firebase";

const store = useStore();

const { post } = store.state;

const props = defineProps<{
  type: string;
  modelValue: string | File | null;
}>();

const docRef = ref<DocumentReference<DocumentData>>();

const content = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
    if (!docRef.value) {
      return;
    }

    setDoc(docRef.value, {
      content: val,
      type: props.type,
    });
  },
});

onMounted(() => {
  (async () => {
    docRef.value = await addDoc(collection(post, "content"), {
      type: props.type,
      content: null,
    });
  })();
});

const emit = defineEmits(["update:modelValue"]);

function getFile($event: any) {
  if (!docRef.value) return;

  const file: File = $event.target.files[0];

  const videoRef = storageRef(
    storage,
    `videos/${uuid()}.${file.name.split(".").pop()}`
  );

  content.value = videoRef.fullPath;

  store.commit("newFile", file);

  // setDoc(docRef.value, {
  //   content: videoRef.fullPath,
  //   type: props.type,
  // });
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
  <FormKit v-else type="group">
    <FormKit
      type="file"
      @change="getFile"
      label="Your Essay"
      accept="video/*"
      prefix-icon="fileVideo"
      placeholder="Remember to write in complete sentences."
      help="I'll know if you didn't read the book!"
    />
  </FormKit>
</template>

<style scoped></style>

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
import { computed, onMounted, ref, unref } from "vue";
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
    docRef.value = await addDoc(collection(unref(post), "content"), {
      type: props.type,
      content: null,
    });
  })();
});

const emit = defineEmits(["update:modelValue"]);

async function getFile($event: any) {
  if (!docRef.value) return;

  const file: File = $event.target.files[0];

  const videoRef = storageRef(
    storage,
    `videos/${uuid()}.${file.name.split(".").pop()}`
  );

  console.log("GET FILE");

  content.value = videoRef.fullPath;

  const duration = await getVideoDuration(file);

  store.commit("newFile", {
    file,
    duration,
    progress: 0,
    from: 0,
    to: duration,
    videoRef,
  });

  // setDoc(docRef.value, {
  //   content: videoRef.fullPath,
  //   type: props.type,
  // });
}

function getVideoDuration(file: File) {
  const video = document.createElement("video");
  video.preload = "metadata";

  video.src = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);

      resolve(video.duration);
    };

    video.onerror = (err) => {
      reject("Video format is not suported");
    };
  });
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

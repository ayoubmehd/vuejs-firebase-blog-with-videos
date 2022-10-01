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
import { db, storage } from "../firebase";

const store = useStore();

const { post } = store.state;

const props = defineProps<{
  type: string;
  modelValue: string | File | null;
}>();

const docRef = ref<DocumentReference<DocumentData>>();
const emit = defineEmits(["update:modelValue"]);

const content = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

async function getFile($event: any) {
  const file: File = $event.target.files[0];

  const videoRef = storageRef(
    storage,
    `videos/${uuid()}.${file.name.split(".").pop()}`
  );

  console.log("GET FILE");

  console.log(videoRef);

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
    label="Text content"
  />
  <FormKit v-else type="group">
    <FormKit
      type="file"
      @change="getFile"
      label="Video"
      accept="video/*"
      prefix-icon="fileVideo"
      :help="
        store.state.postId
          ? 'This video will be added to your existing post'
          : ''
      "
    />
  </FormKit>
</template>

<style scoped></style>

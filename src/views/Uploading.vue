<script setup lang="ts">
import { useStore } from "vuex";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Progress from "../components/Progress.vue";
import {
  uploadBytesResumable,
  ref as storageRef,
  getBytes,
} from "firebase/storage";
import { useRouter } from "vue-router";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { onMounted, onUnmounted, ref } from "vue";
import { title } from "process";
import { getVideoDuration } from "../files/getVideoDuration";

const router = useRouter();

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
});

const isDonwlodingFiles = ref(false);
const ffmpegLoaded = ref(false);

const store = useStore();

const { files, post } = store.state;

function secondsToHms(d: number) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  return `${h}:${m}:${s}`;
}

async function savePost() {
  const newOrUpdateing = await (async () => {
    if (!!store.state.postId) {
      return doc(db, "posts", store.state.postId);
    }

    return addDoc(collection(db, "posts"), {
      isPublished: false,
      title: store.state.post.title,
    });
  })();

  Promise.all(
    post.content.map((item: any) =>
      addDoc(collection(db, "posts", newOrUpdateing.id, "content"), item)
    )
  ).then(() => {
    router.push({
      path: "/",
    });
    store.commit("clear");
  });
}

async function publishPost() {
  const newOrUpdateing = await (async () => {
    if (!!store.state.postId) {
      const editing = doc(db, "posts", store.state.postId);

      await setDoc(editing, {
        ...store.state.post,
        title: store.state.post.title,
      });

      return editing;
    }

    return addDoc(collection(db, "posts"), {
      isPublished: true,
      title: store.state.post.title,
    });
  })();

  Promise.all(
    post.content.map((item: any) => {
      if (item.id) {
        const exists = doc(db, "posts", newOrUpdateing.id, "content", item.id);

        if (exists) {
          return setDoc(exists, item);
        }
      }

      addDoc(collection(db, "posts", newOrUpdateing.id, "content"), item);
    })
  ).then(() => {
    router.push({
      path: "/",
    });
    store.commit("clear");
  });
}

onMounted(() => {
  (async () => {
    isDonwlodingFiles.value = true;

    const filesToDownload = store.state.post.content
      .filter((item: any) => item.type === "video")
      .map((item: any) => item.content);

    Promise.all(
      filesToDownload.map(async (file: any) => {
        const fileRef = storageRef(storage, file);

        const fileBytes = await getBytes(fileRef);

        const duration = await getVideoDuration(fileBytes);

        store.commit("newFile", {
          file: fileBytes,
          duration,
          progress: 0,
          from: 0,
          to: duration,
          videoRef: fileRef,
          name: file.split("/").pop(),
        });
        return fileBytes;
      })
    ).then(() => {
      isDonwlodingFiles.value = false;
    });
  })();
});

onUnmounted(() => {
  store.commit("clear");
});

async function startUploading(file: any) {
  if (!ffmpegLoaded.value) {
    await ffmpeg.load();
    ffmpegLoaded.value = true;
  }

  ffmpeg.FS("writeFile", file.name, await fetchFile(file.file));

  const start = secondsToHms(file.from);
  const end = secondsToHms(file.to);

  const outputFile =
    file.name.split(".").slice(0, -1) + "-cuted." + file.name.split(".").pop();

  await ffmpeg.run(
    "-i",
    file.name,
    "-ss",
    start,
    "-to",
    end,
    "-c:v",
    "copy",
    "-c:a",
    "copy",
    outputFile
  );

  const data = ffmpeg.FS("readFile", outputFile);

  const uploadTask = uploadBytesResumable(file.videoRef, data);

  uploadTask.on("state_changed", (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    file.progress = progress;
  });
}
</script>
<template>
  <div class="w-full flex flex-wrap justify-center my-4">
    <template v-if="!!files.length">
      <div class="w-1/3" v-for="file in files">
        <label for="">Progress</label>
        <div class="w-full flex">
          <Progress :value="file.progress" />
        </div>

        <FormKit
          v-model="file.duration"
          label="Duration"
          readonly
          type="number"
        />
        <FormKit v-model="file.from" :min="0" label="From" type="number" />
        <FormKit
          v-model="file.to"
          :max="file.duration"
          label="To"
          type="number"
        />
        <pre wrap>{{ file.progress.toFixed(0) + "%" }}</pre>
        <FormKit type="button" label="Upload" @click="startUploading(file)" />
      </div>
    </template>
    <div class="w-full text-center mb-3" v-else>No files to upload</div>

    <div class="flex justify-center my-4 w-full">
      <div class="w-1/3 flex">
        <FormKit
          @click="savePost"
          wrapper-class="h-full mr-1"
          input-class="inline-block h-full px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          :classes="{
            input: {
              $reset: true,
            },
          }"
          type="button"
          label="Save"
        />
        <FormKit
          wrapper-class="ml-1"
          @click="publishPost"
          type="button"
          label="Publish"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

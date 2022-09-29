<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Progress from "../components/Progress.vue";
import { uploadBytesResumable } from "firebase/storage";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "/node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
});

const store = useStore();

const { files } = store.state;

function secondsToHms(d: number) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  return `${h}:${m}:${s}`;
}

async function startUploading(file: any) {
  await ffmpeg.load();

  ffmpeg.FS("writeFile", file.file.name, await fetchFile(file.file));

  const start = secondsToHms(file.from);
  const end = secondsToHms(file.to);

  const outputFile = file.file.name.split(".").slice(0, -1) + "-cuted.mp4";

  await ffmpeg.run(
    "-i",
    file.file.name,
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
  <div class="w-full flex justify-center my-4">
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
        <pre wrap>{{ file.progress + "%" }}</pre>
        <FormKit type="button" label="Upload" @click="startUploading(file)" />
      </div>
    </template>
  </div>
</template>

<style scoped></style>

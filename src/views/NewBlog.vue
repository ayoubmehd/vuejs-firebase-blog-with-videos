<script setup lang="ts">
import { addDoc, collection } from "firebase/firestore";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/index";
import BlogEditor from "../components/BlogEditor.vue";
import { v4 as uuid } from "uuid";

async function handleSubmit(content: any) {
  const post = await addDoc(collection(db, "posts"), {
    isPublished: false,
  });

  await Promise.all(
    content.map(async (item: any) => {
      if (item.type === "text") {
        return addDoc(collection(post, "content"), item);
      }

      return addDoc(collection(post, "content"), {
        ...item,
        content: null,
      });
    })
  );
}
</script>
<template>
  <div class="flex items-center justify-center h-screen overflow-auto">
    <BlogEditor @submit="handleSubmit"></BlogEditor>
  </div>
</template>

<style scoped></style>

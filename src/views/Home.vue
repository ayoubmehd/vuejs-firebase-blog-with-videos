<script setup lang="ts">
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { onMounted, ref } from "vue";
import BlogCard from "../components/BlogCard.vue";
import { db } from "../firebase";

const postsQuery = query(
  collection(db, "posts"),
  where("isPublished", "==", true)
  // limit(10)
);

const posts = ref<any>([]);

onMounted(() => {
  (async () => {
    const querySnapshot = await getDocs(postsQuery);

    posts.value = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const contentQuery = query(collection(db, "posts", doc.id, "content"));

        const content = await getDocs(contentQuery);

        return {
          id: doc.id,
          ...doc.data(),
          brief: content.docs
            .map((c) => c.data())
            .find((c) => c.type === "text")?.content,
        };
      })
    );
  })();
});
</script>
<template>
  <div class="container mx-auto px-4">
    <h1 class="text-center">Home</h1>
    <div class="flex">
      <div class="grid grid-cols-3 gap-3">
        <BlogCard v-for="post in posts" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

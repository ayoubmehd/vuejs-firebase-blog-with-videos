<script setup lang="ts">
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { db } from "../firebase";
import BlogVideo from "../components/BlogVideo.vue";

const route = useRoute();

const { id } = route.params;

const post = ref();

onMounted(() => {
  const docRef = doc(db, "posts", String(id));

  (async () => {
    const snapshot = await getDoc(docRef);

    const contentQuery = query(collection(db, "posts", snapshot.id, "content"));

    const content = await getDocs(contentQuery);

    post.value = {
      ...snapshot.data(),
      content: content.docs.map((c) => c.data()),
    };
  })();
});
</script>

<template>
  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <template v-if="post">
      <h1
        class="text-gray-800 text-2xl sm:text-3xl font-bold text-center mb-4 md:mb-6"
      >
        {{ post.title }}
      </h1>
      <div
        v-for="item in post.content"
        class="max-w-screen-md px-4 md:px-8 mx-auto"
      >
        <p
          v-if="item.type == 'text'"
          class="text-gray-500 sm:text-lg mb-6 md:mb-8"
        >
          {{ item.content }}
        </p>

        <BlogVideo v-else :path="item.content" />
      </div>
    </template>
  </div>
</template>

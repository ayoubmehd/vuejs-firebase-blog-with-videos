<script setup lang="ts">
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BlogCard from "../components/BlogCard.vue";
import { db } from "../firebase";

const store = useStore();
const router = useRouter();

const postsQuery = query(
  collection(db, "posts"),
  where("isPublished", "==", true)
  // limit(10)
);

const posts = ref<any>([]);

function remove(id: string) {
  deleteDoc(doc(db, "posts", id));
  loadPosts();
}
async function edit(id: string) {
  router.push({
    name: "blog-edit",
    params: { id },
  });
}

const loadPosts = async () => {
  const querySnapshot = await getDocs(postsQuery);

  posts.value = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const contentQuery = query(collection(db, "posts", doc.id, "content"));

      const content = await getDocs(contentQuery);

      return {
        id: doc.id,
        ...doc.data(),
        brief: content.docs.map((c) => c.data()).find((c) => c.type === "text")
          ?.content,
      };
    })
  );
};

onMounted(() => {
  loadPosts();
});
</script>
<template>
  <div class="container mx-auto px-4">
    <div class="flex">
      <div class="grid grid-cols-3 gap-3">
        <BlogCard
          v-for="post in posts"
          :post="post"
          @delete="remove(post.id)"
          @edit="edit(post.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

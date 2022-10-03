<script setup lang="ts">
import BlogEditor from "../components/BlogEditor.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "vue-router";

const store = useStore();

const router = useRouter();

onMounted(() => {
  (async () => {
    const data = await getDocs(
      query(
        collection(db, "posts"),
        where("isPublished", "==", false),
        limit(1)
      )
    );

    if (data.docs.at(0)?.data()) {
      const contentQuery = query(
        collection(db, "posts", String(data.docs.at(0)?.id), "content")
      );

      const content = (await getDocs(contentQuery)).docs.map((item) => ({
        ...item.data(),
        id: item.id,
      })) as any[];

      const post = {
        ...data.docs.at(0)?.data(),
        content,
      };

      store.commit("updatePost", post);

      router.push({
        path: "/new/upload",
      });
    }
  })();
});
</script>
<template>
  <div class="flex justify-center">
    <BlogEditor></BlogEditor>
  </div>
</template>

<style scoped></style>

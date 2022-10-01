<script setup lang="ts">
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BlogEditor from "../components/BlogEditor.vue";
import { db } from "../firebase";

const store = useStore();
const route = useRoute();

const { id } = route.params;

onMounted(() => {
  (async () => {
    store.commit("setPostId", { id });

    const data = (await getDoc(doc(db, "posts", String(id)))).data();

    store.commit("updatePost", data);

    const contentQuery = query(collection(db, "posts", String(id), "content"));

    const content = await getDocs(contentQuery);
    store.commit(
      "setPostContent",
      content.docs.map((item) => item.data())
    );
  })();
});
</script>
<template>
  <div class="flex justify-center">
    <BlogEditor></BlogEditor>
  </div>
</template>

<style scoped></style>

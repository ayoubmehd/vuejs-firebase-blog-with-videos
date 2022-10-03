<script setup lang="ts">
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BlogEditor from "../components/BlogEditor.vue";
import { db } from "../firebase";

const store = useStore();
const route = useRoute();

const { id } = route.params;

const isLoading = ref(false);

onMounted(() => {
  (async () => {
    isLoading.value = true;

    store.commit("setPostId", { id });

    const data = (await getDoc(doc(db, "posts", String(id)))).data();

    const contentQuery = query(collection(db, "posts", String(id), "content"));

    const content = (await getDocs(contentQuery)).docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    const post = {
      ...data,
      content,
    };
    store.commit("updatePost", post);

    isLoading.value = false;
  })();
});
</script>
<template>
  <div class="flex justify-center">
    <BlogEditor :disabled="isLoading"></BlogEditor>
  </div>
</template>

<style scoped></style>

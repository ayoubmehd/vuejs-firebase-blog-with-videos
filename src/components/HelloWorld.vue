<script setup lang="ts">
import { db } from "../firebase/index";
import { collection, getDocs } from "firebase/firestore";
import { ref, onMounted } from "vue";

defineProps<{ msg: string }>();

onMounted(() => {
  (async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc: any) => {
      console.log(doc.data());
    });
  })();
});

const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>

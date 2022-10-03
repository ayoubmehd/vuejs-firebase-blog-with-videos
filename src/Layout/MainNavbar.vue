<script setup lang="ts">
import { signOut } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";
import { auth } from "../firebase";

const route = useRoute();

const router = useRouter();

async function logout() {
  await signOut(auth);

  router.push({
    path: "/login",
  });
}
</script>

<template>
  <header class="text-gray-600 body-font">
    <div
      class="container mx-auto flex flex-wrap justify-center p-5 flex-col md:flex-row items-center"
    >
      <nav class="flex mx-auto flex-wrap items-center text-base">
        <router-link to="/" class="mr-5 hover:text-gray-900">
          Home
        </router-link>
        <router-link
          :to="{ path: '/new' }"
          class="inline-flex items-center text-gray-50 bg-purple-600 border-0 py-1 px-3 focus:outline-none hover:bg-purple-500 rounded text-base mt-4 md:mt-0"
        >
          New Post
        </router-link>
      </nav>

      <div>
        <button @click="logout" class="mr-5 hover:text-gray-900">Logout</button>
      </div>
    </div>
    <div class="flex justify-center">
      <h1 class="text-4xl mt-6 mb-8">
        {{ route.meta.title }}
      </h1>
    </div>
  </header>
</template>

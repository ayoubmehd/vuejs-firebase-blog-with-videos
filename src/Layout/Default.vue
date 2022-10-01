<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <header class="text-gray-600 body-font">
    <div
      class="container mx-auto flex flex-wrap justify-center p-5 flex-col md:flex-row items-center"
    >
      <nav class="flex flex-wrap items-center text-base">
        <router-link to="" class="mr-5 hover:text-gray-900">
          First Link
        </router-link>
        <router-link to="" class="mr-5 hover:text-gray-900">
          Second Link
        </router-link>
        <router-link to="" class="mr-5 hover:text-gray-900">
          Third Link
        </router-link>
        <router-link to="" class="mr-5 hover:text-gray-900">
          Fourth Link
        </router-link>
        <router-link
          :to="{ path: '/new' }"
          class="inline-flex items-center text-gray-50 bg-purple-600 border-0 py-1 px-3 focus:outline-none hover:bg-purple-500 rounded text-base mt-4 md:mt-0"
        >
          New Post
        </router-link>
      </nav>
    </div>
    <div class="flex justify-center">
      <h1 class="text-4xl mt-6 mb-8">
        {{ route.meta.title }}
      </h1>
    </div>
  </header>
  <div class="mb-6">
    <slot></slot>
  </div>
</template>

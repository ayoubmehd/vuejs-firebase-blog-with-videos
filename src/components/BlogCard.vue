<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["delete", "edit"]);
defineProps<{
  post: {
    id: string;
    title: string;
    author: string;
    brief: string;
    published_at: string;
  };
}>();
</script>
<template>
  <div
    class="h-full relative border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
  >
    <div class="absolute right-2 top-2">
      <button @click="emit('edit')" class="text-purple-500">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
          />
        </svg>
      </button>
      <button @click="emit('delete')" class="text-red-400">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
          />
        </svg>
      </button>
    </div>

    <div class="p-6">
      <h2 class="title-font text-lg font-medium text-gray-900 mb-3">
        {{ post.title }}
      </h2>
      <p class="leading-relaxed mb-3">
        {{ post.brief }}
      </p>
      <div class="flex items-center flex-wrap">
        <router-link
          :to="{ name: 'blog', params: { id: post.id } }"
          class="text-purple-700 inline-flex items-center md:mb-2 lg:mb-0"
          >Learn More<svg
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path></svg
        ></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

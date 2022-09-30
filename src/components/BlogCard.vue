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
  <router-link
    :to="{ name: 'blog', params: { id: post.id } }"
    class="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
  >
    <span
      class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>

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

    <div class="justify-between sm:flex">
      <div>
        <h5 class="text-xl font-bold text-gray-900">
          {{ post.title }}
        </h5>

        <p class="mt-1 text-xs font-medium text-gray-600">{{ post.author }}</p>
      </div>
    </div>

    <div class="mt-4 sm:pr-8">
      <p class="text-sm text-gray-500">
        {{ post.brief }}
      </p>
    </div>

    <dl class="flex mt-6">
      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600">Published</dt>
        <dd class="text-xs text-gray-500">{{ post.published_at }}</dd>
      </div>
    </dl>
  </router-link>
</template>

<style scoped></style>

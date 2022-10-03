<script setup lang="ts">
import { sendEmailVerification } from "firebase/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

onMounted(() => {
  if (store.state.user.emailVerified) {
    router.push({
      path: "/",
    });

    return;
  }

  sendEmailVerification(store.state.user);
});
</script>

<template>
  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <div class="max-w-xl flex flex-col items-center text-center mx-auto">
        <p class="text-gray-500 sm:text-lg mb-6 md:mb-8">
          Pease check your email {{ store.state.user?.email }}
        </p>
      </div>
    </div>
  </div>
</template>

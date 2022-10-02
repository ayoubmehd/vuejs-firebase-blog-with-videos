<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "../firebase";

const router = useRouter();

function handleSubmit({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  createUserWithEmailAndPassword(auth, email, password).then(() => {
    router.push({
      path: "/",
    });
  });
}
</script>

<template>
  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2
        class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8"
      >
        Login
      </h2>

      <FormKit
        form-class="max-w-lg border rounded-lg mx-auto"
        type="form"
        :actions="false"
        @submit="handleSubmit"
      >
        <div class="flex flex-col gap-4 p-4 md:p-8">
          <FormKit
            wrapper-class="max-w-full"
            type="email"
            name="email"
            label="email address"
            help="Please enter your email address."
            validation="required|email"
            placeholder="vikas@example.com"
          />
          <FormKit
            wrapper-class="max-w-full"
            type="password"
            name="password"
            label="Password"
            help="Enter a new password"
            validation="required"
          />
          <FormKit type="submit"> Register </FormKit>
        </div>

        <div class="flex justify-center items-center bg-gray-100 p-4">
          <p class="text-gray-500 text-sm text-center">
            Already have an account?
            <router-link
              :to="{ path: '/login' }"
              class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
              >Login</router-link
            >
          </p>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<style scoped></style>

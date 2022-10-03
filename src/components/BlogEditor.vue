<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BlogInput from "./BlogInput.vue";

const store = useStore();

const router = useRouter();

const post = ref<{ title: string; content: any[] }>({
  title: "",
  content: [],
});

function next() {
  store.commit("updatePost", post.value);

  router.push("/new/upload");
}

function newFile() {
  post.value.content.push({
    type: "video",
    content: null,
  });
}

function newText() {
  post.value.content.push({
    type: "text",
    content: null,
  });
}

onMounted(() => {
  store.watch(
    () => store.state.post,
    (value) => {
      post.value = value;
    }
  );
});
onUnmounted(() => {
  post.value = {
    title: "",
    content: [],
  };
});
</script>
<template>
  <FormKit
    form-class="w-1/2 flex flex-col items-center"
    type="form"
    id="registration-example"
    submit-label="Save"
    :actions="false"
  >
    <FormKit
      outer-class="w-full"
      wrapper-class="max-w-full"
      inner-class="w-full"
      input-class="w-full"
      label="Post title"
      placeholder="Put your post title"
      type="text"
      v-model="post.title"
    />

    <BlogInput
      outer-class="w-full"
      wrapper-class="max-w-full"
      inner-class="w-full"
      input-class="w-full h-48"
      v-for="item in post.content"
      :type="item.type"
      v-model="item.content"
    />
    <VDropdown :distance="6" placement="bottom">
      <FormKit
        outer-class="flex justify-center"
        prefix-icon="add"
        type="button"
        label="Add"
      />

      <!-- This will be the content of the popover -->
      <template #popper="{ hide }">
        <div class="w-60 p-3 flex justify-center items-center">
          <FormKit
            @click="
              newText();
              hide();
            "
            outer-class="mb-0"
            type="button"
            label="Text"
            name="new_text"
          />
          <FormKit
            @click="
              newFile();
              hide();
            "
            outer-class="mb-0"
            type="button"
            label="Video"
            name="new_file"
          />
        </div>
      </template>
    </VDropdown>
    <FormKit @click="next" type="button" label="Next" />
  </FormKit>
</template>

<style scoped></style>

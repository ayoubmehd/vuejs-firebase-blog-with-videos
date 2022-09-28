<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BlogInput from "./BlogInput.vue";

const emit = defineEmits(["submit"]);

const store = useStore();

const router = useRouter();

const content = store.state.postContent;

function newFile() {
  store.commit("newPostContent", {
    type: "video",
    content: null,
  });
}

function newText() {
  store.commit("newPostContent", {
    type: "text",
    content: null,
  });
}

function submitHandler() {
  emit("submit", content.value);
}
</script>
<template>
  <FormKit
    type="form"
    id="registration-example"
    form-class=""
    submit-label="Save"
    @submit="submitHandler"
    :actions="false"
  >
    <BlogInput
      v-for="item in content"
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
    <FormKit @click="router.push('/new/upload')" type="submit" label="Next" />
  </FormKit>
</template>

<style scoped></style>

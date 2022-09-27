<script setup lang="ts">
import { ref } from "vue";
import BlogInput from "./BlogInput.vue";

interface IBlogInput {
  type: string;
  content: any;
}

const emit = defineEmits(["submit"]);

const content = ref<IBlogInput[]>([]);

function newFile() {
  content.value.push({
    type: "video",
    content: null,
  });
}

function newText() {
  content.value.push({
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
    <FormKit type="submit" label="Next" />
  </FormKit>
</template>

<style scoped></style>

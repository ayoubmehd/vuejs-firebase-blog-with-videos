import { createStore } from "vuex";

export default createStore<{ post: any; postContent: any[]; files: File[] }>({
  state() {
    return {
      post: null,
      postContent: [],
      files: [],
    };
  },
  mutations: {
    updatePost(state, data) {
      state.post = data;
    },
    newPostContent(state, data) {
      state.postContent.push(data);
    },
    newFile(state, data) {
      state.files.push(data);
    },
  },

  getters: {
    videos(state) {
      return state.postContent
        .filter((item) => item.type === "video")
        .map((item) => item.content);
    },
  },
});

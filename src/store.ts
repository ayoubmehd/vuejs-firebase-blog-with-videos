import { createStore } from "vuex";

export default createStore<{
  post: { title: string };
  postContent: any[];
  files: File[];
  user: any;
}>({
  state() {
    return {
      post: {
        title: "",
      },
      postContent: [],
      files: [],
      user: null,
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
    setUser(state, { user }) {
      state.user = user;
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

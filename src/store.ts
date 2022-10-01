import { createStore } from "vuex";

export default createStore<{
  postId: string | null;
  post: { title: string };
  postContent: any[];
  files: File[];
  user: any;
}>({
  state() {
    return {
      postId: null, // if id is null then add a new post otherwise edit
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
    setPostContent(state, data) {
      state.postContent = data;
    },
    setPostId(state, { id }) {
      state.postId = id;
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
    clear(state) {
      state.files = [];
      state.postContent = [];
      state.post = { title: "" };
      state.postId = null;
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

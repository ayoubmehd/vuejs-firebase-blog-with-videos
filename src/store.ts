import { createStore } from "vuex";

export default createStore<{
  postId: string | null;
  post: { title: string; content: any[] };
  files: File[];
  user: any;
}>({
  state() {
    return {
      postId: null, // if id is null then add a new post otherwise edit
      post: {
        title: "",
        content: [],
      },
      files: [],
      user: null,
    };
  },
  mutations: {
    updatePost(state, data) {
      state.post = data;
    },
    setPostId(state, { id }) {
      state.postId = id;
    },
    newPostContent(state, data) {
      state.post.content.push(data);
    },
    newFile(state, data) {
      state.files.push(data);
    },
    setUser(state, { user }) {
      state.user = user;
    },
    clear(state) {
      state.files = [];
      state.post = { title: "", content: [] };
      state.postId = null;
    },
  },

  getters: {
    videos(state) {
      return state.post.content
        .filter((item) => item.type === "video")
        .map((item) => item.content);
    },
  },
});

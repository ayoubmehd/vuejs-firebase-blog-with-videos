import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import FloatingVue from "floating-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "floating-vue/dist/style.css";
import "@formkit/themes/genesis";
import "./style.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(plugin, defaultConfig);
app.use(FloatingVue);

app.mount("#app");

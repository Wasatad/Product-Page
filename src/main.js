import { createApp } from "vue";
import VueAgile from "vue-agile";

import store from "./store.js";

import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.use(VueAgile);
app.mount("#app");

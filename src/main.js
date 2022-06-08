import { createApp } from "vue";
import VueAgile from "vue-agile";
import router from "./router.js";
import store from "./store.js";
import VueCreditCardValidation from "vue-credit-card-validation";
import vueCountryRegionSelect from "vue3-country-region-select";

import App from "./App.vue";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(VueAgile)
  .use(VueCreditCardValidation)
  .use(vueCountryRegionSelect);
app.mount("#app");

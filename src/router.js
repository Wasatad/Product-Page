import { createRouter, createWebHistory } from "vue-router";
import CartBody from "./components/CartBody.vue";
import CheckoutPage from "./components/CheckoutPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: CartBody,
  },

  {
    path: "/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

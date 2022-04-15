import { createStore } from "vuex";
export default createStore({
  state() {
    return {
      products: [
        {
          id: 1,
          brand: "Sneaker Company",
          name: "Fall Limited Edition Sneakers",
          description:
            "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
          images: [
            "image-product-1.jpg",
            "image-product-2.jpg",
            "image-product-3.jpg",
            "image-product-4.jpg",
          ],
          price: "$125.00",
          oldPrice: "$250.00",
        },
      ],
      counterAmount: 1,
      cart: [],
      cartVisibility: false,
    };
  },
  getters: {
    productImages: (state) => (id) => {
      let product = state.products.find((product) => product.id == id);

      return product.images;
    },
    totalAmount(state) {
      if (state.cart.length == 0 || state.cart[0].amount == undefined) {
        return 0;
      } else {
        let totalAmount = 0;
        for (let product of state.cart) {
          totalAmount += product.amount;
        }
        return totalAmount;
      }
    },
    findProduct: (state) => (id) => {
      return state.products.find((product) => product.id == id);
    },
  },
  mutations: {
    addProduct(state) {
      state.counterAmount += 1;
    },
    deleteProduct(state) {
      if (state.counterAmount > 1) state.counterAmount -= 1;
    },
    setAmount(state, payload) {
      state.counterAmount = payload;
    },
    addToCart(state, payload) {
      let item = state.products.find((product) => product.id == payload);
      if (state.cart.findIndex((product) => product.id == payload) == -1) {
        state.cart.push(item);
        state.cart.find((product) => product == item).amount =
          1 * state.counterAmount;
        state.counterAmount = 1;
      } else {
        state.cart.find((product) => product.id == payload).amount +=
          1 * state.counterAmount;
        state.counterAmount = 1;
      }
    },
    deleteFromCart(state, payload) {
      let index = state.cart.findIndex((item) => item.id == payload);
      state.cart.splice(index, 1);
    },
    toggleCartVisibility(state) {
      state.cartVisibility = !state.cartVisibility;
    },
    closeCart(state) {
      state.cartVisibility = false;
    },
    openCart(state) {
      state.cartVisibility = true;
    },
  },
  actions: {
    addProduct(context) {
      context.commit("addProduct");
    },
    deleteProduct(context) {
      context.commit("deleteProduct");
    },
    setAmount(context, payload) {
      context.commit("setAmount", payload);
    },
    addToCart(context, payload) {
      context.commit("addToCart", payload);
    },
    deleteFromCart(context, payload) {
      context.commit("deleteFromCart", payload);
    },
    toggleCartVisibility(context) {
      context.commit("toggleCartVisibility");
    },
    async productImages(context, id) {
      let promise = await context.state.products.find(
        (product) => product.id == id
      );

      let product = await promise;

      return product.images;
    },
  },
});

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
            "https://i.ibb.co/zbqPTDB/woman-image-product-4.jpg",
            "https://i.ibb.co/NnRTGBQ/woman-image-product-3.jpg",
            "https://i.ibb.co/TwCZCLg/woman-image-product-2.jpg",
            "https://i.ibb.co/qx7Rd8x/woman-image-product-1.jpg",
          ],
          price: "$125.00",
          oldPrice: "$250.00",
        },
      ],
      counterAmount: 1,
      cart: [],
      cartVisibility: false,
      creditModalOpen: false,
      congratsModalOpen: false,
      savedCards: [],
      client: [],
      total: 0,
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
    noCards(state) {
      if (state.savedCards.length == 0) {
        return true;
      }
      return false;
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteFromCart(state, payload) {
      let index = state.cart.findIndex((item) => item.id == payload);
      state.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
    addCard(state, payload) {
      state.savedCards.push(payload);
      localStorage.setItem("savedCards", JSON.stringify(state.savedCards));
    },
    deleteCard(state, payload) {
      state.savedCards = state.savedCards.filter((card) => {
        return card.number != payload;
      });
      localStorage.setItem("savedCards", JSON.stringify(state.savedCards));
    },
    addClient(state, payload) {
      state.client.push(payload);
      localStorage.setItem("client", JSON.stringify(state.client));
    },
    setTotal(state, payload) {
      state.total = payload;
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    toggleCreditModal(state) {
      state.creditModalOpen = !state.creditModalOpen;
    },
    toggleCongratsModal(state) {
      state.congratsModalOpen = !state.congratsModalOpen;
    },
  },
  actions: {
    initialiseStore(context) {
      if (localStorage.getItem("cart")) {
        context.state.cart = JSON.parse(localStorage.getItem("cart"));
      }
      if (localStorage.getItem("savedCards")) {
        context.state.savedCards = JSON.parse(
          localStorage.getItem("savedCards")
        );
      }
      if (localStorage.getItem("client")) {
        context.state.client = JSON.parse(localStorage.getItem("client"));
      }
      if (localStorage.getItem("total")) {
        context.state.total = JSON.parse(localStorage.getItem("total"));
      }
    },
  },
});

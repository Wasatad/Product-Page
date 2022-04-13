<template>
  <div
    v-if="isCartOpened"
    @click="closeCartWindow"
    class="backdrop-transparent"
  ></div>
  <div @click.stop class="container">
    <section class="header">
      <div class="logo-container">
        <img
          @click="openMenu"
          class="burger"
          src="../assets/icon-menu.svg"
          alt=""
        />
        <img src="../assets/logo.svg" alt="logo" />
      </div>
      <div class="menu">
        <span>Collections</span><span>Men</span><span>Woman</span
        ><span>About</span><span>Contact</span>
      </div>
      <div class="profile">
        <div class="cart-container">
          <svg
            @click="toggleCartVisibility"
            class="cart-icon"
            width="22"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#69707D"
              fill-rule="nonzero"
            />
          </svg>

          <div v-if="!isEmpty" class="amount-bage">{{ amount }}</div>
        </div>
        <div class="img-container">
          <img class="avatar" src="../assets/image-avatar.png" alt="avatar" />
          <product-cart v-if="isCartOpened"></product-cart>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCart from "./ProductCart.vue";

export default {
  components: {
    ProductCart,
  },
  emits: ["openMenu"],
  data() {
    return {};
  },
  methods: {
    openMenu() {
      this.$emit("openMenu");
    },
    toggleCartVisibility() {
      this.$store.dispatch("toggleCartVisibility");
    },
    closeCartWindow() {
      this.$store.commit("closeCart");
    },
  },
  computed: {
    amount() {
      return this.$store.getters.totalAmount;
    },
    isEmpty() {
      if (this.$store.state.cart.length == 0) {
        return true;
      }
      return false;
    },
    isCartOpened() {
      return this.$store.state.cartVisibility;
    },
  },
};
</script>

<style lang="scss">
.header {
  height: 110px;
  width: 100%;
  border-bottom: 1px solid #e8e8ea;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu {
    display: flex;
    margin-right: auto;
    gap: 30px;
    align-items: center;
    margin-left: 55px;
    color: $darkGrayishBlue;

    span:after {
      content: "";
      transition: all 0.5s;
    }

    span:hover {
      color: $veryDarkBlue;
      display: block;
      height: 100%;
      position: relative;

      cursor: pointer;

      &:after {
        position: absolute;
        height: 4px;
        bottom: -43px;
        left: 0;
        right: 0;
        background-color: $orange;
      }
    }
    @media (max-width: 750px) {
      display: none;
    }
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 45px;

    .cart-icon {
      &:hover {
        path {
          fill: $veryDarkBlue;
        }
      }
      cursor: pointer;
    }

    .img-container {
      position: relative;
      @media (max-width: 470px) {
        position: static;
      }
    }

    .avatar {
      width: 50px;
      border-radius: 100%;
      transition: all 0.5s;
      &:hover {
        box-shadow: 0px 0px 0px 2px $orange;
      }
    }

    .cart-container {
      position: relative;

      .amount-bage {
        width: auto;
        padding: 0 8px;
        height: 16px;
        background-color: $orange;
        position: absolute;
        top: -8px;
        right: -8px;
        border-radius: 16px;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .logo-container {
    display: flex;
    gap: 16px;
    .burger {
      @media (min-width: 750px) {
        display: none;
      }
    }
  }
}

.backdrop-transparent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
}
</style>

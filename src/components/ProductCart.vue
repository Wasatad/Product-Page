<template>
  <div class="wrapper">
    <div class="header">Cart</div>
    <div class="body">
      <span v-if="isEmpty" class="empty">Your cart is empty.</span>
      <div v-for="item in cart" :key="item.id" class="item">
        <img :src="item.images[0]" alt="" />
        <div class="description">
          <div class="name">{{ item.name }}</div>
          <div class="price-and-amount">
            <span class="price">{{ item.price }}</span
            >&nbsp;x&nbsp;<span class="amount">{{ item.amount }}</span
            ><span class="full-price"
              >${{
                `${item.price.split(".")[0].split("$")[1] * totalAmount}`
              }}.00</span
            >
          </div>
        </div>

        <svg
          @click="deleteItem(item.id)"
          class="delete-icon"
          width="14"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
              id="a"
            />
          </defs>
          <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
        </svg>
      </div>
      <router-link
        @click="closeCart"
        :to="{
          name: 'CheckoutPage',
        }"
        v-if="!isEmpty"
        class="checkout"
        >Checkout</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["totalAmount"]),
    isEmpty() {
      if (this.cart.length == 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapMutations(["deleteFromCart", "closeCart"]),
    deleteItem(id) {
      if (this.$route.name == "CheckoutPage") {
        this.$router.push("/");
        setTimeout(() => this.deleteFromCart(id), 200);
      } else {
        this.deleteFromCart(id);
      }
    },
  },
  mounted() {
    this.closeCart;
  },
  beforeCreate() {
    this.$store.dispatch("initialiseStore");
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 360px;
  background: #ffffff;
  box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  position: absolute;
  top: 64px;
  left: 0;
  transform: translateX(-50%);
  z-index: 30;

  @media (max-width: 1380px) {
    transform: translateX(-90%);
  }

  @media (max-width: 470px) {
    left: 0;
    right: 0;
    transform: none;
    margin: 79px auto;
  }

  .header {
    height: 70px;
    border-bottom: 1px solid #e8e8ea;
    padding: 26px 23px;

    color: $veryDarkBlue;
    font-weight: 700;
  }

  .body {
    padding: 24px 24px 32px 24px;
    .empty {
      display: block;
      font-weight: 700;
      color: $darkGrayishBlue;
      margin-top: 50px;
      padding-bottom: 60px;
      text-align: center;
    }
  }

  .item {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 2px;
    }

    .description {
      font-weight: 400;
      color: $darkGrayishBlue;
    }

    .price-and-amount {
      display: flex;

      .full-price {
        margin-left: 12px;
        font-weight: 700;
        color: $veryDarkBlue;
      }
    }

    .delete-icon {
      cursor: pointer;
      &:hover path {
        fill: $alarm;
      }
    }
  }

  .checkout {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 56px;
    width: 100%;
    background-color: $orange;
    color: #ffffff;
    font-weight: 700;
    border-radius: 9px;
    box-shadow: 0 0 0 0 rgba(255, 126, 27, 0.2);
    animation: pulse 1.5s infinite;
    cursor: pointer;
    &:hover {
      background-color: $orangehover;
      animation: none;
    }
    @keyframes pulse {
      0% {
        transform: scale(0.95);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 50px rgba(255, 126, 27, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 126, 27, 0);
      }
    }
  }
}
</style>

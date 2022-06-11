<template>
  <div class="details">
    <div class="subtitle">{{ item.brand }}</div>
    <div class="title">{{ item.name }}</div>
    <div class="description">
      {{ item.description }}
    </div>
    <div class="info">
      <div class="price-block">
        <span class="price">{{ item.price }}</span
        ><span class="sale">{{ sale }}%</span>
      </div>
      <div class="old-price">{{ item.oldPrice }}</div>
    </div>

    <div class="actions">
      <div class="counter">
        <div
          @click="deleteProduct"
          :class="[{ notActive: counterAmount == 1 }, 'minus', 'icon-counter']"
        >
          <svg
            :class="{ notActive: counterAmount == 1 }"
            width="12"
            height="3"
            viewBox="0 0 12 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.357 3C11.4414 3.00023 11.5251 2.98545 11.6031 2.9565C11.6812 2.92754 11.7522 2.88499 11.8119 2.83128C11.8716 2.77757 11.919 2.71376 11.9513 2.64352C11.9836 2.57328 12.0001 2.49798 12 2.42197V0.578933C12.0003 0.50284 11.9838 0.427452 11.9516 0.357105C11.9194 0.286759 11.872 0.222843 11.8123 0.169037C11.7525 0.115231 11.6815 0.0725967 11.6034 0.0435869C11.5252 0.0145772 11.4415 -0.000234974 11.357 2.81829e-06H0.643003C0.558489 -0.000234974 0.474757 0.0145772 0.396625 0.0435869C0.318494 0.0725967 0.247505 0.115231 0.187744 0.169037C0.127984 0.222843 0.0806308 0.286759 0.0484106 0.357105C0.0161904 0.427452 -0.000260978 0.50284 3.13018e-06 0.578933V2.42107C3.13018e-06 2.74249 0.287003 3 0.643003 3H11.357V3Z"
              fill="#FF7E1B"
            />
          </svg>
        </div>
        <span
          @blur="validity"
          @keydown="enteredAmount"
          class="amount"
          contenteditable="true"
          >{{ counterAmount }}</span
        >
        <div @click="addProduct" class="plus icon-counter">
          <svg
            width="12"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path
                d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                id="b"
              />
            </defs>
            <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b" />
          </svg>
        </div>
      </div>
      <button @click="addProductToCart" class="add-to-cart">
        <img src="../assets/icon-cart-btn.svg" alt="" />
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["counterAmount"]),
    ...mapGetters(["findProduct"]),
    item() {
      return this.findProduct(1);
    },
    sale() {
      return (
        (parseFloat(this.item.price.split("$")[1]) * 100) /
        parseFloat(this.item.oldPrice.split("$")[1])
      );
    },
  },
  methods: {
    ...mapMutations(["addProduct", "deleteProduct", "openCart", "addToCart"]),
    enteredAmount(event) {
      if (
        !event.key.match(/^[0-9]/g) &&
        event.keyCode !== 8 &&
        event.keyCode !== 37 &&
        event.keyCode !== 39
      )
        event.preventDefault();
    },

    validity(event) {
      if (event.target.innerText.length < 1) {
        event.target.innerText = this.counterAmount;
      } else if (
        event.target.innerText[0] == "0" &&
        event.target.innerText.length > 1
      ) {
        let newValue = "";
        newValue = event.target.innerText.split("").slice(1).join("");
        this.$store.dispatch("setAmount", +newValue);
        event.target.innerText = this.counterAmount;
      } else if (
        event.target.innerText == "0" &&
        event.target.innerText.length < 2
      ) {
        this.$store.dispatch("setAmount", 1);
        event.target.innerText = this.counterAmount;
      } else {
        this.$store.dispatch("setAmount", +event.target.innerText);
        event.target.innerText = this.counterAmount;
      }
    },

    addProductToCart() {
      this.openCart();
      this.addToCart(1);
    },
  },
};
</script>

<style scoped lang="scss">
.details {
  max-width: 444px;
  @media (max-width: 800px) {
    max-width: 600px;
  }
}
.subtitle {
  font-weight: 700;
  color: $orange;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

.title {
  font-weight: 700;
  color: $veryDarkBlue;
  font-size: 44px;
  line-height: 106%;
  margin-bottom: 36px;
}

.description {
  font-weight: 40;
  color: $darkGrayishBlue;
  line-height: 160%;
  margin-bottom: 26px;
}

.price-block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;
}

.price {
  font-weight: 700;
  color: $veryDarkBlue;
  line-height: 106%;
  font-size: 30px;
}

.sale {
  display: inline-block;
  padding: 5px 10px;
  margin-left: 20px;
  font-weight: 700;
  background-color: $paleOrange;
  color: $orange;
  border-radius: 4px;
}

.old-price {
  font-weight: 700;
  font-size: 17px;
  text-decoration-line: line-through;
  color: $grayishBlue;
  margin-bottom: 36px;
  @media (max-width: 450px) {
    margin-bottom: 0px;
  }
}

.info {
  @media (max-width: 450px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  max-width: 500px;
  @media (max-width: 1030px) {
    flex-direction: column;
  }
}

.counter {
  height: 56px;
  min-width: 156px;
  width: 156px;
  @media (max-width: 1030px) {
    width: 100%;
  }
  background-color: $lightGrayish;
  border-radius: 9px;
  color: $veryDarkBlue;
  font-weight: 700;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon-counter {
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-counter.notActive {
    cursor: default;
  }

  svg.notActive {
    cursor: default;
    & path {
      fill: $orangehover;
    }
  }

  svg:hover path {
    fill: $orangehover;
  }

  .amount {
    outline: none;
  }
}

.add-to-cart {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: $orange;
  border-radius: 9px;
  color: #fff;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: $orangehover;
  }

  &:after {
    content: "";
    position: absolute;
    top: 30px;
    left: auto;
    opacity: 0.74;
    z-index: -1;
    height: 27px;
    width: 80%;

    background-color: $orange;
    filter: blur(24px);
    transition: all 0.2s;
  }
}
</style>

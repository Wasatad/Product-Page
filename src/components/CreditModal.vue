<template>
  <div @click.self="closeModal" class="modal-wrapper">
    <transition name="credit-modal">
      <div v-if="animationIsReady" class="modal">
        <div class="modal-header">
          Card Details
          <img @click="closeModal" src="../assets/big-close.svg" alt="" />
        </div>
        <div class="modal-body">
          <div class="modal-info">
            <div class="checkout-input">
              <label for="number">Card Number:</label>
              <input
                @input="showError"
                @blur="checkLength"
                v-cardformat:formatCardNumber
                type="tel"
                id="number"
                v-model="card.number"
                class="checkout-input"
                placeholder="5130 3444 1112 22245"
                required
              />
            </div>
            <div class="expiration-and-cvc">
              <div class="checkout-input expiration">
                <label for="exp">Card Expiration:</label>
                <input
                  id="exp"
                  v-cardformat:formatCardExpiry
                  v-model="card.expiration"
                  class="checkout-input"
                  placeholder="04 / 4422"
                  required
                />
              </div>
              <div class="checkout-input cvc">
                <label for="cvc">CVC:</label>
                <input
                  id="cvc"
                  v-cardformat:formatCardCVC
                  v-model="card.cvc"
                  class="checkout-input"
                  placeholder="5622"
                  required
                />
              </div>
            </div>
            <div @click="saveCard" class="save-btn">Save</div>
          </div>
          <div class="card-constructor">
            <div class="card-design">
              <div v-if="cardBrand != 'unknown'" class="logo">
                <img
                  :src="require('../assets/' + brandImage + '.svg')"
                  alt=""
                />
              </div>
              <div class="number">{{ card.number }}</div>

              <div class="expire">
                EXPIRE
                <div class="date">{{ card.expiration }}</div>
              </div>
              <div class="cvv">
                CVV
                <div class="code">{{ card.cvc }}</div>
              </div>
              <img :src="require('../assets/' + cardBG + '.svg')" alt="" />
            </div>
            <div @click="changeDesign" class="change-design">
              <img src="../assets/refresh.svg" alt="" />
              <span>Change design</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      //Card Data
      card: {
        number: "",
        expiration: "",
        cvc: "",
        brand: "mastercard",
        design: "",
      },
      cardBrand: null,
      cardDesign: ["creditCart_1", "creditCart_2", "creditCart_3"],
      designNumber: 0,

      animationIsReady: false,
    };
  },
  methods: {
    ...mapMutations(["addCard", "toggleCreditModal"]),
    showError(e) {
      if (e.target.value.length > 3) {
        if (this.cardBrand == null || this.cardBrand == "unknown") {
          e.target.style.border = "1px solid red";
          if (!document.querySelector(".error")) {
            let error = document.createElement("div");
            error.innerText = "Invalid Card Number";
            error.classList.add("error");
            e.target.parentNode.append(error);
          }
        } else {
          e.target.style.border = "1px solid #f0f0f0";
          if (document.querySelector(".error")) {
            document.querySelector(".error").remove();
          }
        }
      } else {
        e.target.style.border = "1px solid #f0f0f0";
        if (document.querySelector(".error")) {
          document.querySelector(".error").remove();
        }
      }
    },
    checkLength(e) {
      if (e.target.value.length < 19 && !document.querySelector(".error")) {
        let error = document.createElement("div");
        error.innerText = "Card Number too short";
        error.classList.add("error");
        e.target.parentNode.append(error);
        e.target.style.border = "1px solid red";
      }
    },
    changeDesign() {
      if (this.designNumber == 2) {
        this.designNumber = 0;
      } else {
        this.designNumber++;
      }
    },
    saveCard() {
      this.card.design = this.cardDesign[this.designNumber];
      this.addCard(this.card);
      this.closeModal();
    },
    closeModal() {
      this.animationIsReady = false;
      setTimeout(() => {
        this.toggleCreditModal();
      }, 600);
    },
  },
  computed: {
    brandImage() {
      if (this.cardBrand != null && this.cardBrand != "unknown") {
        return this.cardBrand;
      } else {
        return "placeholder";
      }
    },
    cardBG() {
      return this.cardDesign[this.designNumber];
    },
  },
  mounted() {
    this.animationIsReady = true;
    document.body.classList.add("modal-open");
  },
  unmounted() {
    document.body.classList.remove("modal-open");
  },
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 15px;

  .modal {
    max-width: 580px;
    border-radius: 15px;
    overflow: hidden;
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 27px 55px;
      background-color: rgba(249, 249, 249, 1);

      font-weight: 700;
      font-size: 24px;
      color: $veryDarkBlue;
      @media (max-width: 650px) {
        padding: 18px 24px;
      }
    }
  }
  .modal-body {
    display: flex;
    align-items: center;
    gap: 30px;
    background-color: #fff;
    padding: 27px 55px;
    @media (max-width: 650px) {
      flex-direction: column-reverse;
      padding: 27px 16px;
    }
    .modal-info {
      width: 50%;
      @media (max-width: 650px) {
        width: 100%;
      }
      .checkout-input {
        margin-bottom: 8px;
        label {
          display: block;
          font-weight: 500;
          font-size: 14px;
          color: #a0a1aa;
          margin-bottom: 6px;
        }
        input {
          width: 100%;
          max-width: 200px;
          padding: 15px;
          border: 1px solid #f0f0f0;
          border-radius: 7px;
          font-weight: 400;
          font-size: 16px;
          color: $veryDarkBlue;
          @media (max-width: 650px) {
            max-width: 1000px;
          }
        }
        ::placeholder {
          color: rgb(183, 183, 183);
          font-size: 16px;
        }
      }
      .expiration-and-cvc {
        max-width: 200px;
        display: flex;
        gap: 24px;
        @media (max-width: 650px) {
          max-width: 400px;
        }
        .expiration {
          width: 60%;
        }
        .cvc {
          width: 40%;
        }
      }
      .save-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        height: 47px;
        width: 100%;
        background-color: rgba(100, 189, 86, 1);
        color: #ffffff;
        font-weight: 700;
        border-radius: 9px;
        cursor: pointer;
        &:hover {
          background-color: rgba(92, 177, 79, 1);
        }
      }
      .error {
        color: red;
        font-size: 14px;
        margin-bottom: 16px;
      }
    }
    .card-constructor {
      .card-design {
        min-width: 233px;
        min-height: 134px;
        position: relative;
        .logo {
          position: absolute;
          top: 14px;
          right: 18px;
        }
        .number {
          position: absolute;
          top: 54px;
          left: 17px;

          font-family: "Audiowide";
          color: #fff;
          font-size: 15px;
          text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.31);
        }
        .expire {
          position: absolute;
          bottom: 21px;
          left: 17px;

          font-family: "Kumbh Sans";
          font-style: normal;
          font-weight: 700;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);

          text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.31);
          .date {
            font-family: "Audiowide";
            color: #ffffff;
            font-size: 11px;
            height: 16px;

            text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.31);
          }
        }
        .cvv {
          position: absolute;
          bottom: 21px;
          left: 93px;

          font-family: "Kumbh Sans";
          font-style: normal;
          font-weight: 700;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.31);
          .code {
            font-family: "Audiowide";
            color: #ffffff;
            font-size: 11px;
            height: 16px;

            text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.31);
          }
        }
      }
      .change-design {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-top: 14px;
        cursor: pointer;

        span {
          font-weight: 400;
          font-size: 12px;
          color: #a0a1aa;
        }
      }
    }
  }
}

// Form transition
.credit-modal-enter-active,
.credit-modal-leave-active {
  transition: 0.6s ease all;
}

.credit-modal-enter-from,
.credit-modal-leave-to {
  transform: translateY(1500px);
}
</style>

<template>
  <div @click.self="closeModal" class="modal-wrapper">
    <transition name="congrats-modal">
      <div v-if="animationIsReady" class="modal">
        <div class="modal-header">Thank You!</div>
        <div class="modal-body">
          <div class="summary-title">Order Summary</div>
          <div class="summary-table">
            <table>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <tr>
                <td>Fall Limited Edition Sneakers</td>
                <td data-th="Qty">{{ cart[0].amount }}</td>
                <td data-th="Price">{{ cart[0].price }}</td>
                <td data-th="Total">${{ total }}.00</td>
              </tr>
            </table>
          </div>
          <div class="client-info">
            <div class="left-block">
              <div class="to">To:</div>
              <div v-if="client[0].name">{{ client[0].name }}</div>
              <div v-if="client[0].tel">{{ client[0].tel }}</div>
              <div v-if="client[0].businessName">
                {{ client[0].businessName }}
              </div>
              <div v-if="client[0].vat">{{ client[0].vat }}</div>
              <div>{{ client[0].country }}</div>
            </div>
            <div class="right-block">
              <div>{{ client[0].city }}</div>
              <div>{{ client[0].adress }}</div>
              <div>{{ client[0].zip }}</div>
            </div>
          </div>
        </div>
        <router-link @click="closeModal" class="back-btn" :to="{ name: 'Home' }"
          >Go Back</router-link
        >
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      animationIsReady: false,
    };
  },
  methods: {
    ...mapMutations(["toggleCongratsModal"]),
    closeModal() {
      this.animationIsReady = false;
      setTimeout(() => this.toggleCongratsModal(), 400);
    },
  },
  computed: {
    ...mapState(["client", "total", "cart"]),
  },
  mounted() {
    setTimeout(() => (this.animationIsReady = true), 600);
  },
  unmounted() {},
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
    max-width: 745px;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 70px 0 40px;
      background: url("../assets/congrats-header.png");

      font-weight: 700;
      font-size: 32px;
      color: #fff;
      @media (max-width: 650px) {
        // padding: 18px 24px;
      }
    }
  }
  .modal-body {
    // display: flex;
    // align-items: center;
    // gap: 30px;
    background-color: #fff;
    padding: 27px 55px;

    @media (max-width: 650px) {
      padding: 27px 16px;
    }
    .summary-title {
      font-weight: 700;
      font-size: 20px;
      color: #1d2025;
      margin-bottom: 22px;
    }
    table {
      text-align: left;
      width: 100%;
      background-color: #fbfbfb;
      padding: 24px 30px;
      color: $veryDarkBlue;
      border-radius: 13px;
      margin-bottom: 25px;
      @media (max-width: 600px) {
        th:not(:first-child) {
          display: none;
        }
        th:nth-child(1) {
          width: 100% !important;
        }
        td,
        th {
          display: block;
        }
        td[data-th]:before {
          content: attr(data-th);
          margin-right: 20px;
        }
      }

      th {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 18px;
        font-weight: 400;
        font-size: 16px;
      }
      td {
        padding-top: 22px;
      }
      td:nth-child(4) {
        font-weight: 700;
      }

      th:nth-child(1) {
        width: 50%;
      }
      th:nth-child(2) {
        width: 10%;
      }
      th:nth-child(3) {
        width: 20%;
      }
      th:nth-child(4) {
        width: 10%;
      }
    }
    .client-info {
      display: flex;
      align-items: flex-end;
      gap: 45px;
      font-weight: 500;
      font-size: 16px;
      color: #a0a1aa;
      line-height: 2;
      margin-bottom: 32px;
      .to {
        font-weight: 700;
        font-size: 16px;
        color: $veryDarkBlue;
      }
    }
  }
  .back-btn {
    padding: 24px 0;
    background-color: $orange;
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: $orangehover;
    }
  }
}

// Form transition
.congrats-modal-enter-active,
.congrats-modal-leave-active {
  transition: 0.6s ease all;
}

.congrats-modal-enter-from,
.congrats-modal-leave-to {
  transform: translateY(1500px);
}
</style>

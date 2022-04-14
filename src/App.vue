<template>
  <slider-modal
    @closeModal="closeModalSlider"
    :modalIsActive="modalIsActive"
  ></slider-modal>
  <mobile-menu :is-open="isMenuOpen" @close="close"></mobile-menu>

  <page-header @openMenu="open"></page-header>
  <cart-body @openModalSlider="openModalSlider"></cart-body>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";
import MobileMenu from "./components/MobileMenu.vue";
import SliderModal from "./components/SliderModal.vue";
import CartBody from "./components/CartBody.vue";

export default {
  name: "App",
  components: {
    PageHeader,
    MobileMenu,
    SliderModal,
    CartBody,
  },
  data() {
    return {
      isMenuOpen: false,
      modalIsActive: false,
    };
  },
  methods: {
    close() {
      this.isMenuOpen = false;
    },
    open() {
      this.isMenuOpen = true;
    },
    closeModalSlider() {
      this.modalIsActive = false;
    },
    openModalSlider() {
      this.modalIsActive = true;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
}

ul[class],
ol[class] {
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

body {
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: "Kumbh Sans", sans-serif;
  margin-bottom: 32px;
}

.container {
  max-width: 1140px;
  padding: 0 15px;
  width: 100%;
  margin: 0 auto;
}

ul[class],
ol[class] {
  list-style: none;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

img {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
  outline: none;
  border: none;
}
</style>

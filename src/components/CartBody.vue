<template>
  <div class="container">
    <div class="cart-wrapper">
      <img-slider @openModalSlider="openModalSlider"></img-slider>
      <item-description></item-description>
    </div>
  </div>
</template>

<script>
import ImgSlider from "./ImgSlider.vue";
import ItemDescription from "./ItemDescription.vue";
export default {
  components: { ImgSlider, ItemDescription },
  data() {
    return {
      modalIsActive: false,
    };
  },
  methods: {
    openModalSlider() {
      this.$emit("openModalSlider");
    },
  },
  beforeCreate() {
    this.$store.dispatch("initialiseStore");
  },
};
</script>

<style scoped lang="scss">
.cart-wrapper {
  margin-top: 90px;
  display: flex;
  justify-content: flex-start;
  margin-left: 46px;
  gap: 124px;
  width: 100%;
  @media (max-width: 1200px) {
    gap: 30px;
    margin-left: 0;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    margin-top: 24px;
  }
}
</style>

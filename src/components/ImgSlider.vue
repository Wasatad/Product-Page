<template>
  <div ref="wrapper" class="slider-wrapper">
    <div @click="swiper.slidePrev()" class="swiper-button-prev">
      <svg
        width="15"
        height="18"
        viewBox="0 0 15 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3_348)">
          <path d="M11 1L3 9L11 17" stroke="#1D2026" stroke-width="3" />
        </g>
        <defs>
          <clipPath id="clip0_3_348">
            <rect width="15" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>

    <div @click="swiper.slideNext()" class="swiper-button-next">
      <svg
        width="15"
        height="18"
        viewBox="0 0 15 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3_350)">
          <path d="M4 1L12 9L4 17" stroke="#1D2026" stroke-width="3" />
        </g>
        <defs>
          <clipPath id="clip0_3_350">
            <rect
              width="15"
              height="18"
              fill="white"
              transform="matrix(-1 0 0 1 15 0)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>

    <swiper
      @click="openModalSlider"
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :loop="true"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="main"
    >
      <swiper-slide v-for="(slide, id) in slides" :key="id"
        ><img :src="slide"
      /></swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :loop="false"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="thumbnails"
    >
      <swiper-slide v-for="(slide, id) in slides" :key="id"
        ><img :src="slide"
      /></swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { mapState } from "vuex";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      thumbsSwiper: null,

      swiper: null,
      slides: [],
      modules: [FreeMode, Navigation, Thumbs],
    };
  },

  computed: {
    ...mapState(["products"]),
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    openModalSlider() {
      this.$emit("openModalSlider");
    },
  },

  async mounted() {
    let swiper = document.querySelector(".swiper").swiper;
    this.swiper = swiper;
  },
  created() {
    let product = this.products.find((product) => {
      return product.id == 1;
    });

    this.slides = product.images;
  },
};
</script>

<style scoped lang="scss">
.slider-wrapper {
  max-width: 444px;

  height: auto;
  position: relative;
  overflow: visible;
  @media (max-width: 800px) {
    margin: 0 auto;
  }
  @media (max-width: 480px) {
    margin: 0;
  }
}

.close-btn svg {
  position: absolute;
  top: -40px;
  right: 0;
  cursor: pointer;
  &:hover path {
    fill: $orange;
  }
}

.swiper-button-prev {
  visibility: hidden;
  width: 56px;
  height: 56px;
  background-color: #fff;
  border-radius: 100%;
  top: 40%;
  left: 20px;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  &:hover svg path {
    stroke: $orange;
  }

  @media (max-width: 800px) {
    visibility: visible;
  }
}

.swiper-button-next {
  visibility: hidden;
  width: 56px;
  height: 56px;
  background-color: #fff;
  border-radius: 100%;
  top: 40%;
  right: 20px;
  transform: translate(50%, -50%);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  &:hover svg path {
    stroke: $orange;
  }

  @media (max-width: 800px) {
    visibility: visible;
  }
}

.swiper {
  margin-bottom: 16px;
  width: 100%;
  height: auto;
  border-radius: 13px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    margin-bottom: 20px;
  }
  img {
    border-radius: 13px;
  }
}

.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  height: 444px;
  justify-content: center;
}
.swiper-slide {
  cursor: pointer;
  height: 88px;
  width: 100%;
  padding: 0 5px;
  transition: opacity 0.3s;
  @media (max-width: 400px) {
    height: 70px;
  }
  img {
    border-radius: 8px;
  }
}
.swiper-slide:hover {
  opacity: 0.75;
}

.main {
  .swiper-slide img {
    height: 444px;
  }
}

.thumbnails {
  .swiper-slide img {
    width: 88px;
    height: 88px;
    @media (max-width: 400px) {
      height: 70px;
    }
  }

  .swiper-slide-thumb-active img {
    border: 2px solid $orange;
  }
}

img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
}

.hide {
  visibility: hidden;
}
</style>

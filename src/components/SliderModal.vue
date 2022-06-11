<template>
  <div class="backdrop-slider" @click.self="close">
    <div class="container-modal">
      <div @click.stop class="modal-slider-wrapper">
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

        <div @click="close" class="close-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.5536 1.25098L22.9488 4.64618L15.592 11.9982L22.9472 19.3534L19.552 22.7486L12.2 15.3918L4.84797 22.747L1.45277 19.3518L8.80477 11.9998L1.45117 4.64618L4.84637 1.25098L12.1984 8.60458L19.5536 1.25098Z"
              fill="white"
            />
          </svg>
        </div>
        <swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :loop="true"
          :spaceBetween="10"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          class="main swiper-modal"
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
          class="thumbnails swiper-modal"
        >
          <swiper-slide v-for="(slide, id) in slides" :key="id"
            ><img :src="slide"
          /></swiper-slide>
        </swiper>
      </div>
    </div>
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
    close() {
      this.$emit("close-modal");
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },

  async mounted() {
    let swiper = document.querySelector(".swiper-modal").swiper;
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
.backdrop-slider {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-slider-wrapper {
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: visible;
  margin: 60px auto;
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
  width: 56px;
  height: 56px;
  background-color: #fff;
  border-radius: 100%;
  top: 40%;
  left: 0;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  cursor: pointer;
  &:hover svg path {
    stroke: $orange;
  }
  @media (max-width: 600px) {
    top: 120%;
    left: 80px;
  }
}

.swiper-button-next {
  width: 56px;
  height: 56px;
  background-color: #fff;
  border-radius: 100%;
  top: 40%;
  right: 0;
  transform: translate(50%, -50%);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  cursor: pointer;
  &:hover svg path {
    stroke: $orange;
  }
  @media (max-width: 600px) {
    top: 120%;
    right: 80px;
  }
}

.container-modal {
  margin: 0 auto;
  max-width: 800px;
  padding: 30px;
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
  justify-content: center;
}
.swiper-slide {
  cursor: pointer;

  width: 100%;
  padding: 0 5px;
  transition: opacity 0.3s;
  @media (max-width: 400px) {
  }
  img {
    border-radius: 8px;
  }
}

.main {
  .swiper-slide img {
    width: 100%;
  }
}

.thumbnails {
  .swiper-slide img {
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
</style>

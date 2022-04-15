<template>
  <div v-if="modalIsActive" class="backdrop-slider" @click="close">
    <div class="container-modal">
      <div @click.stop class="modal-slider-wrapper">
        <div class="prev-arrow" @click="$refs.main.goToPrev()">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 2L6 9.5L14 17.5" stroke="#1D2025" stroke-width="3" />
          </svg>
        </div>
        <div class="next-arrow" @click="$refs.main.goToNext()">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.5 2L14 9.5L6 17.5" stroke="#1D2025" stroke-width="3" />
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
        <agile
          class="main"
          ref="main"
          :options="options1"
          :as-nav-for="asNavFor1"
        >
          <div
            class="slide"
            v-for="(slide, index) in slides"
            :key="index"
            :class="`slide--${index}`"
          >
            <img :src="require('../assets/' + slide)" alt="" />
          </div>
        </agile>
        <agile
          class="thumbnails"
          ref="thumbnails"
          :options="options2"
          :as-nav-for="asNavFor2"
        >
          <div
            class="slide slide--thumbniail"
            v-for="(slide, index) in slides"
            :key="index"
            :class="`slide--${index}`"
            @click="$refs.thumbnails.goTo(index)"
          >
            <img
              :src="
                require('../assets/' + slide.split('.')[0] + '-thumbnail.jpg')
              "
              alt=""
            />
          </div>
        </agile>
      </div>
    </div>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";
export default {
  components: { agile: VueAgile },
  props: ["modalIsActive"],
  data() {
    return {
      activeLink: "",
      modalMode: true,
      imagesReceived: true,

      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false,
      },

      options2: {
        autoplay: false,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 4,

        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
            },
          },

          {
            breakpoint: 1000,
          },
        ],
      },

      slides: [],
    };
  },
  computed: {
    activeImage() {
      return require(`../assets/` + this.activeLink);
    },
  },
  methods: {
    updateActiveLink(image) {
      this.activeLink = image;
    },
    close() {
      this.$emit("close-modal");
    },
  },

  async mounted() {
    this.slides = await this.$store.dispatch("productImages", 1);
  },
  updated() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
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

.agile__list {
  border-radius: 13px;
}

.modal-slider-wrapper {
  max-width: 550px;
  width: 100%;
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

.prev-arrow {
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
    top: 112%;
    left: 80px;
  }
}

.next-arrow {
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
    top: 112%;
    right: 80px;
  }
}

.container-modal {
  margin: 0 auto;
  max-width: 900px;
  padding: 30px;
}

.main {
  margin-bottom: 30px;
  img {
    border-radius: 13px;
  }
}

.thumbnails {
  margin: 0 auto;
}

.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  height: 100%;
  justify-content: center;
}
.slide--thumbniail {
  cursor: pointer;
  height: 100%;
  width: 100%;
  padding: 0 5px;
  transition: opacity 0.3s;
  img {
    border-radius: 8px;
  }
}
.slide--thumbniail:hover {
  opacity: 0.75;
}

.slide--thumbniail.agile__slide--active img {
  border: 2px solid $orange;
}

.slide img {
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
}
</style>

<template>
  <div ref="wrapper" class="slider-wrapper">
    <div class="prev-arrow" @click="$refs.mainDesc.goToPrev()">
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
    <div class="next-arrow" @click="$refs.mainDesc.goToNext()">
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

    <agile
      @click="openModalSlider"
      :class="[{ hide: !imagesReceived }, mainClass]"
      ref="mainDesc"
      id="mainDesc"
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
      :class="[{ hide: !imagesReceived }, thumbnailsClass]"
      id="thumbnailsDesc"
      ref="thumbnailsDesc"
      :options="options2"
      :as-nav-for="asNavFor2"
    >
      <div
        class="slide slide--thumbniail"
        v-for="(slide, index) in slides"
        :key="index"
        :class="`slide--${index}`"
        @click="$refs.thumbnailsDesc.goTo(index)"
      >
        <img
          :src="require('../assets/' + slide.split('.')[0] + '-thumbnail.jpg')"
          alt=""
        />
      </div>
    </agile>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";
export default {
  components: { agile: VueAgile },
  data() {
    return {
      activeLink: "",
      modalMode: true,

      mainClass: "main",
      thumbnailsClass: "thumbnails",

      imagesReceived: false,

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
    openModalSlider() {
      this.$emit("openModalSlider");
    },
  },

  async mounted() {
    this.slides = await this.$store.dispatch("productImages", 1);
    setTimeout(() => {
      this.asNavFor1.push(this.$refs.thumbnailsDesc);
      this.asNavFor2.push(this.$refs.mainDesc);
      this.$refs.mainDesc.reload();
      this.$refs.thumbnailsDesc.reload();
      this.imagesReceived = true;
    }, 500);
  },
  updated() {
    this.$refs.mainDesc.reload();
    this.$refs.thumbnailsDesc.reload();
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
    // width: 100%;
  }
  @media (max-width: 480px) {
    margin: 0;
  }
}

.agile__list {
  border-radius: 13px;
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

.next-arrow {
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

.main {
  margin-bottom: 30px;
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

.thumbnails {
  margin: 0;
}

.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  height: 444px;
  justify-content: center;
}
.slide--thumbniail {
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
.slide--thumbniail:hover {
  opacity: 0.75;
}

.slide--thumbniail.agile__slide--active img {
  border: 2px solid $orange;
}

.slide img {
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

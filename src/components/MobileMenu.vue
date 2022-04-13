<template>
  <div v-show="isOpen" class="backdrop" @click="close">
    <transition name="slide">
      <div v-if="isOpen" class="fullscreen-menu" @click.stop>
        <img @click="close" src="../assets/icon-close.svg" alt="" />
        <ul>
          <li>Collections</li>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["isOpen"],
  components: {},
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.backdrop {
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  z-index: 7;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.backdrop .fullscreen-menu {
  background-color: #fff;
  width: 60%;
  height: 100vh;
  padding: 24px 24px;
}

.backdrop .fullscreen-menu img {
  width: 16px;
  cursor: pointer;
}

.backdrop ul {
  list-style: none;
  margin: 0;
  padding: 0;

  font-size: 18px;
  font-weight: 700;
  color: rgba(29, 32, 37, 1);

  margin-top: 50px;
}

.backdrop ul li {
  margin-bottom: 20px;
  cursor: pointer;
}

.slide-enter-active {
  animation: menu-slide-in 0.3s ease-out;
}

.slide-leave-active {
  animation: menu-slide-out 0.3s ease-in;
}

@keyframes menu-slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes menu-slide-out {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>

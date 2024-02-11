<script setup lang="ts">
const swiper = useSwiper();
</script>

<template>
  <button v-if="!swiper.isBeginning" class="btn btn-square slide-btn left" @click="swiper.slidePrev()">
    <IconsArrowLeft></IconsArrowLeft>
  </button>
  <button v-if="!swiper.isEnd" class="btn btn-square slide-btn right" @click="swiper.slideNext()">
    <IconsArrowRight></IconsArrowRight>
  </button>
</template>

<style scoped lang="scss">
.slide-btn {
  position: absolute;
  z-index: 2;
  top: 16px;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}
</style>

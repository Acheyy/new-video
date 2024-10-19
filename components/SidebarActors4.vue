<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    slides-per-view="auto"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: true,
    }"
  >
    <div v-if="pending" style="display: flex">
      <div
        class="single-actor"
        style="height: 122px"
        v-for="index in Array.from({ length: 20 }, (v, k) => k + 1)"
        :key="index"
      >
        <div class="skeleton thumb-wrapper">
          <div class="img"></div>
        </div>
        <div class="actor-name"></div>
      </div>
    </div>
    <SwiperSlide v-else v-for="(slide, index) in actorsData" :key="index">
      <NuxtLink :to="'/all-girls/' + slide.name" class="single-actor link">
        <div class="thumb-wrapper">
          <img class="img" :src="slide.thumbnail + '?width=100'" />

          <div class="number-badge">{{ index + 1 }}</div>
        </div>
        <div class="actor-name">{{ slide.name }}</div>
      </NuxtLink>
    </SwiperSlide>
    <SwiperControls />
  </Swiper>
</template>

<script setup>
const {
  pending,
  data: actorsData,
} = await useLazyFetch( 
  `http://localhost:3030/api/actors/get-most-liked-actors-weekly`
);
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 120px;
}
.placeholder {
  @media only screen and (max-width: 480px) {
    width: 80px !important;
  }
}
.thumb-wrapper {
  max-width: 90px;
  max-height: 90px;
  border-radius: 50%;
  overflow: hidden;

  @media only screen and (max-width: 480px) {
    max-width: 70px;
    max-height: 70px;

    .number-badge {
      top: 44px !important;
    }
  }

  .img {
    width: 90px;
    height: 90px;
  }
}
.single-actor {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  margin-right: 10px;
  position: relative;
  height: 114px;
  width: 100px;
  .number-badge {
    position: absolute;
    top: 60px;
    left: 0;
    background-color: rgb(234 132 196 / 63%);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.actor-name {
  margin-top: 8px;
}
.link {
  text-decoration: none;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  padding: 4px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 100%;

  &:hover {
    background-color: #53545a;
  }
}
</style>

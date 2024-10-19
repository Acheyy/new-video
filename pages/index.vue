<template>
  <div>
    <Hero></Hero>
    
    <div class="cards-wrapper">
      <CardError v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" :key="index" v-if="error"></CardError>
      <CardLoading v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" v-if="pending"></CardLoading>
      <Card v-if="!pending && !error" v-for="(video, index) in videos.videos" :data="video"></Card>
    </div>

    <div class="mt-12 mb-2">{{$t('weeklyTopBJ')}}:</div>
    <SidebarActors4 class="mb-8"></SidebarActors4>


    <NuxtLink :to="localePath('/most-liked/')" class="text-primary" style="display: inline-flex"><h1 class="mt-4 mb-2 ">{{ $t('mostLiked') }}:</h1></NuxtLink>

    <div class="cards-wrapper">
      <CardError v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" :key="index" v-if="error2"></CardError>
      <CardLoading v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" v-if="pending2"></CardLoading>
      <Card v-if="!pending2 && !error2" v-for="(video, index) in videos2?.videos" :data="video"></Card>
    </div>

  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const localePath = useLocalePath();

const { t: $t } = useI18n(); // This is how you destructure the $t function
useSeoMeta({
  title: `${$t("home")} - SKBJ Korean BJ`,
  twitterTitle: `${$t("home")} - SKBJ Korean BJ`,
  ogTitle: `${$t("entertainment")} Korean BJ`,
  description: `${$t("dive")} Korean BJ`,
  ogDescription: `${$t("dive")} Korean BJ`,
  twitterDescription: `${$t("dive")} Korean BJ`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
})

const { pending, data: videos, error } = await useLazyFetch(`http://localhost:3030/api/videos?limit=12`, {
  onResponseError() {
    useNuxtApp().$toast.error($t("loadingError"), {
            autoClose: 10000,
            theme: "colored",
            position: "bottom-center",
        });
  },
});
const { pending2, data: videos2, error2 } = await useLazyFetch(`http://localhost:3030/api/videos/most-liked?limit=12`, {
  onResponseError() {
    useNuxtApp().$toast.error($t("loadingError"), {
            autoClose: 10000,
            theme: "colored",
            position: "bottom-center",
        });
  },
});
</script>
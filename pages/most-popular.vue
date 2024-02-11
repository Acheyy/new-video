<template>
  <h1 class="text-xl mt-8 mb-2 text-center">{{ $t('mostPopular') }}</h1>
  <p class="text-center mb-8">{{ $t('totalVideos') }}: {{ videos?.totalVideos ? videos?.totalVideos : "0" }}</p>
  <div class="cards-wrapper ">
    <CardError v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)" :key="index" v-if="error"></CardError>

    <CardLoading v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)" :key="index" v-if="pending"></CardLoading>
    <Card v-if="!pending && !error" v-for="(video, index) in videos.videos" :data="video.videoId"></Card>
  </div>
  <div v-if="pending || error" class="text-center">
    <Pagination :totalPages="4" :currentPage="router.currentRoute.value.query.page
        ? +router.currentRoute.value.query.page
        : 1
      "></Pagination>
  </div>
  <div v-if="!pending && !error" class="text-center">
    <Pagination v-if="+videos.totalPages > 1" :totalPages="+(+videos.totalPages).toFixed(0)" :currentPage="router.currentRoute.value.query.page
        ? +router.currentRoute.value.query.page
        : 1
      "></Pagination>
  </div>
</template>
  
<script setup>
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
const router = useRouter();
const route = useRoute();

const { pending, data: videos, error } = await useLazyFetch(
  () =>
    `http://localhost:3030/api/videos/most-popular?limit=30&page=${router.currentRoute.value.query.page}`,
  {
    onResponseError() {
      useNuxtApp().$toast.error($t("loadingError"), {
        autoClose: 5000,
        theme: "colored",
        position: "bottom-center",
      });
    },
  }
);


watch(
  () => route.query,
  () => {
    useSeoMeta({
      title: `${$t("mostPopular")} | Page ${route.query.page} - SKBJ`,
      twitterTitle: `${$t("mostPopular")} - SKBJ`,
      ogTitle: `${$t("mostPopular")}`,
      description: `${$t("bestGirls")}`,
      ogDescription: `${$t("bestGirls")}`,
      twitterDescription: `${$t("bestGirls")}`,
      ogImage: `https://skbj.b-cdn.net/random/social2.png`,
      twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
      twitterCard: `summary_large_image`,
    });
  }
);
useSeoMeta({
  title: `${$t("mostPopular")} ${
    router.currentRoute.value.query.page
      ? `| Page ` + router.currentRoute.value.query.page
      : ""
  } - SKBJ`,
  twitterTitle: `${$t("mostPopular")} - SKBJ`,
  ogTitle: `${$t("mostPopular")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
</script>
  
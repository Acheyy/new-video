<template>
    <h1 class="text-xl mt-8 mb-2 text-center">{{ $t('purchased') }}</h1>
    <p class="text-center mb-8">{{ $t('totalVideos')}}: {{ videos?.videos?.length }}</p>
    <div class="cards-wrapper ">
      <CardLoading
        v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
        :key="index"
        v-if="pending"
      ></CardLoading>
      <Card v-else v-for="(video, index) in videos.videos" :data="video"></Card>
    </div>
    <div v-if="pending" class="text-center">
      <Pagination
        :totalPages="99999"
        :currentPage="
          router.currentRoute.value.query.page
            ? +router.currentRoute.value.query.page
            : 1
        "
      ></Pagination>
    </div>
    <div v-if="!pending" class="text-center">
      <Pagination
        v-if="+videos.totalPages > 1"
        :totalPages="+(+videos.totalPages).toFixed(0)"
        :currentPage="
          router.currentRoute.value.query.page
            ? +router.currentRoute.value.query.page
            : 1
        "
      ></Pagination>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from "vue-i18n";

  const headers = useRequestHeaders(["cookie"]);
  const { t: $t } = useI18n(); 
  const router = useRouter();
  
  const { pending, data: videos } = await useLazyFetch(
    () =>
      `http://localhost:3030/api/videos/getPurchasedVideos`,
    {
        credentials: "include",
    headers,

      onResponseError() {
        useNuxtApp().$toast.error($t("loadingError"), {
              autoClose: 5000,
              theme: "colored",
              position: "bottom-center",
          });
      },
    }
  );
  useSeoMeta({
  title: `${$t("purchased")} - SKBJ Korean BJ`,
  twitterTitle: `${$t("purchased")} - SKBJ Korean BJ`,
  ogTitle: `${$t("purchased")} Korean BJ`,
  description: `${$t("bestGirls")} Korean BJ`,
  ogDescription: `${$t("bestGirls")} Korean BJ`,
  twitterDescription: `${$t("bestGirls")} Korean BJ`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
  </script>
  
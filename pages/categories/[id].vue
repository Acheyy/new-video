<template>
    <h1 class="text-xl mt-8 mb-2 text-center">{{ route.params.id }}</h1>
    <p class="text-center mb-8">{{ $t('totalVideos')}}: {{ videos?.totalVideos ? videos?.totalVideos :"0" }}</p>
    <div class="cards-wrapper ">
      <CardError v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)" :key="index" v-if="error"></CardError>
  
      <CardLoading
        v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
        :key="index"
        v-if="pending"
      ></CardLoading>
      <Card v-if="!pending && !error" v-for="(video, index) in videos.videos" :data="video"></Card>
    </div>
    <div v-if="pending || error" class="text-center">
      <Pagination
        :totalPages="99999"
        :currentPage="
          router.currentRoute.value.query.page
            ? +router.currentRoute.value.query.page
            : 1
        "
      ></Pagination>
    </div>
    <div v-if="!pending && !error" class="text-center">
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
  const route = useRoute();

  const { t: $t } = useI18n(); 
  useSeoMeta({
    title: `${route.params.id} videos - KBJFREE`,
    twitterTitle: `${route.params.id} videos - KBJFREE`,
    ogTitle: `${$t("entertainment")}`,
    description: `${$t("biggest")}`,
    ogDescription: `${$t("biggest")}`,
    twitterDescription: `${$t("biggest")}`,
    ogImage: `https://skbj.b-cdn.net/random/social3.png`,
    twitterImage: `https://skbj.b-cdn.net/random/social3.png`,
    twitterCard: `summary_large_image`,
  })
  const router = useRouter();
  
  const { pending, data: videos, error } = await useLazyFetch(
    () =>
      `https://kbjfree.tv/api/videos/getVideosByCategory?category=${route.params.id}&limit=30&page=${router.currentRoute.value.query.page}`,
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
  </script>
  
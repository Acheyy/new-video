<template>
  <div>
    <Hero></Hero>
    <div class="cards-wrapper">
      <CardError v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" :key="index" v-if="error"></CardError>
      <CardLoading v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" v-if="pending"></CardLoading>
      <Card v-if="!pending && !error" v-for="(video, index) in videos.videos" :data="video"></Card>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n(); // This is how you destructure the $t function
useSeoMeta({
  title: `${$t("home")} - SexKBJ`,
  twitterTitle: `${$t("home")} - SexKBJ`,
  ogTitle: `${$t("entertainment")}`,
  description: `${$t("dive")}`,
  ogDescription: `${$t("dive")}`,
  twitterDescription: `${$t("dive")}`,
  ogImage: `https://skbj.b-cdn.net/random/social.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social.png`,
  twitterCard: `summary_large_image`,
})

const { pending, data: videos, error } = await useLazyFetch(`https://sexkbj.tv/api/videos?limit=12`, {
  onResponseError() {
    useNuxtApp().$toast.error($t("loadingError"), {
            autoClose: 10000,
            theme: "colored",
            position: "bottom-center",
        });
  },
});
</script>
<template>
  <h1 class="text-xl mt-8 mb-2 text-center">{{ $t("following") }}</h1>
  <div class="cards-wrapper">
    <CardBJLoding
      v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
      :key="index"
      v-if="pending"
    >
    </CardBJLoding>
    <CardBJ v-else v-for="(actor, index) in actorsData" :data="actor"></CardBJ>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
const router = useRouter();
const headers = useRequestHeaders(["cookie"]);
useSeoMeta({
  title: `${$t("following")} - SKBJ`,
  twitterTitle: `${$t("following")} - SKBJ`,
  ogTitle: `${$t("following")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

const { pending, data: actorsData } = await useLazyFetch(
  () => `http://localhost:3030/api/actors/following`,
  {
    onResponseError() {
      useNuxtApp().$toast.error($t("loadingError"), {
        autoClose: 5000,
        theme: "colored",
        position: "bottom-center",
      });
    },
    credentials: "include",
    headers,
  }
);

useSeoMeta({
  title: `${$t("following")} - SKBJ`,
  twitterTitle: `${$t("following")} - SKBJ`,
  ogTitle: `${$t("following")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

</script>

<template>
  <h1 class="text-xl mt-8 mb-2 text-center">{{ $t("BJlist") }}</h1>
  <div class="order-by text-center">
    <span>{{$t('orderBy')}}: </span>

    <select
      class="select select-sm select-bordered max-w-xs"
      v-model="selectedOrder"
    >
      <option value="default">{{$t('default')}}</option>
      <option value="alphabetic">{{$t('alphabetic')}}</option>
      <option value="most_videos">{{$t('totalVideos')}}</option>
      <option value="most_followers">{{$t('totalFollowers')}}</option>
    </select>
  </div>

  <div class="cards-wrapper">
    <CardBJError
      v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
      :key="index"
      v-if="error"
    >
    </CardBJError>
    <CardBJLoding
      v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
      :key="index"
      v-if="pending"
    >
    </CardBJLoding>
    <CardBJ
      v-if="!pending && !error"
      v-for="(actor, index) in actorsData.actors"
      :data="actor"
    ></CardBJ>
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
      v-if="+actorsData.totalPages > 1"
      :totalPages="+(+actorsData.totalPages).toFixed(0)"
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

const { t: $t } = useI18n();
const router = useRouter();
const route = useRoute();
const selectedOrder = ref("default"); // default value as empty string

watch(selectedOrder, (newValue) => {
  router.push({ query: { ...route.query, order: newValue } });
});

watch(
  () => route.query,
  () => {
    useSeoMeta({
      title: `${$t("BJlist")} | Page ${route.query.page ? route.query.page : '1'} | Order ${route.query.order ? route.query.order : 'default'} - KBJfree`,
      twitterTitle: `${$t("BJlist")} - KBJfree`,
      ogTitle: `${$t("BJlist")}`,
      description: `${$t("bestGirls")}`,
      ogDescription: `${$t("bestGirls")}`,
      twitterDescription: `${$t("bestGirls")}`,
      ogImage: `https://kbjfree.b-cdn.net/random/social2.png`,
      twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
      twitterCard: `summary_large_image`,
    });
  }
);
useSeoMeta({
  title: `${$t("BJlist")} ${
    router.currentRoute.value.query.page
      ? `Page ` + router.currentRoute.value.query.page
      : ""
  } - KBJFree`,
  twitterTitle: `${$t("BJlist")} - KBJFree`,
  ogTitle: `${$t("entertainment")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

const {
  pending,
  data: actorsData,
  error,
} = await useLazyFetch(
  () =>
    `http://localhost:3030/api/actors?page=${router.currentRoute.value.query.page}&order=${router.currentRoute.value.query.order}`,
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

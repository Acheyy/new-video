<template>
  <div class="my-8">
    {{$t('categories')}}:
    <div class="mt-4">
      <template v-for="(category, index) in categories" :key="index">
        <NuxtLink
          :to="localePath('/categories/' + category.slug)"
          class="btn m-2"
        >
          {{ category.name }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n();

const localePath = useLocalePath();

useSeoMeta({
  title: `Categories - SKBJ`,
  twitterTitle: `Categories - SKBJ`,
  ogTitle: `${$t("entertainment")}`,
  description: `${$t("biggest")}`,
  ogDescription: `${$t("biggest")}`,
  twitterDescription: `${$t("biggest")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

const { data: categories } = await useFetch(
  `http://localhost:3030/api/categories `
);
</script>

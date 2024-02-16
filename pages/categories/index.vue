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
  title: `Categories - KBJFree`,
  twitterTitle: `Categories - KBJFree`,
  ogTitle: `${$t("entertainment")}`,
  description: `${$t("biggest")}`,
  ogDescription: `${$t("biggest")}`,
  twitterDescription: `${$t("biggest")}`,
  ogImage: `https://kbjfree.b-cdn.net/random/social2.png`, // ce e
  twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

const { data: categories } = await useFetch(
  `https://kbjfree.tv/api/categories `
);
</script>

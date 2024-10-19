<template>
  <div class="my-8">
    {{$t('tags')}}:
    <div class="mt-4">
      <template v-for="(category, index) in tagsData" :key="index">
        <NuxtLink :to="localePath('/tags/' + category.slug)" class="btn m-2">
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
  title: `Tags - SKBJ Korean BJ`,
  twitterTitle: `Tags - SKBJ Korean BJ`,
  ogTitle: `${$t("entertainment")} Korean BJ`,
  description: `${$t("biggest")} Korean BJ`,
  ogDescription: `${$t("biggest")} Korean BJ`,
  twitterDescription: `${$t("biggest")} Korean BJ`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
const { data: tagsData } = await useFetch(`http://localhost:3030/api/tags `);
</script>

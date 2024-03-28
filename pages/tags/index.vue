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
  title: `Tags - KBJFree`,
  twitterTitle: `Tags - KBJFree`,
  ogTitle: `${$t("entertainment")}`,
  description: `${$t("biggest")}`,
  ogDescription: `${$t("biggest")}`,
  twitterDescription: `${$t("biggest")}`,
  ogImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
const { data: tagsData } = await useFetch(`http://localhost:3030/api/tags `);
</script>

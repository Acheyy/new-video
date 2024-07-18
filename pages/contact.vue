<template>
  <div class="text-center mt-24 mb-64">
    Email: <strong>contact@skbj.tv</strong>
  </div>
</template>

<script setup>
const { t: $t } = useI18n();

useSeoMeta({
  title: `${$t("contact")} - SKBJ Korean BJ`,
  twitterTitle: `${$t("contact")} - SKBJ Korean BJ`,
  ogTitle: `${$t("contact")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
</script>
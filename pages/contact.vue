<template>
  <div class="text-center mt-24 mb-64">
    Email: <strong>contact@kbjfree.tv</strong>
  </div>
</template>

<script setup>
const { t: $t } = useI18n();

useSeoMeta({
  title: `${$t("contact")} - KBJFree`,
  twitterTitle: `${$t("contact")} - KBJFree`,
  ogTitle: `${$t("contact")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
</script>
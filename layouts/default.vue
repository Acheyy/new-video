<template>
  <div class="main-wrapper container mx-auto">
    <PurchaseCoins></PurchaseCoins>
    <UpgradeModal></UpgradeModal>

    <Header> </Header>

    <!-- <Notification /> -->

    <div class="container px-2">
      <Breadcrumbs></Breadcrumbs>

      <slot></slot>
    </div>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useRouteHistoryStore } from "~/store/routeHistory";
const i18nHead = useLocaleHead({
  addSeoAttributes: {
    canonicalQueries: ["foo"],
  },
});

setTimeout(() => {
  if (window) {
    window.DisableDevtool();
  }
}, 2000);

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },
  link: [
    ...(i18nHead.value.link || []),
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
  meta: [...(i18nHead.value.meta || [])],
});
const routeHistoryStore = useRouteHistoryStore();
const router = useRouter();

watch(
  () => router.currentRoute.value,
  (to, from) => {
    if (from && !["/login", "/register"].includes(from.fullPath)) {
      routeHistoryStore.addRoute(from.fullPath);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.main-wrapper {
  min-height: 100vh;
  padding-top: 4rem;
}
</style>

<template>
  <div class="main-wrapper container mx-auto">
    <PurchaseCoins></PurchaseCoins>
    <UpgradeModal></UpgradeModal>

    <Header> </Header>

    <div class="container px-2">
      <Breadcrumbs></Breadcrumbs>

      <slot></slot>
    </div>

    <Footer></Footer>
  </div>
</template>

// In your main layout or global navigation guard
<script setup>
import { watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useRouteHistoryStore } from "~/store/routeHistory";
const i18nHead = useLocaleHead({
  addSeoAttributes: {
    canonicalQueries: ["foo"],
  },
});

const router = useRouter()
const route = useRoute()

const redirectPaths = [
  '/videos/def2cf7a-20bf-4fea-898b-6ca5046f105f',
  '/kr/videos/def2cf7a-20bf-4fea-898b-6ca5046f105f',
  '/cn/videos/def2cf7a-20bf-4fea-898b-6ca5046f105f',
  
  '/videos/63b35593-2deb-4621-bcda-bbebb0b8c294',
  '/kr/videos/63b35593-2deb-4621-bcda-bbebb0b8c294',
  '/cn/videos/63b35593-2deb-4621-bcda-bbebb0b8c294',

  '/videos/74e88479-76cb-407e-83db-2d1b55a303db',
  '/kr/videos/74e88479-76cb-407e-83db-2d1b55a303db',
  '/cn/videos/74e88479-76cb-407e-83db-2d1b55a303db',

  '/videos/u7563nluku9v',
  '/kr/videos/u7563nluku9v',
  '/cn/videos/u7563nluku9v',

  '/videos/ualhfx7k44mz',
  '/kr/videos/ualhfx7k44mz',
  '/cn/videos/ualhfx7k44mz',

  '/videos/tihelhc14gm4',
  '/kr/videos/tihelhc14gm4',
  '/cn/videos/tihelhc14gm4',

  '/videos/83egq6leyxzd',
  '/kr/videos/83egq6leyxzd',
  '/cn/videos/83egq6leyxzd',

  '/videos/0vtn3971h003',
  '/kr/videos/0vtn3971h003',
  '/cn/videos/0vtn3971h003',

  '/videos/zx3wtdf8zmmk',
  '/kr/videos/zx3wtdf8zmmk',
  '/cn/videos/zx3wtdf8zmmk',

  '/videos/34ais86ppgn7',
  '/kr/videos/34ais86ppgn7',
  '/cn/videos/34ais86ppgn7',

  '/videos/6qyydhyid97x',
  '/kr/videos/6qyydhyid97x',
  '/cn/videos/6qyydhyid97x',

  '/videos/4pdchtejapb7',
  '/kr/videos/4pdchtejapb7',
  '/cn/videos/4pdchtejapb7',

  '/videos/rbagra6pgjpd',
  '/kr/videos/rbagra6pgjpd',
  '/cn/videos/rbagra6pgjpd',

  '/videos/vmkvrnabibdn',
  '/kr/videos/vmkvrnabibdn',
  '/cn/videos/vmkvrnabibdn',

  '/videos/3kagjvs51r5q',
  '/kr/videos/3kagjvs51r5q',
  '/cn/videos/3kagjvs51r5q',

  '/videos/621ea0ef-b092-44ea-ba0a-cc76eaf9264e',
  '/kr/videos/621ea0ef-b092-44ea-ba0a-cc76eaf9264e',
  '/cn/videos/621ea0ef-b092-44ea-ba0a-cc76eaf9264e',

  '/videos/6dd67028-0b9d-4acf-ae05-054ffeacfae5',
  '/kr/videos/6dd67028-0b9d-4acf-ae05-054ffeacfae5',
  '/cn/videos/6dd67028-0b9d-4acf-ae05-054ffeacfae5',

  '/videos/411cd0ef-e7f0-4924-bf21-8e8a15ec6a8e',
  '/kr/videos/411cd0ef-e7f0-4924-bf21-8e8a15ec6a8e',
  '/cn/videos/411cd0ef-e7f0-4924-bf21-8e8a15ec6a8e',
]

const handleRedirection = () => {
  if (redirectPaths.includes(route.path)) {
    router.push('/')
  }
}

// Run the redirection logic on initial mount
onMounted(handleRedirection)

// Watch for route changes to handle redirection
watchEffect(() => {
  handleRedirection()
})

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

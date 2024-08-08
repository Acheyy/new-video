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

  '/videos/933922d3-72b3-4cf6-9de8-1ddc9a4400c5',
  '/kr/videos/933922d3-72b3-4cf6-9de8-1ddc9a4400c5',
  '/cn/videos/933922d3-72b3-4cf6-9de8-1ddc9a4400c5',

  '/videos/8b59e89f-0194-4f0c-b37f-c6e38943e549',
  '/kr/videos/8b59e89f-0194-4f0c-b37f-c6e38943e549',
  '/cn/videos/8b59e89f-0194-4f0c-b37f-c6e38943e549',

  '/videos/2661e28f-a7d2-40ff-a37c-3aa9b1229e4f',
  '/kr/videos/2661e28f-a7d2-40ff-a37c-3aa9b1229e4f',
  '/cn/videos/2661e28f-a7d2-40ff-a37c-3aa9b1229e4f',

  '/videos/2661e28f-a7d2-40ff-a37c-3aa9b1229e4f',
  '/kr/videos/2661e28f-a7d2-40ff-a37c-3aa9b1229e4f',
  '/cn/videos/2661e28f-a7d2-40ff-a37c-3aa9b1229e4f',

  '/videos/dc2558e2-2e93-4300-99db-2d8f055b179d',
  '/kr/videos/dc2558e2-2e93-4300-99db-2d8f055b179d',
  '/cn/videos/dc2558e2-2e93-4300-99db-2d8f055b179d',

  '/videos/63366500-89c9-4ef9-ac08-5a3647f4689c',
  '/kr/videos/63366500-89c9-4ef9-ac08-5a3647f4689c',
  '/cn/videos/63366500-89c9-4ef9-ac08-5a3647f4689c',

  '/videos/1814919f-b271-4f59-a17a-750be778ee1b',
  '/kr/videos/1814919f-b271-4f59-a17a-750be778ee1b',
  '/cn/videos/1814919f-b271-4f59-a17a-750be778ee1b',

  '/videos/a5fe858b-a0c1-460b-9d11-622bde1a4bba',
  '/kr/videos/a5fe858b-a0c1-460b-9d11-622bde1a4bba',
  '/cn/videos/a5fe858b-a0c1-460b-9d11-622bde1a4bba',

  '/videos/c3c6de4a-f481-48f3-93d2-6f0c8ee9395f',
  '/kr/videos/c3c6de4a-f481-48f3-93d2-6f0c8ee9395f',
  '/cn/videos/c3c6de4a-f481-48f3-93d2-6f0c8ee9395f',

  '/videos/969505ed-3855-494b-ac07-e50ee7657afb',
  '/kr/videos/969505ed-3855-494b-ac07-e50ee7657afb',
  '/cn/videos/969505ed-3855-494b-ac07-e50ee7657afb',

  '/videos/cff2a096-0d4b-4d4e-a76a-b3a4b5d9c40b',
  '/kr/videos/cff2a096-0d4b-4d4e-a76a-b3a4b5d9c40b',
  '/cn/videos/cff2a096-0d4b-4d4e-a76a-b3a4b5d9c40b',

  '/videos/38652384-9afa-4ff3-8a71-aedee9268b71',
  '/kr/videos/38652384-9afa-4ff3-8a71-aedee9268b71',
  '/cn/videos/38652384-9afa-4ff3-8a71-aedee9268b71',

  '/videos/940e3fac-b340-4fae-82a1-62bf1a0b7df5',
  '/kr/videos/940e3fac-b340-4fae-82a1-62bf1a0b7df5',
  '/cn/videos/940e3fac-b340-4fae-82a1-62bf1a0b7df5',

  '/videos/c2448e93-8b37-4539-ac65-d03b585a6bf5',
  '/kr/videos/c2448e93-8b37-4539-ac65-d03b585a6bf5',
  '/cn/videos/c2448e93-8b37-4539-ac65-d03b585a6bf5',

  '/videos/bb483b46-535b-40ab-b83b-72dd2bc4ab9a',
  '/kr/videos/bb483b46-535b-40ab-b83b-72dd2bc4ab9a',
  '/cn/videos/bb483b46-535b-40ab-b83b-72dd2bc4ab9a',

  '/videos/3951c403-5371-4271-8c18-cd3f3156e909',
  '/kr/videos/3951c403-5371-4271-8c18-cd3f3156e909',
  '/cn/videos/3951c403-5371-4271-8c18-cd3f3156e909',

  '/videos/e96639ef-da1e-4c80-b31b-7d9fd5410719',
  '/kr/videos/e96639ef-da1e-4c80-b31b-7d9fd5410719',
  '/cn/videos/e96639ef-da1e-4c80-b31b-7d9fd5410719',

  '/videos/4700ea5e-8d06-49a5-9cde-ade2c025b62a',
  '/kr/videos/4700ea5e-8d06-49a5-9cde-ade2c025b62a',
  '/cn/videos/4700ea5e-8d06-49a5-9cde-ade2c025b62a',

  '/videos/20314006-9597-45d1-9751-5286aa569c72',
  '/kr/videos/20314006-9597-45d1-9751-5286aa569c72',
  '/cn/videos/20314006-9597-45d1-9751-5286aa569c72',

  '/videos/9fd1999f-28c8-4302-a1b3-66aabad8341a',
  '/kr/videos/9fd1999f-28c8-4302-a1b3-66aabad8341a',
  '/cn/videos/9fd1999f-28c8-4302-a1b3-66aabad8341a',

  '/videos/75544d81-01d7-477e-9ae9-1ebda692514a',
  '/kr/videos/75544d81-01d7-477e-9ae9-1ebda692514a',
  '/cn/videos/75544d81-01d7-477e-9ae9-1ebda692514a',

  '/videos/e001acb1-9584-4fdb-9bbb-d255b3a982cf',
  '/kr/videos/e001acb1-9584-4fdb-9bbb-d255b3a982cf',
  '/cn/videos/e001acb1-9584-4fdb-9bbb-d255b3a982cf',

  '/videos/906e3bab-f621-4232-8c8b-461fe3775673',
  '/kr/videos/906e3bab-f621-4232-8c8b-461fe3775673',
  '/cn/videos/906e3bab-f621-4232-8c8b-461fe3775673',

  '/videos/0df286d1-3aac-4e1e-94df-0c8508296818',
  '/kr/videos/0df286d1-3aac-4e1e-94df-0c8508296818',
  '/cn/videos/0df286d1-3aac-4e1e-94df-0c8508296818',

  '/videos/e69129e4-5126-493d-9fa7-0d64b5108e4d',
  '/kr/videos/e69129e4-5126-493d-9fa7-0d64b5108e4d',
  '/cn/videos/e69129e4-5126-493d-9fa7-0d64b5108e4d',

  '/videos/08600fd2-768e-48b2-9600-36f955401a5d',
  '/kr/videos/08600fd2-768e-48b2-9600-36f955401a5d',
  '/cn/videos/08600fd2-768e-48b2-9600-36f955401a5d',

  '/videos/fb2406ad-9214-4c12-bc37-e08456bb9aeb',
  '/kr/videos/fb2406ad-9214-4c12-bc37-e08456bb9aeb',
  '/cn/videos/fb2406ad-9214-4c12-bc37-e08456bb9aeb',

  '/videos/f55854cd-6518-4a3f-9ad9-d602f94dad99',
  '/kr/videos/f55854cd-6518-4a3f-9ad9-d602f94dad99',
  '/cn/videos/f55854cd-6518-4a3f-9ad9-d602f94dad99',

  '/videos/4cc101e4-ae06-4ba7-b463-433e7bfd445c',
  '/kr/videos/4cc101e4-ae06-4ba7-b463-433e7bfd445c',
  '/cn/videos/4cc101e4-ae06-4ba7-b463-433e7bfd445c',

  '/videos/a3d4882a-faa5-4c87-beef-d10fd170bb23',
  '/kr/videos/a3d4882a-faa5-4c87-beef-d10fd170bb23',
  '/cn/videos/a3d4882a-faa5-4c87-beef-d10fd170bb23',

  '/videos/9ffb92b6-2874-488c-9572-430e6594735b',
  '/kr/videos/9ffb92b6-2874-488c-9572-430e6594735b',
  '/cn/videos/9ffb92b6-2874-488c-9572-430e6594735b',

  '/videos/ce2ca282-7065-4084-8f48-f37f609a1c85',
  '/kr/videos/ce2ca282-7065-4084-8f48-f37f609a1c85',
  '/cn/videos/ce2ca282-7065-4084-8f48-f37f609a1c85',

  '/videos/a85faf23-1207-4573-ac53-268533f9d755',
  '/kr/videos/a85faf23-1207-4573-ac53-268533f9d755',
  '/cn/videos/a85faf23-1207-4573-ac53-268533f9d755',

  '/videos/f79504d6-b4ad-46d4-8ce4-0a2357eda5c7',
  '/kr/videos/f79504d6-b4ad-46d4-8ce4-0a2357eda5c7',
  '/cn/videos/f79504d6-b4ad-46d4-8ce4-0a2357eda5c7',

  '/videos/c82536ef-8f20-460d-956c-91531592e265',
  '/kr/videos/c82536ef-8f20-460d-956c-91531592e265',
  '/cn/videos/c82536ef-8f20-460d-956c-91531592e265',

  '/videos/edc2f786-7cbf-4569-aeb9-b2ac96b3d857',
  '/kr/videos/edc2f786-7cbf-4569-aeb9-b2ac96b3d857',
  '/cn/videos/edc2f786-7cbf-4569-aeb9-b2ac96b3d857',

  '/videos/e4293d14-1a35-408a-a656-8bd7f91eaaa5',
  '/kr/videos/e4293d14-1a35-408a-a656-8bd7f91eaaa5',
  '/cn/videos/e4293d14-1a35-408a-a656-8bd7f91eaaa5',

  '/videos/b9c22efa-c9db-47b1-b200-36ac29dbee4f',
  '/kr/videos/b9c22efa-c9db-47b1-b200-36ac29dbee4f',
  '/cn/videos/b9c22efa-c9db-47b1-b200-36ac29dbee4f',

  '/videos/74e88479-76cb-407e-83db-2d1b55a303db',
  '/kr/videos/74e88479-76cb-407e-83db-2d1b55a303db',
  '/cn/videos/74e88479-76cb-407e-83db-2d1b55a303db',

  '/videos/f3fba21e-df6e-4706-a61d-0038b6de5fda',
  '/kr/videos/f3fba21e-df6e-4706-a61d-0038b6de5fda',
  '/cn/videos/f3fba21e-df6e-4706-a61d-0038b6de5fda',

  '/videos/7651997b-45e1-4c56-8b22-f9f131de4cd8',
  '/kr/videos/7651997b-45e1-4c56-8b22-f9f131de4cd8',
  '/cn/videos/7651997b-45e1-4c56-8b22-f9f131de4cd8',

  '/videos/530a9085-89c4-45d0-a6a8-d0017a89d9c5',
  '/kr/videos/530a9085-89c4-45d0-a6a8-d0017a89d9c5',
  '/cn/videos/530a9085-89c4-45d0-a6a8-d0017a89d9c5',

  '/videos/5d100db6-1ca0-4520-af1b-93dd8dc6e8d9',
  '/kr/videos/5d100db6-1ca0-4520-af1b-93dd8dc6e8d9',
  '/cn/videos/5d100db6-1ca0-4520-af1b-93dd8dc6e8d9',

  '/videos/c1b290c3-c3ca-41c7-b2c5-65f9bc8cca58',
  '/kr/videos/c1b290c3-c3ca-41c7-b2c5-65f9bc8cca58',
  '/cn/videos/c1b290c3-c3ca-41c7-b2c5-65f9bc8cca58',

  '/videos/ece24b3c-e83d-48ec-8e4b-380ac024ee85',
  '/kr/videos/ece24b3c-e83d-48ec-8e4b-380ac024ee85',
  '/cn/videos/ece24b3c-e83d-48ec-8e4b-380ac024ee85',

  '/videos/f820a3f1-5508-48e5-9502-3332e88df38d',
  '/kr/videos/f820a3f1-5508-48e5-9502-3332e88df38d',
  '/cn/videos/f820a3f1-5508-48e5-9502-3332e88df38d',

  '/videos/bb996b45-3b3b-4b4d-8048-094933762d5b',
  '/kr/videos/bb996b45-3b3b-4b4d-8048-094933762d5b',
  '/cn/videos/bb996b45-3b3b-4b4d-8048-094933762d5b',

  '/videos/2e79ff7c-5565-479f-abae-a8d6ec833df7',
  '/kr/videos/2e79ff7c-5565-479f-abae-a8d6ec833df7',
  '/cn/videos/2e79ff7c-5565-479f-abae-a8d6ec833df7',

  '/videos/87e918f0-b547-46f2-9fe7-fddd7fe33272',
  '/kr/videos/87e918f0-b547-46f2-9fe7-fddd7fe33272',
  '/cn/videos/87e918f0-b547-46f2-9fe7-fddd7fe33272',
  

  '/videos/f2b3978b-0a90-4f33-bfa2-e77c56245005',
  '/kr/videos/f2b3978b-0a90-4f33-bfa2-e77c56245005',
  '/cn/videos/f2b3978b-0a90-4f33-bfa2-e77c56245005',
  

  '/videos/411cd0ef-e7f0-4924-bf21-8e8a15ec6a8e',
  '/kr/videos/411cd0ef-e7f0-4924-bf21-8e8a15ec6a8e',
  '/cn/videos/411cd0ef-e7f0-4924-bf21-8e8a15ec6a8e',
  

  '/videos/5585053a-62d6-47e7-8a62-2c93fd0fec3f',
  '/kr/videos/5585053a-62d6-47e7-8a62-2c93fd0fec3f',
  '/cn/videos/5585053a-62d6-47e7-8a62-2c93fd0fec3f',
  

  '/bj-list/ahrin',
  '/kr/bj-list/ahrin',
  '/cn/bj-list/ahrin',
  
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

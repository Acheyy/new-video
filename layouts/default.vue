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
  





  '/videos/0ecf35f7-d32c-4ea8-adc5-bc66a028f07a',
  '/kr/videos/0ecf35f7-d32c-4ea8-adc5-bc66a028f07a',
  '/cn/videos/0ecf35f7-d32c-4ea8-adc5-bc66a028f07a',

  '/videos/c6980565-dfc6-4a4d-9384-740f763bb545',
  '/kr/videos/c6980565-dfc6-4a4d-9384-740f763bb545',
  '/cn/videos/c6980565-dfc6-4a4d-9384-740f763bb545',

  '/videos/f1f330fb-cb12-46f2-bdb4-e2e31c876afd',
  '/kr/videos/f1f330fb-cb12-46f2-bdb4-e2e31c876afd',
  '/cn/videos/f1f330fb-cb12-46f2-bdb4-e2e31c876afd',

  '/videos/4fe8c452-d752-4890-b57d-f2440832408b',
  '/kr/videos/4fe8c452-d752-4890-b57d-f2440832408b',
  '/cn/videos/4fe8c452-d752-4890-b57d-f2440832408b',

  '/videos/f1f330fb-cb12-46f2-bdb4-e2e31c876afd',
  '/kr/videos/f1f330fb-cb12-46f2-bdb4-e2e31c876afd',
  '/cn/videos/f1f330fb-cb12-46f2-bdb4-e2e31c876afd',

  '/videos/12ce69fb-97f0-4962-a05d-83ccc4068884',
  '/kr/videos/12ce69fb-97f0-4962-a05d-83ccc4068884',
  '/cn/videos/12ce69fb-97f0-4962-a05d-83ccc4068884',

  '/videos/0e2120fc-4a4a-46cc-b359-d6558bace314',
  '/kr/videos/0e2120fc-4a4a-46cc-b359-d6558bace314',
  '/cn/videos/0e2120fc-4a4a-46cc-b359-d6558bace314',

  '/videos/0e2120fc-4a4a-46cc-b359-d6558bace314',
  '/kr/videos/0e2120fc-4a4a-46cc-b359-d6558bace314',
  '/cn/videos/0e2120fc-4a4a-46cc-b359-d6558bace314',

  '/videos/3754453f-2bad-4167-94df-17d29e5a8518',
  '/kr/videos/3754453f-2bad-4167-94df-17d29e5a8518',
  '/cn/videos/3754453f-2bad-4167-94df-17d29e5a8518',

  '/videos/310c7702-82dd-4a70-af84-42c5c89f4a3b',
  '/kr/videos/310c7702-82dd-4a70-af84-42c5c89f4a3b',
  '/cn/videos/310c7702-82dd-4a70-af84-42c5c89f4a3b',

  '/videos/c6980565-dfc6-4a4d-9384-740f763bb545',
  '/kr/videos/c6980565-dfc6-4a4d-9384-740f763bb545',
  '/cn/videos/c6980565-dfc6-4a4d-9384-740f763bb545',

  '/videos/3754453f-2bad-4167-94df-17d29e5a8518',
  '/kr/videos/3754453f-2bad-4167-94df-17d29e5a8518',
  '/cn/videos/3754453f-2bad-4167-94df-17d29e5a8518',

  '/videos/310c7702-82dd-4a70-af84-42c5c89f4a3b',
  '/kr/videos/310c7702-82dd-4a70-af84-42c5c89f4a3b',
  '/cn/videos/310c7702-82dd-4a70-af84-42c5c89f4a3b',

  '/videos/410d6601-0c1e-4d3f-99f4-1c53a57a6caa',
  '/kr/videos/410d6601-0c1e-4d3f-99f4-1c53a57a6caa',
  '/cn/videos/410d6601-0c1e-4d3f-99f4-1c53a57a6caa',

  '/videos/p3iue58iuiu4',
  '/kr/videos/p3iue58iuiu4',
  '/cn/videos/p3iue58iuiu4',

  '/videos/0ecf35f7-d32c-4ea8-adc5-bc66a028f07a',
  '/kr/videos/0ecf35f7-d32c-4ea8-adc5-bc66a028f07a',
  '/cn/videos/0ecf35f7-d32c-4ea8-adc5-bc66a028f07a',

  '/videos/3ea27db7-609f-476e-a768-c01781645dd1',
  '/kr/videos/3ea27db7-609f-476e-a768-c01781645dd1',
  '/cn/videos/3ea27db7-609f-476e-a768-c01781645dd1',

  '/videos/sxw4stjdsy7r',
  '/kr/videos/sxw4stjdsy7r',
  '/cn/videos/sxw4stjdsy7r',

  '/videos/8551d7f3-cda0-4956-9ae2-2b0c60fa52ff',
  '/kr/videos/8551d7f3-cda0-4956-9ae2-2b0c60fa52ff',
  '/cn/videos/8551d7f3-cda0-4956-9ae2-2b0c60fa52ff',

  '/videos/s8p4iqzs4eed',
  '/kr/videos/s8p4iqzs4eed',
  '/cn/videos/s8p4iqzs4eed',

  '/videos/3866723f-4ccc-4818-9c2f-26d0bd316f28',
  '/kr/videos/3866723f-4ccc-4818-9c2f-26d0bd316f28',
  '/cn/videos/3866723f-4ccc-4818-9c2f-26d0bd316f28',

  '/videos/3866723f-4ccc-4818-9c2f-26d0bd316f28',
  '/kr/videos/3866723f-4ccc-4818-9c2f-26d0bd316f28',
  '/cn/videos/3866723f-4ccc-4818-9c2f-26d0bd316f28',

  '/videos/8155a22d-4856-464b-b29c-247df0a26a80',
  '/kr/videos/8155a22d-4856-464b-b29c-247df0a26a80',
  '/cn/videos/8155a22d-4856-464b-b29c-247df0a26a80',

  '/videos/6ab7d58f-483b-4816-a4da-23dd73007d58',
  '/kr/videos/6ab7d58f-483b-4816-a4da-23dd73007d58',
  '/cn/videos/6ab7d58f-483b-4816-a4da-23dd73007d58',

  '/videos/f6838b1c-691c-411c-92ba-04e31f28138a',
  '/kr/videos/f6838b1c-691c-411c-92ba-04e31f28138a',
  '/cn/videos/f6838b1c-691c-411c-92ba-04e31f28138a',

  '/videos/f6838b1c-691c-411c-92ba-04e31f28138a',
  '/kr/videos/f6838b1c-691c-411c-92ba-04e31f28138a',
  '/cn/videos/f6838b1c-691c-411c-92ba-04e31f28138a',

  '/videos/7344750a-9209-4a4b-b066-9186888c18c5',
  '/kr/videos/7344750a-9209-4a4b-b066-9186888c18c5',
  '/cn/videos/7344750a-9209-4a4b-b066-9186888c18c5',

  '/videos/f6f6ex47b8ob',
  '/kr/videos/f6f6ex47b8ob',
  '/cn/videos/f6f6ex47b8ob',

  '/videos/d0138f35-f046-4a22-b8f1-8f6e0b279551',
  '/kr/videos/d0138f35-f046-4a22-b8f1-8f6e0b279551',
  '/cn/videos/d0138f35-f046-4a22-b8f1-8f6e0b279551',

  '/videos/86c15ea6-64bd-4859-955b-f62d694064f4',
  '/kr/videos/86c15ea6-64bd-4859-955b-f62d694064f4',
  '/cn/videos/86c15ea6-64bd-4859-955b-f62d694064f4',

  '/videos/1fcaf4bc-268d-43cf-954f-a6f63bc41030',
  '/kr/videos/1fcaf4bc-268d-43cf-954f-a6f63bc41030',
  '/cn/videos/1fcaf4bc-268d-43cf-954f-a6f63bc41030',

  '/videos/ee0f104d-317a-4103-a7e8-dba01fe39c90',
  '/kr/videos/ee0f104d-317a-4103-a7e8-dba01fe39c90',
  '/cn/videos/ee0f104d-317a-4103-a7e8-dba01fe39c90',

  '/videos/7e2dce45-26e0-4c9f-bb31-5441b0533fa7',
  '/kr/videos/7e2dce45-26e0-4c9f-bb31-5441b0533fa7',
  '/cn/videos/7e2dce45-26e0-4c9f-bb31-5441b0533fa7',

  '/videos/13b7918b-193f-46b0-b61a-086255059056',
  '/kr/videos/13b7918b-193f-46b0-b61a-086255059056',
  '/cn/videos/13b7918b-193f-46b0-b61a-086255059056',

  '/videos/23b941da-6cb9-4887-bf9d-385d957c396b',
  '/kr/videos/23b941da-6cb9-4887-bf9d-385d957c396b',
  '/cn/videos/23b941da-6cb9-4887-bf9d-385d957c396b',

  '/videos/81d6348f-97cc-438f-acba-4e957e5f2ddd',
  '/kr/videos/81d6348f-97cc-438f-acba-4e957e5f2ddd',
  '/cn/videos/81d6348f-97cc-438f-acba-4e957e5f2ddd',

  '/videos/d4d40bf7-3bb8-4fc0-b532-7769da5d31dd',
  '/kr/videos/d4d40bf7-3bb8-4fc0-b532-7769da5d31dd',
  '/cn/videos/d4d40bf7-3bb8-4fc0-b532-7769da5d31dd',

  '/videos/560b9184-71e6-4929-875e-3bc861623900',
  '/kr/videos/560b9184-71e6-4929-875e-3bc861623900',
  '/cn/videos/560b9184-71e6-4929-875e-3bc861623900',

  '/videos/b2c8b31b-7dba-48eb-b2c4-e56adde80e28',
  '/kr/videos/b2c8b31b-7dba-48eb-b2c4-e56adde80e28',
  '/cn/videos/b2c8b31b-7dba-48eb-b2c4-e56adde80e28',

  '/videos/64044fa5-58d5-466b-963a-e9b901029ea0',
  '/kr/videos/64044fa5-58d5-466b-963a-e9b901029ea0',
  '/cn/videos/64044fa5-58d5-466b-963a-e9b901029ea0',

  '/videos/64044fa5-58d5-466b-963a-e9b901029ea0',
  '/kr/videos/64044fa5-58d5-466b-963a-e9b901029ea0',
  '/cn/videos/64044fa5-58d5-466b-963a-e9b901029ea0',

  '/videos/dbca61e0-fee3-4e19-98e0-ae5bb4bbe85d',
  '/kr/videos/dbca61e0-fee3-4e19-98e0-ae5bb4bbe85d',
  '/cn/videos/dbca61e0-fee3-4e19-98e0-ae5bb4bbe85d',

  '/videos/4dab490c-c123-4f19-a504-7b323f0c7531',
  '/kr/videos/4dab490c-c123-4f19-a504-7b323f0c7531',
  '/cn/videos/4dab490c-c123-4f19-a504-7b323f0c7531',

  '/videos/edfcf88a-8ac4-4a19-8ccf-d5d09b07da1e',
  '/kr/videos/edfcf88a-8ac4-4a19-8ccf-d5d09b07da1e',
  '/cn/videos/edfcf88a-8ac4-4a19-8ccf-d5d09b07da1e',

  '/videos/057997f7-04f4-4e6d-ba8e-8dff8567068e',
  '/kr/videos/057997f7-04f4-4e6d-ba8e-8dff8567068e',
  '/cn/videos/057997f7-04f4-4e6d-ba8e-8dff8567068e',

  '/videos/3696abd6-a1f7-4310-8a84-bdbe6f6f280b',
  '/kr/videos/3696abd6-a1f7-4310-8a84-bdbe6f6f280b',
  '/cn/videos/3696abd6-a1f7-4310-8a84-bdbe6f6f280b',

  '/videos/814803be-fd35-4599-85a1-2b695ebc3e0b',
  '/kr/videos/814803be-fd35-4599-85a1-2b695ebc3e0b',
  '/cn/videos/814803be-fd35-4599-85a1-2b695ebc3e0b',

  '/videos/814803be-fd35-4599-85a1-2b695ebc3e0b',
  '/kr/videos/814803be-fd35-4599-85a1-2b695ebc3e0b',
  '/cn/videos/814803be-fd35-4599-85a1-2b695ebc3e0b',

  '/videos/493614f4-71d7-46f5-aace-67946ca1bb94',
  '/kr/videos/493614f4-71d7-46f5-aace-67946ca1bb94',
  '/cn/videos/493614f4-71d7-46f5-aace-67946ca1bb94',

  '/videos/1d9a8c03-b9de-4a28-bb1f-1d252113aaec',
  '/kr/videos/1d9a8c03-b9de-4a28-bb1f-1d252113aaec',
  '/cn/videos/1d9a8c03-b9de-4a28-bb1f-1d252113aaec',

  '/videos/6bc48548-ff13-4193-8b85-9c43acd5cf41',
  '/kr/videos/6bc48548-ff13-4193-8b85-9c43acd5cf41',
  '/cn/videos/6bc48548-ff13-4193-8b85-9c43acd5cf41',

  '/videos/70d6ab63-51f5-4bec-917a-7835acd1acad',
  '/kr/videos/70d6ab63-51f5-4bec-917a-7835acd1acad',
  '/cn/videos/70d6ab63-51f5-4bec-917a-7835acd1acad',

  '/videos/dca933a7-c017-4d8d-a140-739fc1546de4',
  '/kr/videos/dca933a7-c017-4d8d-a140-739fc1546de4',
  '/cn/videos/dca933a7-c017-4d8d-a140-739fc1546de4',

  '/videos/ea8a1984-0a6d-4655-95cb-d168c53a5331',
  '/kr/videos/ea8a1984-0a6d-4655-95cb-d168c53a5331',
  '/cn/videos/ea8a1984-0a6d-4655-95cb-d168c53a5331',

  '/videos/2fe57b68-657f-432c-b873-223b8ad8cc74',
  '/kr/videos/2fe57b68-657f-432c-b873-223b8ad8cc74',
  '/cn/videos/2fe57b68-657f-432c-b873-223b8ad8cc74',

  '/videos/a0f90358-be52-465e-996a-64d8f7fb039c',
  '/kr/videos/a0f90358-be52-465e-996a-64d8f7fb039c',
  '/cn/videos/a0f90358-be52-465e-996a-64d8f7fb039c',

  '/videos/0218982c-8164-49f3-b9ad-9101a0a058fb',
  '/kr/videos/0218982c-8164-49f3-b9ad-9101a0a058fb',
  '/cn/videos/0218982c-8164-49f3-b9ad-9101a0a058fb',

  '/videos/75b87d2a-0db5-4201-b446-d3320bd39a20',
  '/kr/videos/75b87d2a-0db5-4201-b446-d3320bd39a20',
  '/cn/videos/75b87d2a-0db5-4201-b446-d3320bd39a20',

  '/videos/cday3381mmae',
  '/kr/videos/cday3381mmae',
  '/cn/videos/cday3381mmae',

  '/videos/xx3kmou0tsu7',
  '/kr/videos/xx3kmou0tsu7',
  '/cn/videos/xx3kmou0tsu7',

  '/videos/05ba2b8d-56af-4fe4-89ff-545bea3ffec1',
  '/kr/videos/05ba2b8d-56af-4fe4-89ff-545bea3ffec1',
  '/cn/videos/05ba2b8d-56af-4fe4-89ff-545bea3ffec1',

  '/videos/6llhovme41ys',
  '/kr/videos/6llhovme41ys',
  '/cn/videos/6llhovme41ys',

  '/videos/ccokvve1qkur',
  '/kr/videos/ccokvve1qkur',
  '/cn/videos/ccokvve1qkur',

  '/videos/thyia4v5bn0o',
  '/kr/videos/thyia4v5bn0o',
  '/cn/videos/thyia4v5bn0o',

  '/videos/yeonwooahh-slime',
  '/kr/videos/yeonwooahh-slime',
  '/cn/videos/yeonwooahh-slime',

  '/videos/7khjfctoxj5o',
  '/kr/videos/7khjfctoxj5o',
  '/cn/videos/7khjfctoxj5o',

  '/videos/0ed7c531-db2d-4014-90c3-e817da7da5f8',
  '/kr/videos/0ed7c531-db2d-4014-90c3-e817da7da5f8',
  '/cn/videos/0ed7c531-db2d-4014-90c3-e817da7da5f8',

  '/videos/mkpc3edy8u67',
  '/kr/videos/mkpc3edy8u67',
  '/cn/videos/mkpc3edy8u67',

  '/videos/bd8261e5-2109-43c9-acab-d538774c288b',
  '/kr/videos/bd8261e5-2109-43c9-acab-d538774c288b',
  '/cn/videos/bd8261e5-2109-43c9-acab-d538774c288b',

  '/videos/79fd5507-40f9-46e5-8888-fb4c8ef7868b',
  '/kr/videos/79fd5507-40f9-46e5-8888-fb4c8ef7868b',
  '/cn/videos/79fd5507-40f9-46e5-8888-fb4c8ef7868b',

  '/videos/bb6d0d7b-0bc0-47c2-99de-d1b64e88ba4f',
  '/kr/videos/bb6d0d7b-0bc0-47c2-99de-d1b64e88ba4f',
  '/cn/videos/bb6d0d7b-0bc0-47c2-99de-d1b64e88ba4f',

  '/videos/54872d34-f562-4879-a09c-457926cc24ef',
  '/kr/videos/54872d34-f562-4879-a09c-457926cc24ef',
  '/cn/videos/54872d34-f562-4879-a09c-457926cc24ef',

  '/videos/81cedc06-72bf-4d9c-8e49-7a386a2ecd94',
  '/kr/videos/81cedc06-72bf-4d9c-8e49-7a386a2ecd94',
  '/cn/videos/81cedc06-72bf-4d9c-8e49-7a386a2ecd94',

  '/videos/c290c28b-2c4f-4dec-8d62-9d4e4558107b',
  '/kr/videos/c290c28b-2c4f-4dec-8d62-9d4e4558107b',
  '/cn/videos/c290c28b-2c4f-4dec-8d62-9d4e4558107b',

  '/videos/2392bed8-6b0a-4a61-a347-4a013564a35c',
  '/kr/videos/2392bed8-6b0a-4a61-a347-4a013564a35c',
  '/cn/videos/2392bed8-6b0a-4a61-a347-4a013564a35c',

  '/videos/dd41a760-8175-4144-aeaa-6d53b8f59063',
  '/kr/videos/dd41a760-8175-4144-aeaa-6d53b8f59063',
  '/cn/videos/dd41a760-8175-4144-aeaa-6d53b8f59063',

  '/videos/3126a6bd-ff96-4eb4-98b3-3cd7fca96098',
  '/kr/videos/3126a6bd-ff96-4eb4-98b3-3cd7fca96098',
  '/cn/videos/3126a6bd-ff96-4eb4-98b3-3cd7fca96098',

  '/videos/8u8bxzmfkpsb',
  '/kr/videos/8u8bxzmfkpsb',
  '/cn/videos/8u8bxzmfkpsb',

  '/videos/4614fca4-9d2f-4d3d-a475-3a7f692860ef',
  '/kr/videos/4614fca4-9d2f-4d3d-a475-3a7f692860ef',
  '/cn/videos/4614fca4-9d2f-4d3d-a475-3a7f692860ef',

  '/videos/6f5a8275-49f1-4d5e-b2f4-8295bd0ab9cf',
  '/kr/videos/6f5a8275-49f1-4d5e-b2f4-8295bd0ab9cf',
  '/cn/videos/6f5a8275-49f1-4d5e-b2f4-8295bd0ab9cf',

  '/videos/4055491e-65f0-4eed-94c2-d772d877d368',
  '/kr/videos/4055491e-65f0-4eed-94c2-d772d877d368',
  '/cn/videos/4055491e-65f0-4eed-94c2-d772d877d368',

  '/videos/a2c5b27c-7937-4505-8ee4-e22d5ec252cc',
  '/kr/videos/a2c5b27c-7937-4505-8ee4-e22d5ec252cc',
  '/cn/videos/a2c5b27c-7937-4505-8ee4-e22d5ec252cc',

  '/videos/l9o690ugi2bw',
  '/kr/videos/l9o690ugi2bw',
  '/cn/videos/l9o690ugi2bw',

  '/videos/2v20yehys1ol',
  '/kr/videos/2v20yehys1ol',
  '/cn/videos/2v20yehys1ol',

  '/videos/l9o690ugi2bw',
  '/kr/videos/l9o690ugi2bw',
  '/cn/videos/l9o690ugi2bw',

  '/videos/njb6tlhh4thl',
  '/kr/videos/njb6tlhh4thl',
  '/cn/videos/njb6tlhh4thl',

  '/videos/28859c2b-353a-4f22-aa7f-007e22af71cb',
  '/kr/videos/28859c2b-353a-4f22-aa7f-007e22af71cb',
  '/cn/videos/28859c2b-353a-4f22-aa7f-007e22af71cb',

  '/videos/6c91dcaf-d8f5-4a97-9bfd-7d70a11e6e34',
  '/kr/videos/6c91dcaf-d8f5-4a97-9bfd-7d70a11e6e34',
  '/cn/videos/6c91dcaf-d8f5-4a97-9bfd-7d70a11e6e34',

  '/videos/9a9c0e10-274e-4b62-9669-c955efb48a94',
  '/kr/videos/9a9c0e10-274e-4b62-9669-c955efb48a94',
  '/cn/videos/9a9c0e10-274e-4b62-9669-c955efb48a94',

  '/videos/6cd5e1fa-5a1c-4696-869b-4aa2b9f3795c',
  '/kr/videos/6cd5e1fa-5a1c-4696-869b-4aa2b9f3795c',
  '/cn/videos/6cd5e1fa-5a1c-4696-869b-4aa2b9f3795c',

  '/videos/65db9262-8fe7-40f1-b4a4-a314c6829e8b',
  '/kr/videos/65db9262-8fe7-40f1-b4a4-a314c6829e8b',
  '/cn/videos/65db9262-8fe7-40f1-b4a4-a314c6829e8b',

  '/videos/66bf22fb-9f9d-4b88-8d58-d45f8d0e8de4',
  '/kr/videos/66bf22fb-9f9d-4b88-8d58-d45f8d0e8de4',
  '/cn/videos/66bf22fb-9f9d-4b88-8d58-d45f8d0e8de4',

  '/videos/b5f0f11a-3a1a-47cd-96c2-e208247579e0',
  '/kr/videos/b5f0f11a-3a1a-47cd-96c2-e208247579e0',
  '/cn/videos/b5f0f11a-3a1a-47cd-96c2-e208247579e0',

  '/videos/344d58dd-3e65-406b-93fa-87adf2d5f822',
  '/kr/videos/344d58dd-3e65-406b-93fa-87adf2d5f822',
  '/cn/videos/344d58dd-3e65-406b-93fa-87adf2d5f822',

  '/bj-list/ahrin',
  '/kr/bj-list/ahrin',
  '/cn/bj-list/ahrin',

  '/bj-list/yeonwooahh',
  '/kr/bj-list/yeonwooahh',
  '/cn/bj-list/yeonwooahh',
  
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

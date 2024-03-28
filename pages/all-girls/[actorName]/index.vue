<template>
  <CardBJBiggerLoading v-if="pendingActor"></CardBJBiggerLoading>
  <CardBJBigger v-else :data="actor" :likesCount="likesCount"></CardBJBigger>
  <div class="flex justify-center mt-4">
    <button class="btn" @click="like">
      <Icon name="mdi:account-minus" size="24" color="#f969d6" v-if="isLiked" />
      <Icon name="mdi:account-plus" size="24" v-else />
    </button>
  </div>
  <div class="sort-wrapper mt-8 mb-2" v-if="!pendingActor && actor?.totalVideos > 5">
    <div class="date-sort" @click="sorVideos('date')" :class="{ active: videoOrder == 'date' }">
      {{ $t("mostRecent") }}
    </div>
    <div class="popular-sort" @click="sorVideos('views')" :class="{ active: videoOrder == 'views' }">
      {{ $t("mostPopular") }}
    </div>
    <div class="likes-sort" @click="sorVideos('likes')" :class="{ active: videoOrder == 'likes' }">
      {{ $t("mostLiked") }}
    </div>
    <div class="vip-sort" @click="sorVideos('vip')" :class="{ active: videoOrder == 'vip' }">
      VIP
    </div>
  </div>

  <div class="cards-wrapper">
    <CardLoading v-for="index in Array.from({ length: 12 }, (v, k) => k + 1)" :key="index" v-if="pending"></CardLoading>
    <Card v-else v-for="(video, index) in videos.videos" :data="video"></Card>
  </div>

  <div v-if="pending" class="text-center">
    <Pagination :totalPages="99999" :currentPage="router.currentRoute.value.query.page
        ? +router.currentRoute.value.query.page
        : 1
      "></Pagination>
  </div>
  <div v-if="!pending" class="text-center">
    <Pagination v-if="+videos.totalPages > 1" :totalPages="+(+videos.totalPages).toFixed(0)" :currentPage="router.currentRoute.value.query.page
        ? +router.currentRoute.value.query.page
        : 1
      "></Pagination>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";

const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);
const { t: $t } = useI18n();
const route = useRoute();
const router = useRouter();
const videoOrder = ref("date");
const queryObject = ref({ ...router.currentRoute.value.query });
const isLiked = ref(false);
const likesCount = ref(0);

const { pendingActor, data: actor } = await useFetch(
  `http://localhost:3030/api/actors/${route.params.actorName}`,
  {
    onResponseError() {
      useNuxtApp().$toast.error($t("loadingError"), {
        autoClose: 5000,
        theme: "colored",
        position: "bottom-center",
      });
    },
  }
);

const {
  pending,
  refresh,
  data: videos,
} = await useLazyFetch(
  () =>
    `http://localhost:3030/api/videos/videosByActor?actor=${route.params.actorName}&limit=12&orderBy=${videoOrder.value}&page=${router.currentRoute.value.query.page}`,
  {
    onResponseError() {
      useNuxtApp().$toast.error($t("loadingError"), {
        autoClose: 5000,
        theme: "colored",
        position: "bottom-center",
      });
    },
  }
);

watch(videoOrder, async (newValue) => {
  // Update the query object
  queryObject.value.orderBy = newValue;
  queryObject.value.page = 1;

  // Update the query parameters in the address bar using the 'replace' method
  await router.replace({
    path: router.currentRoute.value.path,
    query: queryObject.value,
  });

  refresh();
});

watch(
  [actor, accountDetails],
  ([newActor, newAccountDetails]) => {
    if (newActor && newAccountDetails) {
      isLiked.value = newActor.likes.includes(newAccountDetails._id);
      likesCount.value = newActor.likes.length;
    }
  },
  { immediate: true }
);

async function sorVideos(order) {
  videoOrder.value = order;
}

const like = async () => {
  if (!isAccountLoggedIn.value) {
    useNuxtApp().$toast.error($t("loginAccess"), {
      autoClose: 10000,
      theme: "colored",
      position: "bottom-center",
    });
    return;
  }

  isLiked.value = !isLiked.value;

  if (isLiked.value) {
    likesCount.value++;
  } else {
    likesCount.value--;
  }

  try {
    const response = await fetch(
      `http://localhost:3030/api/actors/like/${actor.value._id}`,
      {
        credentials: "include",
      }
    );

    // Check if the fetch was successful
    if (response.ok) {
      if (isLiked.value) {
        useNuxtApp().$toast.success($t("thankFollow"), {
          autoClose: 5000,
          theme: "colored",
          position: "bottom-center",
        });
      } else {
        useNuxtApp().$toast.success($t("successUnfollow"), {
          autoClose: 5000,
          theme: "colored",
          position: "bottom-center",
        });
      }
    } else {
      throw new Error("Failed to like actor");
    }
  } catch (error) {
    useNuxtApp().$toast.error($t("followError"), {
      autoClose: 10000,
      theme: "colored",
      position: "bottom-center",
    });
  }
};

useSeoMeta({
  title: `${actor.value.name} - ${$t("allVideos")} ${router.currentRoute.value.query.page ||
      router.currentRoute.value.query.orderBy
      ? "|"
      : ""
    } ${router.currentRoute.value.query.page
      ? `Page ` + router.currentRoute.value.query.page
      : ""
    } ${router.currentRoute.value.query.orderBy
      ? `Order by  ` + router.currentRoute.value.query.orderBy
      : ""
    } - KBJFree`,
  twitterTitle: `${actor.value.name} - ${$t("allVideos")} ${router.currentRoute.value.query.page ||
      router.currentRoute.value.query.orderBy
      ? "|"
      : ""
    } ${router.currentRoute.value.query.page
      ? `Page ` + router.currentRoute.value.query.page
      : ""
    } ${router.currentRoute.value.query.orderBy
      ? `Order by  ` + router.currentRoute.value.query.orderBy
      : ""
    } - KBJFree`,
  ogTitle: `${actor.value.name} - ${$t("allVideos")} ${router.currentRoute.value.query.page ||
      router.currentRoute.value.query.orderBy
      ? "|"
      : ""
    } ${router.currentRoute.value.query.page
      ? `Page ` + router.currentRoute.value.query.page
      : ""
    } ${router.currentRoute.value.query.orderBy
      ? `Order by  ` + router.currentRoute.value.query.orderBy
      : ""
    } - KBJFree`,
  description: `${actor.value.name} - ${$t("videosFor")}`,
  ogDescription: `${actor.value.name} - ${$t("videosFor")}`,
  twitterDescription: `${actor.value.name} - ${$t("videosFor")}`,
  ogImage: `${actor.value.thumbnail}`,
  twitterImage: `${actor.value.thumbnail}`,
  twitterCard: `summary_large_image`,
});

watch(
  () => route.query,
  () => {
    useSeoMeta({
      title: `${actor.value.name} - ${$t("allVideos")} ${router.currentRoute.value.query.page ||
          router.currentRoute.value.query.orderBy
          ? "|"
          : ""
        } ${router.currentRoute.value.query.page
          ? `Page ` + router.currentRoute.value.query.page
          : ""
        } ${router.currentRoute.value.query.orderBy
          ? `Order by  ` + router.currentRoute.value.query.orderBy
          : ""
        } - KBJFree`,
      twitterTitle: `${actor.value.name} - ${$t("allVideos")} ${router.currentRoute.value.query.page ||
          router.currentRoute.value.query.orderBy
          ? "|"
          : ""
        } ${router.currentRoute.value.query.page
          ? `Page ` + router.currentRoute.value.query.page
          : ""
        } ${router.currentRoute.value.query.orderBy
          ? `Order by  ` + router.currentRoute.value.query.orderBy
          : ""
        } - KBJFree`,
      ogTitle: `${actor.value.name} - ${$t("allVideos")} ${router.currentRoute.value.query.page ||
          router.currentRoute.value.query.orderBy
          ? "|"
          : ""
        } ${router.currentRoute.value.query.page
          ? `Page ` + router.currentRoute.value.query.page
          : ""
        } ${router.currentRoute.value.query.orderBy
          ? `Order by  ` + router.currentRoute.value.query.orderBy
          : ""
        } - KBJFree`,
      description: `${actor.value.name} - ${$t("videosFor")}`,
      ogDescription: `${actor.value.name} - ${$t("videosFor")}`,
      twitterDescription: `${actor.value.name} - ${$t("videosFor")}`,
      ogImage: `${actor.value.thumbnail}`,
      twitterImage: `${actor.value.thumbnail}`,
      twitterCard: `summary_large_image`,
    });
  }
);
</script>

<style scoped lang="scss">
.sort-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #382035;

  div {
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
  }

  div:hover {
    background-color: #382035;
  }

  .date-sort {
    margin-right: 5px;
    padding: 6px 8px;
    position: relative;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
  }

  .popular-sort,
  .likes-sort {
    margin-left: 5px;
    margin-right: 5px;
    padding: 6px 8px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    position: relative;
  }

  .vip-sort {
    margin-left: 5px;
    padding: 6px 8px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    position: relative;
  }

  .active::after {
    content: " ";
    left: 0;
    bottom: -2px;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #f969d6;
  }
}
</style>

<template>
  <div class="left-content" v-if="!pending && !error">
    <h1 class="main-title text-xl my-4">
      {{ video?.name ? video.name : "Loading.." }}
    </h1>

    <div>
      <PhotoSwipeGallery :images="video.files" />
    </div>
<!-- 
    <div class="sources justify-between mt-8">
      <div class="sources">
        <button class="btn btn-sm btn-neutral m-1 btn-disabled">
          <Icon name="mdi:eye" size="18" color="gray" />
          {{ video.views.views }}
        </button>
        <button class="btn btn-sm btn-neutral m-1" @click="like">
          <div class="flex items-center" v-if="!isLiked">
            <Icon name="mdi:heart" size="18" color="gray" class="mr-1" />
            {{ likesCount }}
          </div>
          <div class="flex items-center" v-else>
            <Icon name="mdi:heart" size="18" color="#f969d6" class="mr-1" />
            {{ likesCount }}
          </div>
        </button>
      </div>
    </div> -->

    <p class="mt-8">
      <NuxtLink
        class="btn btn-xs m-1 capitalize text-xs"
        :class="
          tag._id == '643adac05767bb0f8517fec8'
            ? 'btn-warning'
            : 'btn-secondary'
        "
        v-for="(tag, index) in video?.tags"
      >
        {{ tag.name }}
      </NuxtLink>
    </p>

    <div class="text-center mt-2">
      <NuxtLink
        class="inline-block"
        :to="localePath('/bj-list/' + video?.actor.name)"
      >
        <CardBJBigger
          :data="video?.actor"
          :likesCount="video?.actor.likes.length"
        ></CardBJBigger>
      </NuxtLink>
    </div>
    <div class="divider divider-neutral"></div>

    <h3 class="text-center text-xl mt-4 mb-2">{{ $t("seeAlso") }}:</h3>

    <div class="cards-wrapper">
      <CardLoading
        v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
        :key="index"
        v-if="pendingRecommended"
      >
      </CardLoading>
      <Card
        v-else
        v-for="(video, index) in videosRecommended"
        :data="video"
      ></Card>
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

const localePath = useLocalePath();
const { t: $t } = useI18n(); // This is how you destructure the $t function
const headers = useRequestHeaders(["cookie"]);
const route = useRoute();
const sourceSB = ref(true);
const sourceWish = ref(false);
const sourceHide = ref(false);
const sourceVIP = ref(false);
const iframeLoaded = ref(false);
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);
const purchaseClicked = ref(false);
const isPurchasing = ref(false);
const cookieVideoId = useCookie("cookieVideoId");
const cookieValue = cookieVideoId.value || "";
const cookieName = "cookieVideoId";
const estimatedSize = (cookieName.length + cookieValue.length + 1) * 2; // +1 for the equals sign
const isLiked = ref(false);
const likesCount = ref(0);
// const secureVideoUrl = ref(null);
// const fileNamee = ref("");

const changeToSB = () => {
  sourceSB.value = true;
  sourceVIP.value = false;
  sourceHide.value = false;
  sourceWish.value = false;
};

const changeToHide = () => {
  sourceSB.value = false;
  sourceVIP.value = false;
  sourceHide.value = true;
  sourceWish.value = false;
};

const changeToWish = () => {
  sourceSB.value = false;
  sourceVIP.value = false;
  sourceHide.value = false;
  sourceWish.value = true;
};

const changeToVIP = () => {
  if (!isAccountLoggedIn.value) {
    useNuxtApp().$toast.error($t("loginAccess"), {
      autoClose: 10000,
      theme: "colored",
      position: "bottom-center",
    });

    return;
  }

  if (!accountDetails.value.isUserPremium) {
    useNuxtApp().$toast.error($t("vipFeature"), {
      autoClose: 10000,
      theme: "colored",
      position: "bottom-center",
    });

    return;
  }

  if (accountDetails.value.isUserPremium) {
    sourceSB.value = false;
    sourceVIP.value = true;
    sourceHide.value = false;
  }
};

const iframeHasLoaded = () => {
  iframeLoaded.value = true;
};
onMounted(() => {
  const iframe = document.getElementById("custom-iframe");
  setTimeout(() => {
    if (!iframeLoaded.value) {
      iframeHasLoaded();
    }
  }, 250); // Adjust the timeout as necessary
});

const {
  pending,
  data: video,
  error,
} = await useLazyFetch(
  `https://sexkbj.tv/api/galleries/${route.params.id}`,
  {
    credentials: "include",
    headers,
    onResponse(res) {
      console.log(res);
    },
    onResponseError(err) {
      console.log(err);
      if ((err.response._data.error = "Forbidden")) {
        accountInfoStore.triggerAccountLogin(false);
      }
    },
  }
);

// if (!video?.value) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Video Not Found'
//   })
// }

const { pending: pendingRecommended, data: videosRecommended } =
  await useLazyFetch(`https://sexkbj.tv/api/videos/random`, {});

watch(
  [video, accountDetails],
  ([newVideo, newAccountDetails]) => {
    if (newVideo && newAccountDetails) {
      isLiked.value = newVideo.likes.includes(newAccountDetails._id);
      likesCount.value = newVideo.likes.length;
      // fileNamee.value = newVideo.fileName;
      if (estimatedSize > 3000) {
        cookieVideoId.value = null;
      }

      if (cookieVideoId?.value) {
        if (!cookieVideoId.value.includes(route.params.id)) {
          cookieVideoId.value += route.params.id;
        }
      } else {
        cookieVideoId.value = route.params.id;
      }

      useSeoMeta({
        title: `${newVideo.name} - SexKBJ`,
        twitterTitle: `${newVideo.name} - SexKBJ`,
        ogTitle: `${newVideo.name} - SexKBJ`,
        description: `${newVideo.name} - ${newVideo.actor.name} - ${$t(
          "highQuality"
        )}`,
        ogDescription: `${newVideo.name} - ${newVideo.actor.name} - ${$t(
          "highQuality"
        )}`,
        twitterDescription: `${newVideo.name} - ${newVideo.actor.name} - ${$t(
          "highQuality"
        )}`,
        ogImage: `${newVideo.thumbnail}`,
        twitterImage: `${newVideo.thumbnail}`,
        twitterCard: `summary_large_image`,
      });
    }
  },
  { immediate: true }
);

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

  fetch(`https://sexkbj.tv/api/videos/like/${video.value._id}`, {
    credentials: "include",
  });
};

async function purchaseVideo() {
  if (isPurchasing.value) return; // Prevents multiple calls if already in progress
  isPurchasing.value = true; // Disable the button

  try {
    const response = await $fetch(
      `https://sexkbj.tv/api/users/purchaseVideo`,
      {
        method: "POST",
        body: {
          userId: accountDetails.value._id,
          videoId: video.value._id,
          creditCost: video.value.cost,
        },
      }
    );

    if (response.error) {
      // Show toast message for error
      useNuxtApp().$toast.error(response.error, {
        autoClose: 10000,
        theme: "colored",
        position: "bottom-center",
      });
    } else {
      // If no error, update account info
      await $fetch(`https://sexkbj.tv/api/users/getInfo`, {
        server: false,
        credentials: "include",
        onResponse(res) {
          accountInfoStore.updateAccountInfo(res.response._data.userDB);
        },
      });

      // Optionally, show a success toast message
      useNuxtApp().$toast.success($t("successPurchase"), {
        autoClose: 4000,
        theme: "colored",
        position: "bottom-center",
      });
    }
  } catch (e) {
    useNuxtApp().$toast.error(
      `An error occurred while making the purchase. ${e?.response?._data?.error}!`,
      {
        autoClose: 10000,
        theme: "colored",
        position: "bottom-center",
      }
    );
    await $fetch(`https://sexkbj.tv/api/users/getInfo`, {
      server: false,
      credentials: "include",
      onResponse(res) {
        accountInfoStore.updateAccountInfo(res.response._data.userDB);
      },
    });
  } finally {
    isPurchasing.value = false; // Re-enable the button
  }
}

if (video.value && video.value.actor) {
  useSeoMeta({
    title: `${video.value.name} - SexKBJ`,
    twitterTitle: `${video.value.name} - SexKBJ`,
    ogTitle: `${video.value.name} - SexKBJ`,
    description: `${video.value.name} - ${video.value.actor.name} - ${$t(
      "highQuality"
    )}`,
    ogDescription: `${video.value.name} - ${video.value.actor.name} - ${$t(
      "highQuality"
    )}`,
    twitterDescription: `${video.value.name} - ${video.value.actor.name} - ${$t(
      "highQuality"
    )}`,
    ogImage: `${video.value.thumbnail}`,
    twitterImage: `${video.value.thumbnail}`,
    twitterCard: `summary_large_image`,
  });
}
</script>

<style scoped lang="scss">
.player-wrapper {
  padding-top: 56.25%;
  width: 100%;

  .main-player {
    border: none;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 0.1s ease;

    &.is-loaded {
      opacity: 1;
    }
  }
}

.custom-coin {
  display: flex;
  align-items: center;

  img {
    margin-left: 4px;
    max-width: 100%;
    max-height: calc(100% - 4px);
  }
}

.sources {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.modal-box .snapshots img {
  width: 100%;
  max-width: 300px;
}
</style>

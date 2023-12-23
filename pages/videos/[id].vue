<template>
  <PlayerSkeletonError v-if="error"> </PlayerSkeletonError>
  <PlayerSkeleton v-if="pending"> </PlayerSkeleton>
  <div class="left-content" v-if="!pending && !error">
    <div class="player-wrapper relative mt-10 skeleton bg-base-200" style="overflow: hidden" v-if="video.tags.some((tag) => tag.name === 'vip') &&
      !accountDetails.isUserPremium
      ">
      <img class="main-player absolute bg-base-200" :src="video.thumbnail" :alt="video.name"
        style="filter: blur(15px); opacity: 1; object-fit: cover" />
      <div class="vip-upgrade-container absolute toast toast-center toast-middle">
        <div class="alert" v-if="isAccountLoggedIn">
          <span>{{ $t("requiresVipAccess") }}</span>
          <button class="btn btn-warning btn-sm" onclick="my_modal_1.showModal()">
            {{ $t("upgradeToVip") }}
          </button>
        </div>
        <div class="alert" v-else>
          <span> {{ $t("youNeedLogin") }}</span>
          <NuxtLink :to="localePath('/login')" class="btn btn-sm btn-secondary">{{ $t("login") }}</NuxtLink>
          <NuxtLink :to="localePath('/register')" class="btn btn-sm btn-secondary">{{ $t("register") }}</NuxtLink>
        </div>
      </div>
    </div>

    <div class="player-wrapper relative mt-10 skeleton bg-base-200" style="overflow: hidden" v-if="video.cost > 0 && !accountDetails.purchasedVideos.includes(video._id)
      ">
      <img class="main-player absolute bg-base-200" :src="video.thumbnail" :alt="video.name"
        style="filter: blur(15px); opacity: 1; object-fit: cover" />
      <div class="vip-upgrade-container absolute toast toast-center toast-middle">
        <div class="alert max-w-xl flex flex-wrap text-center justify-center" v-if="isAccountLoggedIn">
          <div class="badge w-16 badge-outline badge-warning custom-coin">
            {{ video.cost }} <IconsCoin></IconsCoin>
          </div>

          <span>{{ $t("purchaseVideo") }}</span>
          <button class="btn btn-secondary btn-sm" onclick="my_modal_2.showModal()"
            v-if="isAccountLoggedIn && accountDetails.credit < video.cost">
            {{ $t("purchaseCoins") }}
          </button>
          <div v-else-if="isAccountLoggedIn">
            <button class="btn btn-sm btn-outline btn-warning purchase-button-link" v-if="!purchaseClicked"
              @click="purchaseClicked = true">
              {{ $t("purchaseVideoBTN") }}
            </button>
            <div v-else>
              {{ $t("areYouSure") }}
              <button class="btn btn-sm btn-outline btn-success purchase-button-link mr-2" @click="purchaseVideo"
                :disabled="isPurchasing">
                {{ $t("yes") }}
              </button>
              <button class="btn btn-sm btn-outline btn-error purchase-button-link red-btt"
                @click="purchaseClicked = false">
                {{ $t("no") }}
              </button>
            </div>
          </div>
        </div>
        <div class="alert" v-else>
          <span> {{ $t("youNeedLogin") }}</span>
          <NuxtLink :to="localePath('/login')" class="btn btn-sm btn-secondary">{{ $t("login") }}</NuxtLink>
          <NuxtLink :to="localePath('/register')" class="btn btn-sm btn-secondary">{{ $t("register") }}</NuxtLink>
        </div>
      </div>
    </div>

    <div class="player-wrapper relative mt-10 skeleton bg-base-200" v-if="!(
        video.tags.some((tag) => tag.name === 'vip') &&
        !accountDetails.isUserPremium
      ) &&
      !(video.cost > 0 && !accountDetails.purchasedVideos.includes(video._id))
      ">
      <iframe id="custom-iframe" :src="'https://iframe.mediadelivery.net/embed/141502/' + route.params.id
        " loading="lazy" class="main-player absolute bg-base-200" :class="{ 'is-loaded': iframeLoaded }"
        @load="iframeHasLoaded" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        v-if="sourceSB && video.createdAt > '2023-07-26T00:19:34.582Z'" allowfullscreen="true"></iframe>
      <iframe id="custom-iframe" :src="'https://sbhight.com/e/' + route.params.id + '.html'" loading="lazy"
        class="main-player absolute bg-base-200" :class="{ 'is-loaded': iframeLoaded }" @load="iframeHasLoaded"
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        v-if="sourceSB && video.createdAt <= '2023-07-26T00:19:34.582Z'" allowfullscreen="true"></iframe>
      <iframe id="custom-iframe" :src="'https://guccihide.com/e/' + video.uploadID2" loading="lazy"
        class="main-player absolute bg-base-200" :class="{ 'is-loaded': iframeLoaded }" @load="iframeHasLoaded"
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        v-if="sourceHide && video.createdAt <= '2023-07-26T00:19:34.582Z'" allowfullscreen="true"></iframe>
      <iframe id="custom-iframe" :src="'https://streamwish.to/e/' + video.uploadID3" loading="lazy"
        class="main-player absolute bg-base-200" :class="{ 'is-loaded': iframeLoaded }" @load="iframeHasLoaded"
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        v-if="sourceWish && video.createdAt <= '2023-07-26T00:19:34.582Z'" allowfullscreen="true"></iframe>
      <PremiumPlayer v-if="sourceVIP" :source="'https://skbjvid.b-cdn.net/videos/' + video.fileName"></PremiumPlayer>
    </div>
    <div class="sources justify-between">
      <div class="sources">
        <button class="btn btn-sm btn-neutral m-1" @click="changeToSB">
          Source 1
        </button>
        <button class="btn btn-sm btn-neutral m-1" @click="changeToHide" v-if="video.createdAt >= '2023-05-02T05:55:10.089+00:00' &&
          video.createdAt <= '2023-07-26T00:19:34.582Z'
          ">
          Source 2
        </button>
        <button class="btn btn-sm btn-neutral m-1" @click="changeToWish" v-if="video.createdAt >= '2023-05-10T06:08:02.528+00:00' &&
          video.createdAt <= '2023-07-26T00:19:34.582Z'
          ">
          Source 3
        </button>
        <button class="btn btn-sm btn-neutral m-1" @click="changeToVIP"
          v-if="video.createdAt >= '2023-05-01T22:07:18.813+00:00'">
          VIP Source
        </button>
      </div>
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
    </div>

    <h1 class="main-title text-xl my-1">
      {{ video?.name ? video.name : "Loading.." }}
    </h1>
    <p>
      <NuxtLink class="btn btn-xs m-1 capitalize text-xs" :class="tag._id == '643adac05767bb0f8517fec8'
          ? 'btn-warning'
          : 'btn-secondary'
        " v-for="(tag, index) in video?.tags">
        {{ tag.name }}
      </NuxtLink>
    </p>

    <div class="text-center mt-2">
      <NuxtLink class="inline-block" :to="localePath('/bj-list/' + video?.actor.name)">
        <CardBJBigger :data="video?.actor" :likesCount="video?.actor.likes.length"></CardBJBigger>
      </NuxtLink>
    </div>
    <div class="divider divider-neutral"></div>

    <h3 class="text-center text-xl mt-4 mb-2">{{$t("seeAlso")}}:</h3>

    <div class="cards-wrapper">
      <CardLoading v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)" :key="index" v-if="pendingRecommended">
      </CardLoading>
      <Card v-else v-for="(video, index) in videosRecommended" :data="video"></Card>
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

const { pending, data: video, error } = await useLazyFetch(
  `https://sexkbj.tv/api/videos/${route.params.id}`,
  {
    credentials: "include",
    headers,
    onResponseError(err) {
      if ((err.response._data.error = "Forbidden")) {
        accountInfoStore.triggerAccountLogin(false);
      }
    },
  },
);

// if (!video?.value) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Video Not Found'
//   })
// }

const { pending: pendingRecommended, data: videosRecommended } =
  await useLazyFetch(`https://sexkbj.tv/api/videos/random`, {
  });

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
      description: `${newVideo.name} - ${newVideo.actor.name} - ${$t("highQuality")}`,
      ogDescription: `${newVideo.name} - ${newVideo.actor.name} - ${$t("highQuality")}`,
      twitterDescription: `${newVideo.name} - ${newVideo.actor.name} - ${$t("highQuality")}`,
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

// function generateSecureUrl() {
//   const path = `/videos/${fileNamee.value}`;
//   // const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
//   // const secret = "4048154d-7385-440a-bdb2-bbdda57c0619";

//   // // Construct the base string to hash
//   // const baseString = secret + path + expirationTime;

//   // // Generate the raw SHA256 hash
//   // let tokenHash = crypto.SHA256(baseString);

//   // // Convert to Base64
//   // tokenHash = crypto.enc.Base64.stringify(tokenHash);

//   // // Replace certain characters in the resulting Base64 string
//   // tokenHash = tokenHash
//   //   .replace("\n", "")
//   //   .replace("+", "-")
//   //   .replace("/", "_")
//   //   .replace("=", "");

//   // Construct the secure URL
//   // return `https://skbjvid.b-cdn.net${path}?token=${tokenHash}&expires=${expirationTime}`;
//   return `https://skbjvid.b-cdn.net${path}`;
// }

// onMounted(() => {
//   secureVideoUrl.value = generateSecureUrl();

// });

if (video.value && video.value.actor) {
  useSeoMeta({
  title: `${video.value.name} - SexKBJ`,
  twitterTitle: `${video.value.name} - SexKBJ`,
  ogTitle: `${video.value.name} - SexKBJ`,
  description: `${video.value.name} - ${video.value.actor.name} - ${$t("highQuality")}`,
  ogDescription: `${video.value.name} - ${video.value.actor.name} - ${$t("highQuality")}`,
  twitterDescription: `${video.value.name} - ${video.value.actor.name} - ${$t("highQuality")}`,
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
</style>

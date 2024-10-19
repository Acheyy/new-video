<template>
  <div class="info-box mt-4 mx-auto" style="width: 600px">
    <p style="font-weight: bold;">Information:</p>
    <p class="mt-2">
      First spin is guaranteed to get a video with a value higher than 150 coins
    </p>
    <p class="mt-2">
      You can win any video from the
      <NuxtLink
        :to="localePath('/special-sales')"
        class="text-bold text-primary"
      >
        {{ $t("specialSales") }}</NuxtLink
      >
      page, with a totally random chance
    </p>
    <p class="mt-2">
      If you have already purchased the video that you won, you will get
      rewarded the cost of the video in coins
    </p>
    <p class="mt-2">
      ! Do not leave this page while the wheel is spinning. If you leave the page the coins will be lost !
    </p>
  </div>
  <div v-if="isAccountLoggedIn">
    <p class="text-center mt-8">
      Your current Coins:
      <span class="badge badge-accent">{{ accountDetails.credit }}</span>
    </p>

    <Roulette @spinning="handleSpinning" @result="handleResult" />
    <!-- <div v-if="result">
      <p>Result: {{ result.name }}</p>
      <img :src="result.thumbnail" alt="Result Thumbnail" width="100" />
      <p>Cost: ${{ result.cost }}</p>
    </div> -->
  </div>
  <div v-else class="text-center mt-10">
    Please login to access this feature
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const token = useCookie("token");

const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

const spinning = ref(false);
const result = ref(null);

const handleSpinning = (isSpinning) => {
  spinning.value = isSpinning;
};

const handleResult = async (winningItem) => {
  result.value = winningItem;
  spinning.value = false;

  try {
    const response = await $fetch(
      "https://skbj.tv/api/users/addVideoReward",
      {
        method: "POST",
        body: {
          userId: accountDetails.value._id,
          videoId: winningItem._id,
          creditCost: winningItem.cost,
        },
      }
    );

    if (response.success) {
      await useLazyFetch(`https://skbj.tv/api/users/getInfo`, {
        server: false,
        credentials: "include",

        onResponse(res) {
          if (res.response._data.error !== "Forbidden") {
            accountInfoStore.updateAccountInfo(res.response._data.userDB);
            accountInfoStore.triggerAccountLogin(true);
          } else {
            accountInfoStore.triggerAccountLogin(false);
            token.value = null;
          }
        },
        onResponseError(err) {
          if ((err.response._data.error = "Forbidden")) {
            accountInfoStore.triggerAccountLogin(false);
          }
        },
      });

      useNuxtApp().$toast.success(response.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
        theme: "colored",
        position: "bottom-center",
      });
      // Place your conditional logic here based on the successful response
    } else {
      console.error("Failed to add video reward:", response.message);
      // Place your conditional logic here based on the failure response
    }
  } catch (error) {
    console.error("Error during API call:", error);
    // Place your error handling logic here
  }
};
</script>

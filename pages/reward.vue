<template>
  <p class="text-center mt-12">{{ $t("rewardValue") }}</p>
  <p class="text-center">{{ $t("doNotClose") }}</p>
  <div class="text-center mt-4">
    <button
      v-if="isAccountLoggedIn && accountDetails.isUserPremium"
      :class="[
        'btn',
        'margin',
        'mt-4',
        { 'btn-disabled': isCountingDown || isClaimed || isTimeRestricted },
      ]"
      @click="startCountdown"
      :disabled="isCountingDown || isClaimed || isTimeRestricted"
    >
      {{ buttonText }}
    </button>
    <p v-else-if="!isAccountLoggedIn">
      {{ $t("loginToClaim") }}
    </p>
    <p v-else-if="!accountDetails.isUserPremium">
      {{ $t("upgradeToVipClaim") }}
    </p>
  </div>

  <div class="ads flex flex-wrap justify-center mt-36">
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323282&size=300x500"
      width="300"
      height="500"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323282&size=300x500"
      width="300"
      height="500"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
    <iframe
      src="//a.magsrv.com/iframe.php?idzone=5323276&size=300x250"
      width="300"
      height="250"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNuxtApp } from "#app";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const token = useCookie("token");
const { t: $t } = useI18n(); // This is how you destructure the $t function
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

const countdownTime = ref(60); // Default to 5 seconds
const isCountingDown = ref(false);
const isClaimed = ref(false);
const isTimeRestricted = ref(false);

const buttonText = computed(() => {
  const now = new Date();
  const lastClaim = new Date(accountDetails.value.lastRewardClaim);
  const timeDifference = now - lastClaim;
  const hoursDifference = timeDifference / 36e5; // Difference in hours

  if (isClaimed.value) {
    return "Claimed";
  } else if (isCountingDown.value) {
    return `Please wait ${countdownTime.value} seconds`;
  } else if (hoursDifference < 24) {
    const nextClaimTime = new Date(lastClaim.getTime() + 24 * 60 * 60 * 1000);
    isTimeRestricted.value = true;
    return `Claim available ${timeAgo.format(nextClaimTime)}`;
  } else {
    isTimeRestricted.value = false;
    return "Claim COINS";
  }
});

const startCountdown = () => {
  if (!isCountingDown.value && !isClaimed.value && !isTimeRestricted.value) {
    isCountingDown.value = true;
    let interval = setInterval(() => {
      countdownTime.value -= 1;
      if (countdownTime.value <= 0) {
        clearInterval(interval);
        isCountingDown.value = false;
        isClaimed.value = true;
        countdownTime.value = 5; // Reset to default 5 seconds
        claimReward();
      }
    }, 1000);
  }
};

const claimReward = async () => {
  try {
    const response = await fetch(
      "https://skbj.tv/api/users/rewardClaim",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: accountDetails.value._id,
          lastRewardClaim: accountDetails.value.lastRewardClaim,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Reward claimed successfully:", data);

    if (token.value) {
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
    }

    // Show success toast
    useNuxtApp().$toast.success($t("successClaim"), {
      autoClose: 3000,
      dangerouslyHTMLString: true,
      theme: "colored",
      position: "bottom-center",
    });
  } catch (error) {
    console.error("Error claiming reward:", error);

    // Show error toast
    useNuxtApp().$toast.error($t("errorClaim"), {
      autoClose: 5000,
      dangerouslyHTMLString: true,
      theme: "colored",
      position: "bottom-center",
    });
  }
};
</script>

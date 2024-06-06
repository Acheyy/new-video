<template>
  <div class="flex flex-col items-center">
    <button @click="handleAmountSelection(500,45)" class="btn btn-secondary my-2 w-96 relative">
      500 <IconsCoin></IconsCoin> = 45$
      <div class="discount badge badge-warning">-10%</div>
    </button>
    <button @click="handleAmountSelection(1000,85)" class="btn btn-secondary my-2 w-96 relative">
      1.000 <IconsCoin></IconsCoin> = 85$
      <div class="discount badge badge-warning">-15%</div>
    </button>
    <button @click="handleAmountSelection(2000,150)" class="btn btn-secondary my-2 w-96 relative">
      2.000 <IconsCoin></IconsCoin> = 150$
      <div class="discount badge badge-warning">-25%</div>
    </button>
    <button @click="handleAmountSelection(5000,300)" class="btn btn-secondary my-2 w-96 relative">
      5.000 <IconsCoin></IconsCoin> = 300$
      <div class="discount badge badge-warning">-40%</div>
    </button>

    <dialog id="my_modal_4" class="modal">
      <div class="modal-box text-center">
        <h3 class="font-bold text-lg">Buy {{coinsAmountVal}} Coins!</h3>
        <div v-if="currentView === 1">
          <button
            @click="handleBitcoinPayment('btc')"
            class="btn btn-primary mt-4 mx-auto w-64"
          >
            Bitcoin (BTC)
          </button>
          <button
            @click="handleBitcoinPayment('usdttrc20')"
            class="btn btn-primary mt-4 mx-auto w-64"
          >
            USDT (TRC20)
          </button>
          <button
            @click="handleBitcoinPayment('eth')"
            class="btn btn-primary mt-4 mx-auto w-64"
          >
            Ethereum (ETH)
          </button>
        </div>
        <!-- Third div, shown when currentView is 2 -->
        <div v-if="currentView === 2" class="py-8">
          <p v-if="paymentDetails">
            Please transfer ${{usdAmountVal}} (as specified in the 'Amount' section below) to
            the designated Payment Address. Your account will be automatically
            updated, typically within 5-10 minutes. Note that this process may
            take longer during periods of high network activity.
          </p>
          <p v-if="paymentDetails">
            Payment Address:
            <span class="text-primary font-bold">{{
              paymentDetails.pay_address
            }}</span>
          </p>
          <p v-if="paymentDetails">
            Amount:
            <span class="text-primary font-bold">{{
              paymentDetails.pay_amount
            }}</span>
          </p>
          <p v-if="paymentDetails">
            Status:
            <span class="text-primary font-bold">{{
              paymentDetails.payment_status
            }}</span>
          </p>
          <p v-if="paymentDetails">
            You need to cover the network fees. If the status is
            'partially_paid' it means you didn't send the correct amount to
            cover the network fees ! You can always contact us at
            contact@kbjfree.tv for more information
          </p>
          <p v-if="paymentDetails">
            <img
              class="mt-8 mx-auto"
              style="margin-left: auto; max-width: 100%; max-height: 100%;"
              :src="
                'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' +
                paymentDetails.pay_address
              "
            />
          </p>
          <p v-else>Loading payment details...</p>
        </div>
        <div class="modal-action">
          <!-- Back button is shown when currentView is 1 or 2 -->
          <button @click="handleBack" class="btn" v-if="currentView > 1">
            {{ $t("back") }}
          </button>
          <form method="dialog">
            <button class="btn">{{ $t("close") }}</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  <!-- <button @click="createPayment" class="btn">Create payment</button> -->
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { ref, onUnmounted } from "vue";
import { useFetch } from "nuxt/app";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n(); // This is how you destructure the $t function
const accountInfoStore = useAccountInfo();
const { accountDetails } = storeToRefs(accountInfoStore);
const paymentDetails = ref(null);
const pollingInterval = 5000; // 5 seconds
let pollingTimer = null;
const currentView = ref(1);
const coinsAmountVal = ref(0);
const usdAmountVal = ref(0);

const handleAmountSelection = (coinsAmount, usdAmount) => {
    coinsAmountVal.value = coinsAmount;
    usdAmountVal.value = usdAmount;
    document.getElementById("my_modal_4").showModal();
}

const handleBitcoinPayment = async (currency, coinsAmount, usdAmount) => {
  currentView.value = 2; // Move to the third div
  const { data, error } = await useFetch("https://kbjfree.tv/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userID: accountDetails.value._id,
      currency: currency,
      purchasedItem: `Coins ${coinsAmountVal.value}`,
      payAmount: usdAmountVal.value,
    },
  });

  if (data.value && !error.value) {
    paymentDetails.value = data.value;
    startPolling(paymentDetails.value._id);
  } else {
    // Handle error appropriately
    console.error("Failed to fetch payment details:", error.value);
  }
};

const startPolling = (paymentId) => {
  pollingTimer = setInterval(async () => {
    const { data: statusData, error: statusError } = await useFetch(
      `https://kbjfree.tv/api/payments/${paymentId}`,
      {
        method: "GET",
      }
    );

    if (statusData.value && !statusError.value) {
      paymentDetails.value.payment_status = statusData.value.status;

      if (statusData.value.status === "finished") {
        document.getElementById("my_modal_1").close();
        clearInterval(pollingTimer);
        accountDetails.value.isUserPremium = true;
        useNuxtApp().$toast.success($t("successPurchase"), {
          autoClose: 3000,
          dangerouslyHTMLString: true,
          theme: "colored",
          position: "bottom-center",
        });
      } else if (
        statusData.value.status === "confirmed" ||
        statusData.value.status === "failed"
      ) {
        clearInterval(pollingTimer);
      }
    } else {
      console.error("Failed to fetch payment status:", statusError.value);
    }
  }, pollingInterval);
};

onUnmounted(() => {
  if (pollingTimer) {
    clearInterval(pollingTimer);
  }
});

const handleBack = () => {
  if (currentView.value === 2) {
    // Reset payment details when moving back from the third div
    paymentDetails.value = null;
  }
  if (currentView.value > 0) {
    currentView.value--;
  }
  if (pollingTimer && currentView.value === 2) {
    clearInterval(pollingTimer);
  }
};


</script>

<style lang="scss" scoped>
img {
  margin-left: 0;
  max-width: 20px;
  max-height: calc(100% - 4px);
}

.discount {
  position: absolute;
  right: -16px;
  top: -2px;
  padding: 4px;
  border-radius: 14px;
  transform: rotate(25deg);
  font-size: 14px;
}
</style>

<template>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box text-center">
      <h3 class="font-bold text-lg">{{ $t("upgradeToVip") }}!</h3>
      <!-- First div, shown initially -->
      <div v-if="currentView === 0">
        <a
          :href="
            'https://securekeybj.tech/send-checkout?customerId=' +
            accountDetails._id +
            '&product=plugingpt'
          "
          target="_blank"
          class="btn btn-primary mt-4 mx-auto w-64"
          >STRIPE (30 days) 5$</a
        >
        <button
        @click="handleVIPSelection(180, 25)"
          class="btn btn-primary mt-4 mx-auto w-64 relative"
        >
          CRYPTO (180 days) 25$
          <div class="discount badge badge-warning">-5$</div>
        </button>
        <button
        @click="handleVIPSelection(360, 45)"
          class="btn btn-primary mt-4 mx-auto w-64 relative"
        >
          CRYPTO (360 days) 45$
          <div class="discount badge badge-warning">-15$</div>
        </button>
      </div>
      <!-- Second div, shown when currentView is 1 -->
      <div v-if="currentView === 1">
        {{ daysAmountVal }}
        <p class="mt-4">{{ $t("minimumPay") }}</p>
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
        <p v-if="paymentDetails" class="mb-4">
          Please transfer ${{usdAmountVal}} (as specified in the 'Amount' section below) to
          the designated Payment Address. Your account will be automatically
          upgraded, typically within 5-10 minutes. Note that this process may
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
        <p v-if="paymentDetails" class="mb-4">
          Status:
          <span class="text-primary font-bold">{{
            paymentDetails.payment_status
          }}</span>
        </p>
        <p v-if="paymentDetails">
          You need to cover the network fees. If the status is 'partially_paid'
          it means you didn't send the correct amount to cover the network fees! 
          You can always contact us at contact@skbj.tv for help or more information
        </p>
        <p v-if="paymentDetails">
          <img
            class="mt-8 mx-auto"
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
        <button @click="handleBack" class="btn" v-if="currentView > 0">
          {{ $t("back") }}
        </button>
        <form method="dialog">
          <button class="btn">{{ $t("close") }}</button>
        </form>
      </div>
    </div>
  </dialog>
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
const currentView = ref(0);
const paymentDetails = ref(null);
const pollingInterval = 5000; // 5 seconds
let pollingTimer = null;
const daysAmountVal = ref(0);
const usdAmountVal = ref(0);


const handleVIPSelection = (daysAmount, usdAmount) => {
  currentView.value = 1;
  daysAmountVal.value = daysAmount;
  usdAmountVal.value = usdAmount;
}


const handleBitcoinPayment = async (currency) => {
  currentView.value = 2; // Move to the third div
  const { data, error } = await useFetch("http://localhost:3030/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userID: accountDetails.value._id,
      currency: currency,
      purchasedItem: `VIP ${daysAmountVal.value}`,
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
      `http://localhost:3030/api/payments/${paymentId}`,
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

<style lang="css" scoped>
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

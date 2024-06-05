<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box text-center">
      <h3 class="font-bold text-lg">{{ $t("purchaseCoins") }}!</h3>
      <div class="flex flex-col items-center">
        <a
          :href="
            'https://securekeybj.tech/send-checkout?customerId=' +
            accountDetails._id +
            '&product3=mysteryxtrasmall'
          "
          class="btn btn-secondary my-2 w-80"
          target="_blank"
        >
          50 <IconsCoin></IconsCoin> = 5$
        </a>
        <a
          :href="
            'https://securekeybj.tech/send-checkout?customerId=' +
            accountDetails._id +
            '&product3=mysterysmallbundle'
          "
          class="btn btn-secondary my-2 w-80"
          target="_blank"
        >
          100 <IconsCoin></IconsCoin> = 10$
        </a>
        <a
          :href="
            'https://securekeybj.tech/send-checkout?customerId=' +
            accountDetails._id +
            '&product3=mysterybundle'
          "
          class="btn btn-secondary my-2 w-80 relative"
          target="_blank"
        >
          500 <IconsCoin></IconsCoin> = 45$
          <div class="discount badge badge-warning">-10%</div>
        </a>
        <a
          :href="
            'https://securekeybj.tech/send-checkout?customerId=' +
            accountDetails._id +
            '&product3=mysterybigbundle'
          "
          class="btn btn-secondary my-2 w-80 relative"
          target="_blank"
        >
          1.000 <IconsCoin></IconsCoin> = 85$
          <div class="discount badge badge-warning">-15%</div>
        </a>
        <a
          :href="
            'https://securekeybj.tech/send-checkout?customerId=' +
            accountDetails._id +
            '&product3=mysteryxtrabig'
          "
          class="btn btn-secondary my-2 w-80 relative"
          target="_blank"
        >
          2.000 <IconsCoin></IconsCoin> = 150$
          <div class="discount badge badge-warning">-25%</div>
        </a>
        <NuxtLink
          :to="localePath('/crytpto-payment/')"
          class="btn btn-secondary my-4 w-80 relative"
          onclick="document.getElementById('my_modal_2').close()"
        >
          Buy with CRYPTO
          <div class="discount badge badge-warning">Up to -40%</div>
        </NuxtLink>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">{{ $t("close") }}</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const localePath = useLocalePath();

const accountInfoStore = useAccountInfo();
const { accountDetails } = storeToRefs(accountInfoStore);
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

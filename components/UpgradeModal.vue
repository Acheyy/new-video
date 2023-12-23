<template>
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box text-center">
            <h3 class="font-bold text-lg">{{ $t("upgradeToVip") }}!</h3>
            <a :href="'https://securekeybj.tech/send-checkout?customerId=' +
                accountDetails._id +
                '&product2=plugingpt'" target="_blank" class="btn btn-primary mt-4 mx-auto w-64">STRIPE</a>
            <p class="py-4 text-sm">{{ $t("morePaymentsSoon") }}</p>
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
const accountInfoStore = useAccountInfo();
const { accountDetails } = storeToRefs(accountInfoStore);
</script>

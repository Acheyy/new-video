<template>
    <div v-if="isAccountLoggedIn">
        <div class="profile-section flex justify-center mt-20 bg-base-200 py-4 mb-10">
            <div class="right-side">
                <div>
                    {{ $t("username") }}: <strong>{{ accountDetails.userName }}</strong>
                </div>
                <div>
                    {{ $t("email") }}: <strong>{{ accountDetails.email }}</strong>
                </div>
                <div>
                    {{ $t("coins") }}: <strong>{{ accountDetails.credit }}</strong>
                </div>
                <div>
                    {{ $t("isAccountVIP") }}:
                    <strong>{{ accountDetails.isUserPremium }}</strong>
                </div>
                <!-- <UpgradeToPremiumButton v-if="!accountDetails.isUserPremium"></UpgradeToPremiumButton> -->
                <div class="mt-2" >
                    {{$t("vipExpires")}}:
                    <strong>{{ timeAgo.format(new Date(accountDetails?.premiumExpiry)) }}</strong>
                </div>
            </div>
        </div>

        <h2 class="text-center text-lg mb-4">{{ $t("yourLikedVideos") }}:</h2>

        <div class="cards-wrapper mb-2">
            <CardLoading v-for="index in Array.from({ length: 20 }, (v, k) => k + 1)" :key="index" v-if="pendingLiked">
            </CardLoading>
            <Card v-else v-for="(video, index) in videosLiked.videos" :data="video"></Card>
        </div>
        <div v-if="pendingLiked" class="text-center">
            <Pagination :totalPages="99999" :currentPage="router.currentRoute.value.query.page
                ? +router.currentRoute.value.query.page
                : 1
                "></Pagination>
        </div>
        <div v-if="!pendingLiked" class="text-center">
            <Pagination v-if="+videosLiked.totalPages > 1" :totalPages="+(+videosLiked.totalPages).toFixed(0)" :currentPage="router.currentRoute.value.query.page
                ? +router.currentRoute.value.query.page
                : 1
                "></Pagination>
        </div>

        <h2 class="text-center text-lg mb-4 mt-10">{{ $t("recentlyWatched") }}:</h2>

        <div class="cards-wrapper mb-2">
            <CardLoading v-for="index in Array.from({ length: 20 }, (v, k) => k + 1)" :key="index" v-if="pending">
            </CardLoading>
            <Card v-else v-for="(video, index) in videosHistory.videos" :data="video"></Card>
        </div>

    </div>
    <div v-else>
        Please <NuxtLink to="/login">Login</NuxtLink> to view your profile..
    </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
const { $getTimeAgo } = useNuxtApp();
const currentLocale = $t("home") == "Home" ? "en" : "ko"; // Replace with dynamic locale from i18n or state
const timeAgo = $getTimeAgo(currentLocale);
const accountInfoStore = useAccountInfo();
const { accountDetails, isAccountLoggedIn } = storeToRefs(accountInfoStore);
const router = useRouter();
const headers = useRequestHeaders(["cookie"]);

const { pending, data: videosHistory } = await useLazyFetch(
    () => `http://localhost:3030/api/users/getUserHistory`,
    {
        onResponseError() {
            useNuxtApp().$toast.error($t("loadingError"), {
                autoClose: 5000,
                theme: "colored",
                position: "bottom-center",
            });
        },
        credentials: "include",
        headers,
    }
);
const { pending: pendingLiked, data: videosLiked } = await useLazyFetch(
    () =>
        `http://localhost:3030/api/users/getUserLiked?page=${router.currentRoute.value.query.page}`,
    {
        onResponseError() {
            useNuxtApp().$toast.error($t("loadingError"), {
                autoClose: 5000,
                theme: "colored",
                position: "bottom-center",
            });
        },
        credentials: "include",
        headers,
    }
);

useSeoMeta({
  title: `${$t("profile")} - SKBJ Korean BJ`,
  twitterTitle: `${$t("profile")} - SKBJ Korean BJ`,
  ogTitle: `${$t("profile")} Korean BJ`,
  description: `${$t("bestGirls")} Korean BJ`,
  ogDescription: `${$t("bestGirls")} Korean BJ`,
  twitterDescription: `${$t("bestGirls")} Korean BJ`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

</script>


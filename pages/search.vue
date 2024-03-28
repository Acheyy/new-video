<template>
    <div class="mt-20 mb-64">
        <div class="flex justify-center my-4">
            <div class="join">
                <div>
                    <div>
                        <!-- Bind the input to a data property -->
                        <input v-model="searchText" class="input input-bordered join-item" :placeholder="$t('search')" />
                    </div>
                </div>
                <div class="indicator">
                    <!-- Add a click event listener to call the search method -->
                    <button @click="searchVideos" class="btn join-item">
                        {{ $t("search") }}
                    </button>
                </div>
            </div>
        </div>

        <h1 class="text-xl my-10 text-center" v-if="currentSearchText">
            {{ $t("searchResult") }}: <strong>{{ currentSearchText }}</strong>
        </h1>

        <div class="cards-wrapper">
            <!-- Display cards for each video -->
            <CardError v-for="index in Array.from({ length: 20 }, (v, k) => k + 1)" :key="index" v-if="error"></CardError>
            <CardLoading v-for="index in Array.from({ length: 20 }, (v, k) => k + 1)" v-if="pending"></CardLoading>
            <Card v-if="!pending && !error" v-for="(video, index) in videos.videos" :key="index" :data="video"></Card>

            <div class="text text-error text-xl mt-10" v-if="!videos?.videos?.length && currentSearchText">{{ $t("noResult") }}</div>
        </div>

        <div class="text-center">
            <Pagination v-if="+videos.totalPages > 1" :totalPages="+(+videos.totalPages).toFixed(0)" :currentPage="router.currentRoute.value.query.page
                    ? +router.currentRoute.value.query.page
                    : 1
                "></Pagination>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n(); // This is how you destructure the $t function

const router = useRouter(); // Use the useRouter function
const route = useRoute();

// Search text data property
const searchText = ref("");
const currentSearchText = ref("");
const currentPage = ref(1); // Default to page 1

// Videos data property
const videos = ref([]);

// Error handling properties
const pending = ref(false);
const error = ref(null);

function updateRoute() {
    router.push({
        query: { searchText: currentSearchText.value, page: currentPage.value },
    });
}
// Search method
async function searchVideos(startFromFirstPage = false) {
    if (startFromFirstPage) {
        currentPage.value = 1; // Reset to the first page for a new search
    }
    pending.value = true;
    error.value = null;

    try {
        const response = await fetch(
            `http://localhost:3030/api/videos/search?searchText=${encodeURIComponent(
                searchText.value
            )}&page=${currentPage.value}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        videos.value = data;
        currentSearchText.value = searchText.value;

        // Update the route
        updateRoute();
    } catch (err) {
        error.value = err.message;
    } finally {
        pending.value = false;
    }
}

// Watch for changes in the page query parameter
watch(
    () => route.query.page,
    (newPage) => {
        currentPage.value = newPage ? parseInt(newPage) : 1;
        searchVideos();
    },
    { immediate: false }
);

onMounted(() => {
    const querySearchText = route.query.searchText;
    const queryPage = route.query.page;
    if (querySearchText) {
        pending.value = true;
        searchText.value = querySearchText;
        currentSearchText.value = querySearchText;
        currentPage.value = queryPage ? parseInt(queryPage) : 1;
        searchVideos();
    }
});

useSeoMeta({
  title: `${$t("search")} ${
    router.currentRoute.value.query.searchText
      ? router.currentRoute.value.query.searchText
      : ""
  } - KBJFree`,
  twitterTitle: `${$t("search")} - KBJFree`,
  ogTitle: `${$t("entertainment")}`,
  description: `${$t("dive")}`,
  ogDescription: `${$t("dive")}`,
  twitterDescription: `${$t("dive")}`,
  ogImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
})

watch(
  () => route.query,
  () => {
    useSeoMeta({
      title: `${$t("search")} ${route.query.searchText} | Page ${route.query.page} - KBJFree`,
      twitterTitle: `${$t("search")} - KBJFree`,
      ogTitle: `${$t("entertainment")}`,
      description: `${$t("dive")}`,
      ogDescription: `${$t("dive")}`,
      twitterDescription: `${$t("dive")}`,
      ogImage: `https://kbjfree.b-cdn.net/random/social2.png`,
      twitterImage: `https://kbjfree.b-cdn.net/random/social2.png`,
      twitterCard: `summary_large_image`,
    });
  }
);
</script>

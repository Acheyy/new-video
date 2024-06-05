<template>
  <div class="hero mt-20 mb-10">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-5xl font-bold">
          {{ $t("welcomeTo") }} <span class="text-secondary">KBJFREE.TV</span>
        </h1>

        <NuxtLink :to="localePath('/videos')" class="btn btn-primary mt-8 m-2">{{
          $t("allVideos")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/all-girls')" class="btn btn-primary m-2">{{
          $t("BJlist")
        }}</NuxtLink>
        <NuxtLink
          :to="localePath('/most-popular')"
          class="btn btn-primary m-2"
          >{{ $t("mostPopular") }}</NuxtLink
        >
        <NuxtLink :to="localePath('/most-liked')" class="btn btn-primary m-2">{{
          $t("mostLiked")
        }}</NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>

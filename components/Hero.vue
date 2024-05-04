<template>
  <div class="hero mt-20 mb-10">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-3xl font-bold text-pink-400">Fixed registration. Sorry for the inconvenient.</h1>
        <h3 class="text-xl font-bold text-pink-400 mb-5">For any further technical problems don't hesitate to contact us on discord</h3>
        <h1 class="text-5xl font-bold">
          <span class="text-secondary">KBJFree.TV</span>
        </h1>
        <p class="pt-4">
          <strong>{{ $t("unmatched") }}</strong
          >: {{ $t("dive") }}
        </p>
        <p class="pt-4">
          <strong>{{ $t("entertainment") }}</strong
          >: {{ $t("admirer") }}
        </p>
        <NuxtLink :to="localePath('/videos')" class="btn btn-primary m-2">{{
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
        <li class="btn btn-primary m-2">
          <a
            class="link"
            href="https://discord.gg/tXYHRqQmne"
            target="_blank"
            rel="nofollow"
            data-v-1e0d9e0b=""
            style="text-decoration: none"
          >
            Discord</a
          >
        </li>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>

<template>
    <div class="hero mt-20 mb-10">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-5xl font-bold">
            {{ $t('welcomeTo') }}  <span class="text-secondary">SexKBJ.TV</span>
          </h1>
          <p class="pt-4">
            🎬 <strong>{{ $t('unmatched') }}</strong>: {{ $t('dive') }}
          </p>
          <p class="pt-4">
            💖 <strong>{{ $t('entertainment') }}</strong>: {{ $t('admirer') }}
          </p>
          <p class="py-4">
            🔗 <strong>{{ $t('connect') }}</strong>: {{ $t('join') }}
          </p>
          <NuxtLink :to="localePath('/videos')" class="btn btn-primary m-2 ">{{ $t('allVideos') }}</NuxtLink>
          <NuxtLink :to="localePath('/bj-list')" class="btn btn-primary m-2">{{ $t('BJlist') }}</NuxtLink>
          <NuxtLink :to="localePath('/most-popular')" class="btn btn-primary m-2">{{ $t('mostPopular') }}</NuxtLink>
          <NuxtLink :to="localePath('/most-liked')" class="btn btn-primary m-2">{{ $t('mostLiked') }}</NuxtLink>
        </div>
      </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>

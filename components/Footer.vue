<template>
    <footer class="footer grid-rows-1 p-10 mt-16 rounded-md bg-neutral text-neutral-content">
        <nav class="mx-auto">
            <header class="footer-title">{{ $t("main") }}</header>
            <NuxtLink :to="localePath('/')" class="link link-hover">{{
                $t("home")
            }}</NuxtLink>
            <NuxtLink :to="localePath('/videos')" class="link link-hover">{{
                $t("allVideos")
            }}</NuxtLink>
            <NuxtLink :to="localePath('/all-girls')" class="link link-hover">{{
                $t("BJlist")
            }}</NuxtLink>
            <NuxtLink :to="localePath('/most-popular')" class="link link-hover">{{
                $t("mostPopular")
            }}</NuxtLink>
            <NuxtLink :to="localePath('/most-liked')" class="link link-hover">{{
                $t("mostLiked")
            }}</NuxtLink>
        </nav>
        <nav class="mx-auto">
            <header class="footer-title">{{$t("more")}}</header>
            <NuxtLink :to="localePath('/special-sales')" class="link link-hover">{{
                $t("specialSales")
            }}</NuxtLink>
            <NuxtLink :to="localePath('/galleries')" class="link link-hover">
                {{ $t("galleries") }}
            </NuxtLink>
            <NuxtLink :to="localePath('/categories')" class="link link-hover">
                {{ $t("categories") }}
            </NuxtLink>
            <NuxtLink :to="localePath('/tags')" class="link link-hover">
                {{ $t("tags") }}
            </NuxtLink>
            <!-- <a class="link link-hover">Nude</a>
            <a class="link link-hover">Fantrie</a>
            <a class="link link-hover">Twitch</a>
            <a class="link link-hover">Panda</a> -->
        </nav>
        <nav class="mx-auto">
            <header class="footer-title">{{$t('misc')}}</header>
            <NuxtLink :to="localePath('/contact')" class="link link-hover">{{
                $t("contact")
            }}</NuxtLink>            
            <NuxtLink :to="localePath('/dmca')" class="link link-hover">
                DMCA
            </NuxtLink>            
        </nav>
    </footer>
</template>

<script setup>
const localePath = useLocalePath();
</script>

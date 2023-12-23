<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(breadcrumb, index) in breadcrumbs">
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="localePath(breadcrumb.path)"
          itemprop="item"
        >
          <span itemprop="name">{{ breadcrumb.text }}</span>
        </NuxtLink>
        <template v-else>
          <span itemprop="name">{{ breadcrumb.text }}</span>
        </template>
        <meta itemprop="position" :content="index + 1" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const { t: $t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const supportedLangs = ['en', 'kr', "cn"]

const breadcrumbs = computed(() => {
  const routePath = route.path.split("/").filter((p) => p);

  // Check if the first segment is a language code and remove it
  if (supportedLangs.includes(routePath[0])) {
    routePath.shift(); // Remove the first segment if it's a language code
  }

  let path = "";

  // Add home page breadcrumb
  const homeBreadcrumb = {
    path: "/",
    text: $t("home"),
  };

  const otherBreadcrumbs = routePath.map((segment) => {
    path += `/${segment}`;
    const route = router.resolve(path);
    let text = route.meta?.breadcrumb || segment;

    // Remove hyphens and capitalize each word
    text = text
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      path,
      text,
    };
  });

  return [homeBreadcrumb, ...otherBreadcrumbs];
});
</script>

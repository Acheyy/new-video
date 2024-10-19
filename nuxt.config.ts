// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        "data-theme": "dracula",
      },
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/disable-devtool",
          defer: true,
        },
      ],
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxtjs/sitemap",
  ],
  css: ["@/assets/css/_main.scss", "@/assets/css/toast.css"],
  site: {
    url: "http://localhost:3030",
  },
  sitemap: {
    sitemaps: {
      main: {
        includeAppSources: true,
      },
      "all-girls": {
        sources: ["/api/__sitemap__/bjList"],
      },
      "videos-1": {
        sources: ["/api/__sitemap__/videos1"],
      },
      "videos-2": {
        sources: ["/api/__sitemap__/videos2"],
      },
      "videos-3": {
        sources: ["/api/__sitemap__/videos3"],
      },
      "videos-4": {
        sources: ["/api/__sitemap__/videos4"],
      },
      "videos-5": {
        sources: ["/api/__sitemap__/videos5"],
      },
      "videos-6": {
        sources: ["/api/__sitemap__/videos6"],
      },
      "videos-7": {
        sources: ["/api/__sitemap__/videos7"],
      },
      "videos-8": {
        sources: ["/api/__sitemap__/videos8"],
      },
      "videos-9": {
        sources: ["/api/__sitemap__/videos9"],
      },
      "videos-10": {
        sources: ["/api/__sitemap__/videos10"],
      },
      "videos-11": {
        sources: ["/api/__sitemap__/videos11"],
      },
      "videos-12": {
        sources: ["/api/__sitemap__/videos12"],
      },
      "videos-13": {
        sources: ["/api/__sitemap__/videos13"],
      },
      "videos-14": {
        sources: ["/api/__sitemap__/videos14"],
      },
      "videos-15": {
        sources: ["/api/__sitemap__/videos15"],
      },
      "videos-16": {
        sources: ["/api/__sitemap__/videos16"],
      },
      "videos-17": {
        sources: ["/api/__sitemap__/videos17"],
      },
      "videos-18": {
        sources: ["/api/__sitemap__/videos18"],
      },
      "videos-19": {
        sources: ["/api/__sitemap__/videos19"],
      },
      "videos-20": {
        sources: ["/api/__sitemap__/videos20"],
      },
      "videos-21": {
        sources: ["/api/__sitemap__/videos21"],
      },
      "videos-22": {
        sources: ["/api/__sitemap__/videos22"],
      },
      "videos-23": {
        sources: ["/api/__sitemap__/videos23"],
      },
      "videos-24": {
        sources: ["/api/__sitemap__/videos24"],
      },
      "videos-25": {
        sources: ["/api/__sitemap__/videos25"],
      },
      "videos-26": {
        sources: ["/api/__sitemap__/videos26"],
      },
    },
  },
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
      },
      {
        code: "kr",
        iso: "ko-KR",
      },
      {
        code: "cn",
        iso: "zh-CN",
      },
    ],
    baseUrl: "http://localhost:3030",
    strategy: "prefix_except_default",
    defaultLocale: "en",
  },
});

<template>
    <div class="mt-24 mb-64">
      <h1>DMCA Policy for SKBJ.tv</h1>
      <h2>1. Introduction</h2>
      <p>
        This policy is designed to inform and guide you on the Digital Millennium
        Copyright Act ("DMCA") and its application on the skbj.tv website. skbj.tv
        is committed to respecting and protecting the intellectual property rights
        of others, and we expect our users to do the same. If you believe that
        your copyrighted work has been copied or used in a way that constitutes
        copyright infringement, please notify us through the procedure outlined
        below.
      </p>
  
      <h2>2. DMCA Notice</h2>
      <p>
        Pursuant to the DMCA, if you believe that your copyrighted material is
        being infringed on skbj.tv, please send a written notice of the alleged
        copyright infringement to our designated Copyright Agent at the following
        email address:
      </p>
      <p>Email: <a href="mailto:contact@skbj.tv">contact@skbj.tv</a></p>
      <p>Please include the following information in your DMCA notice:</p>
      <ul>
        <li>
          a. A clear description of the copyrighted work that you claim has been
          infringed.
        </li>
        <li>
          b. A description of where the allegedly infringing material is located
          on skbj.tv, including the specific URLs or other unique identifying
          information.
        </li>
        <li>c. Your name, address, telephone number, and email address.</li>
        <li>
          d. A statement by you that you have a good faith belief that the
          disputed use is not authorized by the copyright owner, its agent, or the
          law.
        </li>
      </ul>
    </div>
  </template>
<script setup>
const { t: $t } = useI18n();

useSeoMeta({
  title: `DMCA - SKBJ Korean BJ`,
  twitterTitle: `DMCA - SKBJ Korean BJ`,
  ogTitle: `DMCA`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});
</script>
<style scoped>

       h1, h2 {
           color: rgb(155, 155, 155)       }
       h1 {
           font-size: 2em;
           border-bottom: 2px solid #838383;
           padding-bottom: 10px;
           margin-bottom: 20px;
       }
       h2 {
           font-size: 1.5em;
           margin-top: 20px;
           margin-bottom: 10px;
       }
       p, li {
           font-size: 1em;
           line-height: 24px;
       }
       ul {
           padding-left: 20px;
       }
       a {
           color: #1a73e8;
           text-decoration: none;
       }
       a:hover {
           text-decoration: underline;
       }
</style>
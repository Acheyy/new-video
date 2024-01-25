<template>
  <NuxtLink :to="localePath('/galleries/' + data.slug)" class="card card-compact w-44 sm:w-72 md:w-80 bg-base-100 shadow-md">
    <figure class="figure-container custom-position">
      <NuxtImg class="img-responsive" :src="imageSrc" :alt="data.name" :title="data.name"/>
      <div class="duration badge text-xs">{{ data.files.length }}</div>
    </figure>
    <div class="card-body">
      <h2 class="card-title text-base">
        {{ data.name }}
      </h2>
      <p class="text-accent">{{ data.actor.name }}</p>
      <p class="text-accent text-xs">
        {{ timeAgo.format(new Date(data.createdAt)) }}
      </p>
      <div class="card-actions justify-end center items-center">
        <!-- <div class="custom-coin">
          <Icon name="mdi:heart" size="16" class="mr-1" />
          {{ data.likes.length }}
        </div>

        <div class="custom-coin">
          <Icon name="mdi:eye" size="16" class="mr-1" />
          {{ data.views?.views }}
        </div> -->

        <div class="badge badge-outline badge-warning custom-coin" v-if="data.cost > 0">
          {{ data.cost }} <IconsCoin></IconsCoin>
        </div>
        <div class="badge badge-outline badge-warning" v-if="data.tags.includes('643adac05767bb0f8517fec8')">
          VIP
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { data } = defineProps({
  data: Object,
});

const localePath = useLocalePath();
const { t: $t } = useI18n();
const { $getTimeAgo } = useNuxtApp();
const currentLocale = $t("home") == "Home" ? "en" : "ko";
const timeAgo = $getTimeAgo(currentLocale);
const imageSrc = ref(data?.thumbnail);

</script>
<style lang="scss" scoped>
.custom-position {
  position: relative;

  .duration {
    position: absolute;
    bottom: 2px;
    right: 2px;
    z-index: 2;
    border-radius: 3px;
    background-color: #000;
  }
}

.custom-coin {
  display: flex;
  align-items: center;

  img {
    margin-left: 4px;
    max-width: 100%;
    max-height: calc(100% - 4px);
  }
}

.card {
  border: 1px solid transparent;
  transition: 0.1s ease-in-out;

  &:hover {
    border-color: #353535;
  }
}

.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* Number of lines you want */
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.75rem;
  height: 3.5rem;
  /* Adjust height if necessary */
  align-items: flex-start;
}

.figure-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  /* 16:9 Aspect Ratio */
  overflow: hidden;
  background-color: #16191e;
  /* Placeholder color */

  /* Optional: Add a loading spinner or image */
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Style your spinner or add a background image */
  }
}

.figure-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* This ensures the image covers the container without stretching */
}
</style>

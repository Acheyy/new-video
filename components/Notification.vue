<template>
  <div v-if="showNotification" class="notification">
    <h3>{{ $t("videoRecommended") }}</h3>
    <p>{{ $t("videoRecommendedDetails") }}:</p>
    <NuxtLink
      @click="dismissNotification"
      :to="localePath('/videos/fc6d104a-d078-41c7-a6ae-0f3ddaaa6a24')"
      class="text-primary text-lg"
      style="display: inline-flex"
      >iloveuyo rh__ab Sexy Ass Twerking
    </NuxtLink>

    <div class="text-right">
      <button @click="dismissNotification" class="btn btn-xs btn-success">
        {{ $t("close") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const localePath = useLocalePath();

const { t: $t } = useI18n(); // This is how you destructure the $t function

const showNotification = ref(true); // Initially show the notification

const dismissNotification = () => {
  showNotification.value = false;
};
</script>

<style scoped>
.notification {
  background-color: #333;
  color: #fff;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #444;
  border-radius: 8px;
  width: 100%;
  font-size: 0.9rem;
}

.notification h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
}
</style>

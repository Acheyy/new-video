<template>
  <video ref="videoRef" controls>
    <source
      :src="source"
      type="video/mp4"
    />

    Your browser does not support HTML video.
  </video>
</template>

<script setup>
const props = defineProps({
  source: String,
});

const videoRef = ref(null);
let lastTime = null;
let lastPlayPos = null;
let bufferingInterval = null;

const checkBuffering = () => {
  const currentTime = videoRef.value.currentTime;
  if (lastTime !== null && Math.abs(currentTime - lastTime) < 0.1 && videoRef.value.paused === false) {
    if (Math.abs(currentTime - lastPlayPos) < 0.2) {
      videoRef.value.currentTime += 0.15; // Change this value to adjust the skip duration
    }
    lastPlayPos = currentTime;
  }
  lastTime = currentTime;
};

const startBufferingCheck = () => {
  bufferingInterval = setInterval(checkBuffering, 750); // Adjust the checking interval if needed
};

const stopBufferingCheck = () => {
  clearInterval(bufferingInterval);
};

onMounted(() => {
  startBufferingCheck();
});

onUnmounted(() => {
  stopBufferingCheck();
});
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

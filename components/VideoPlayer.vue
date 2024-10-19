<template>
    <div
      :class="['video-player', { 'hide-cursor': controlsHidden }]"
      ref="videoContainer"
      @contextmenu.prevent
      @mousemove="resetControlsTimeout"
      @click.stop="handleClick"
      @dblclick.stop="handleDoubleClick"
      @touchend="handleTouchEnd"
      style="width: 100%; height: 100%"
    >
      <video
        ref="video"
        :src="src"
        @timeupdate="updateTime"
        @ended="handleEnded"
        style="width: 100%; height: 100%"
      >
        Your browser does not support the video tag.
      </video>
      <div v-if="!isPlaying" class="play-overlay" style="font-size: 20px;">
        <i class="fas fa-play"></i>
      </div>
      <div class="ripple-overlay" v-show="showOverlay">
        <div v-if="overlayDirection === 'left'" class="ripple ripple-left"></div>
        <div
          v-if="overlayDirection === 'right'"
          class="ripple ripple-right"
        ></div>
      </div>
      <div
        :class="[
          'controls',
          { fullscreen: isFullscreen, hidden: controlsHidden },
        ]"
        ref="controls"
      >
        <button @click="togglePlayPause" style="font-size: 14px">
          <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        <button @click="toggleMute" style="margin-left: 16px; font-size: 14px">
          <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          v-model="volume"
          @input="setVolume"
          style="max-width: 60px"
        />
        <button @click="skipBackward" style="font-size: 14px">
          <i class="fas fa-undo"></i> <span class="button-text">-10s</span>
        </button>
        <button @click="skipForward" style="margin-left: 16px; font-size: 14px">
          <i class="fas fa-redo"></i> <span class="button-text">+10s</span>
        </button>
        <input
          type="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          @input="seek"
        />
        <span style="position: absolute; bottom: 34px; right: 40px">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>
        <button @click="toggleFullScreen">
          <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
        </button>
      </div>
    </div>
  </template>
  

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

// Utility functions to get and set cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const video = ref(null);
const videoContainer = ref(null);
const controls = ref(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isFullscreen = ref(false);
const controlsHidden = ref(false);
const showOverlay = ref(false);
const overlayDirection = ref("");
let hideControlsTimeout = null;
let lastTap = 0;
let tapTimeout = null;

onMounted(() => {
  video.value.addEventListener("loadedmetadata", () => {
    duration.value = video.value.duration;
  });

  // Retrieve volume from cookie
  const savedVolume = getCookie("videoVolume");
  if (savedVolume !== undefined) {
    volume.value = parseFloat(savedVolume);
  }
  video.value.volume = volume.value;
  isMuted.value = video.value.muted;

  document.addEventListener("fullscreenchange", handleFullScreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
  document.addEventListener("mozfullscreenchange", handleFullScreenChange);
  document.addEventListener("msfullscreenchange", handleFullScreenChange);

  resetControlsTimeout();
});

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", handleFullScreenChange);
  document.removeEventListener(
    "webkitfullscreenchange",
    handleFullScreenChange
  );
  document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
  document.removeEventListener("msfullscreenchange", handleFullScreenChange);
  clearTimeout(hideControlsTimeout);
});

const togglePlayPause = () => {
  if (video.value.paused) {
    video.value.play();
    isPlaying.value = true;
  } else {
    video.value.pause();
    isPlaying.value = false;
  }
};

const updateTime = () => {
  currentTime.value = video.value.currentTime;
};

const seek = () => {
  video.value.currentTime = currentTime.value;
};

const handleEnded = () => {
  isPlaying.value = false;
};

const toggleMute = () => {
  isMuted.value = !isMuted.value;
  video.value.muted = isMuted.value;
};

const setVolume = () => {
  video.value.volume = volume.value;
  if (volume.value === 0) {
    isMuted.value = true;
  } else if (video.value.muted) {
    video.value.muted = false;
    isMuted.value = false;
  }
  // Save volume to cookie
  setCookie("videoVolume", volume.value, 30);
};

const toggleFullScreen = () => {
  if (!isFullscreen.value) {
    if (videoContainer.value.requestFullscreen) {
      videoContainer.value.requestFullscreen();
    } else if (videoContainer.value.webkitRequestFullscreen) {
      videoContainer.value.webkitRequestFullscreen();
    } else if (videoContainer.value.mozRequestFullScreen) {
      videoContainer.value.mozRequestFullScreen();
    } else if (videoContainer.value.msRequestFullscreen) {
      videoContainer.value.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

const handleFullScreenChange = () => {
  isFullscreen.value = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
};

const resetControlsTimeout = () => {
  controlsHidden.value = false;
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    controlsHidden.value = true;
  }, 3000);
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const skipForward = () => {
  video.value.currentTime = Math.min(
    video.value.currentTime + 10,
    video.value.duration
  );
  showOverlayAnimation("right");
};

const skipBackward = () => {
  video.value.currentTime = Math.max(video.value.currentTime - 10, 0);
  showOverlayAnimation("left");
};

const handleClick = (event) => {
  if (event.target.closest(".controls")) return; // Prevents triggering if the click is inside controls
  const currentTime = new Date().getTime();
  const tapInterval = currentTime - lastTap;

  if (tapInterval < 200 && tapInterval > 0) {
    clearTimeout(tapTimeout);
    handleDoubleTap(event);
  } else {
    tapTimeout = setTimeout(() => {
      togglePlayPause();
    }, 200);
  }
  lastTap = currentTime;
};

const handleDoubleTap = (event) => {
  const tapPosition =
    event.clientX || (event.touches && event.touches[0].clientX);
  const tapWidth = videoContainer.value.clientWidth;
  const relativePosition =
    (tapPosition - videoContainer.value.getBoundingClientRect().left) /
    tapWidth;

  if (relativePosition < 0.33) {
    skipBackward();
  } else if (relativePosition > 0.66) {
    skipForward();
  } else {
    toggleFullScreen();
  }
};

const handleTouchEnd = (event) => {
  if (event.touches.length === 1) {
    handleClick(event.touches[0]);
  }
};

const handleDoubleClick = (event) => {
  if (event.target.closest(".controls")) return; // Prevents triggering if the click is inside controls
  handleDoubleTap(event);
};

const showOverlayAnimation = (direction) => {
  overlayDirection.value = direction;
  showOverlay.value = true;
  setTimeout(() => {
    showOverlay.value = false;
  }, 500);
};

// Watch for changes in the volume to update the mute state accordingly
watch(volume, (newVolume) => {
  if (newVolume === 0) {
    isMuted.value = true;
    video.value.muted = true;
  } else {
    isMuted.value = false;
    video.value.muted = false;
  }
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.video-player {
  position: relative;
  max-width: 100%;
  background: black;
  overflow: hidden;
}

.video-player.hide-cursor {
  cursor: none;
}

video {
  width: 100%;
  display: block;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.5) 70%
  );
  padding: 10px;
  color: white;
  transition: opacity 0.3s;
}

.controls.hidden {
  opacity: 0;
  pointer-events: none;
}

.controls.fullscreen {
  bottom: 0;
  left: 0;
  right: 0;
}

.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

.controls input[type="range"] {
  flex: 1;
  margin: 0 10px;
}

.controls span {
  white-space: nowrap;
  margin: 0 2px;
}

.button-text {
  display: inline;
}

@media (max-width: 600px) {
  .button-text {
    display: none;
  }
}

.ripple-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.ripple {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  animation: rippleEffect 0.5s ease-out;
  pointer-events: none;
}

.ripple-left {
  left: -15%;
}

.ripple-right {
  right: -15%;
}

@keyframes rippleEffect {
  from {
    opacity: 0.8;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.5);
  }
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 30px;
  cursor: pointer;
}
</style>


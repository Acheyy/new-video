<template>
  <div class="roulette-container">
    <canvas ref="canvas" width="500" height="500"></canvas>
    <button
      :class="[
        'btn',
        'btn-secondary',
        { 'btn-disabled': pending || isSpinning },
        { 'btn-disabled': pending || isSpinning || accountDetails.credit < 50 },
        { skeleton: pending || isSpinning },
      ]"
      @click="spin"
      :disabled="pending || isSpinning"
    >
      Spin Cost = 50 COINS
    </button>
    <p v-if="error">Error loading data</p>
    <div v-if="winningItem" class="mt-8" style="width: 300px">
      <p>
        Winning video:
        <NuxtLink
          :to="localePath('/videos/' + winningItem.uploadID)"
          class="text-bold text-primary"
        >
          {{ winningItem.name }}</NuxtLink
        >
      </p>
      <p class="my-2">
        Value: <span class="badge badge-accent">{{ winningItem.cost }}</span>
      </p>
      <img
        :src="winningItem.thumbnail"
        alt="Winning Thumbnail"
        class="tumb-preview"
      />
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { ref, onMounted, defineEmits } from "vue";
const localePath = useLocalePath();
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

const canvas = ref(null);
const context = ref(null);
let startAngle = 0;
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
const items = ref([]);
const images = ref([]);
const initialDraw = ref(true);
const winningItem = ref(null);

// Initialize pending, error, and isSpinning
const pending = ref(false);
const error = ref(null);
const isSpinning = ref(false);

// Define emits
const emit = defineEmits(["spinning", "result"]);
console.log("test", accountDetails.value.isRouletteSpinned);

const fetchData = async () => {
  pending.value = true;
  error.value = null;
  try {
    const response = await fetch(
      "https://skbj.tv/api/videos/special?limit=3000"
    );
    const data = await response.json();
    console.log("test1", accountDetails.value.isRouletteSpinned);

    let filteredVideos;
    if (!accountDetails.value.isRouletteSpinned) {
      filteredVideos = data.videos.filter((video) => video.cost > 150);
    } else if (accountDetails.value.purchasedVideos.length > 150) {
      filteredVideos = data.videos.filter((video) => video.cost < 25);
    } else if (accountDetails.value.purchasedVideos.length > 100) {
      filteredVideos = data.videos.filter((video) => video.cost < 50);
    } else if (accountDetails.value.purchasedVideos.length > 50) {
      filteredVideos = data.videos.filter((video) => video.cost <= 90);
    } else if (accountDetails.value.purchasedVideos.length < 5) {
      filteredVideos = data.videos.filter((video) => video.cost >= 40);
    } else {
      filteredVideos = data.videos;
    }

    const shuffled = filteredVideos.sort(() => 0.5 - Math.random());
    items.value = shuffled.slice(0, 9);

    // Ensure one high-cost video is included
    const highCostVideos = data.videos.filter((video) => video.cost >= 300);
    if (highCostVideos.length > 0) {
      const randomHighCostVideo =
        highCostVideos[Math.floor(Math.random() * highCostVideos.length)];
      if (!items.value.some((item) => item._id === randomHighCostVideo._id)) {
        items.value.push(randomHighCostVideo);
        items.value = items.value.slice(0, 10); // Ensure only 8 items
      }
    }

    await loadImages();
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
    drawRouletteWheel();
  }
};

const loadImages = async () => {
  images.value = await Promise.all(
    items.value.map((item) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = item.thumbnail;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    })
  );
};

const drawRouletteWheel = () => {
  if (canvas.value.getContext) {
    const outsideRadius = 200;
    const insideRadius = 125;
    const segmentAngle = (Math.PI * 2) / 10; // Always draw 10 segments

    context.value = canvas.value.getContext("2d");
    context.value.clearRect(0, 0, 500, 500);

    context.value.strokeStyle = "black";
    context.value.lineWidth = 2;

    for (let i = 0; i < 10; i++) {
      const angle = startAngle + i * segmentAngle;

      context.value.save();
      context.value.beginPath();
      context.value.moveTo(250, 250);
      context.value.arc(
        250,
        250,
        outsideRadius,
        angle,
        angle + segmentAngle,
        false
      );
      context.value.lineTo(250, 250);
      context.value.closePath();

      // Add gradient to segments
      const gradient = context.value.createLinearGradient(
        0,
        0,
        canvas.value.width,
        0
      );
      gradient.addColorStop(0, i % 2 === 0 ? "#ffcc00" : "#ff9900");
      gradient.addColorStop(1, i % 2 === 0 ? "#ff9900" : "#ffcc00");
      context.value.fillStyle = gradient;
      context.value.fill();

      context.value.clip();

      if (initialDraw.value) {
        context.value.fillStyle = "grey";
        context.value.font = "bold 40px Arial";
        context.value.fillText(
          "?",
          250 + Math.cos(angle + segmentAngle / 2) * insideRadius - 10,
          250 + Math.sin(angle + segmentAngle / 2) * insideRadius + 15
        );
      } else {
        const img = images.value[i];
        if (img) {
          const imgWidth = img.width;
          const imgHeight = img.height;
          const scale = Math.min(
            (outsideRadius * 2) / imgWidth,
            (outsideRadius * 2) / imgHeight
          );
          const x =
            250 +
            Math.cos(angle + segmentAngle / 2) * insideRadius -
            (imgWidth * scale) / 2;
          const y =
            250 +
            Math.sin(angle + segmentAngle / 2) * insideRadius -
            (imgHeight * scale) / 2;
          context.value.drawImage(
            img,
            x,
            y,
            imgWidth * scale,
            imgHeight * scale
          );

          // Add border to images
          context.value.strokeStyle = "white";
          context.value.lineWidth = 3;
          context.value.strokeRect(x, y, imgWidth * scale, imgHeight * scale);
        }

        // Draw the cost text with shadow and background
        if (items.value[i]) {
          context.value.fillStyle = "rgba(0, 0, 0, 0.5)";
          context.value.fillRect(
            250 + Math.cos(angle + segmentAngle / 2) * 165 - 35,
            250 + Math.sin(angle + segmentAngle / 2) * 165 - 15,
            70,
            30
          );
          context.value.fillStyle = "gold";
          context.value.font = "bold 20px Arial";
          context.value.shadowColor = "black";
          context.value.shadowOffsetX = 2;
          context.value.shadowOffsetY = 2;
          context.value.shadowBlur = 5;
          context.value.fillText(
            `${items.value[i].cost}`,
            250 +
              Math.cos(angle + segmentAngle / 2) * 165 -
              context.value.measureText(`$${items.value[i].cost}`).width / 2,
            250 + Math.sin(angle + segmentAngle / 2) * 165 + 5
          );
          context.value.shadowColor = "transparent"; // Reset shadow
        }
      }

      context.value.restore();

      context.value.beginPath();
      context.value.arc(
        250,
        250,
        outsideRadius,
        angle,
        angle + segmentAngle,
        false
      );
      context.value.arc(
        250,
        250,
        insideRadius,
        angle + segmentAngle,
        angle,
        true
      );
      context.value.stroke();
    }

    // Arrow with shadow
    context.value.fillStyle = "black";
    context.value.shadowColor = "red";
    context.value.shadowOffsetX = 1;
    context.value.shadowOffsetY = 1;
    context.value.shadowBlur = 5;
    context.value.beginPath();
    context.value.moveTo(250 - 4, 250 - (outsideRadius + 5));
    context.value.lineTo(250 + 4, 250 - (outsideRadius + 5));
    context.value.lineTo(250 + 4, 250 - (outsideRadius - 5));
    context.value.lineTo(250 + 9, 250 - (outsideRadius - 5));
    context.value.lineTo(250 + 0, 250 - (outsideRadius - 13));
    context.value.lineTo(250 - 9, 250 - (outsideRadius - 5));
    context.value.lineTo(250 - 4, 250 - (outsideRadius - 5));
    context.value.lineTo(250 - 4, 250 - (outsideRadius + 5));
    context.value.fill();
    context.value.shadowColor = "transparent"; // Reset shadow
  }
};

const rotateWheel = () => {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawRouletteWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
};

const stopRotateWheel = () => {
  clearTimeout(spinTimeout);
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = 360 / items.value.length;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  winningItem.value = items.value[index]; // Update the winning item after the spin stops
  drawRouletteWheel();
  drawSelectedThumbnail(winningItem.value.thumbnail);
  isSpinning.value = false; // Set spinning to false when stopping
  emit("result", winningItem.value); // Emit result event
};

const drawSelectedThumbnail = (imgSrc) => {
  if (imgSrc) {
    const centerX = 250;
    const centerY = 250;
    const radius = 125; // Radius of the inner circle
    context.value.save();
    context.value.beginPath();
    context.value.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    context.value.clip();
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const scale = Math.max((radius * 2) / imgWidth, (radius * 2) / imgHeight);
      const x = centerX - (imgWidth * scale) / 2;
      const y = centerY - (imgHeight * scale) / 2;
      context.value.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
      context.value.restore();
    };
  }
};

const easeOut = (t, b, c, d) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
};

const spin = async () => {
  initialDraw.value = false;
  isSpinning.value = true; // Set spinning to true when starting
  emit("spinning", true); // Emit spinning event

  await fetchData();
  try {
    const deductResponse = await fetch(
      "https://skbj.tv/api/users/deductCoins",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: accountDetails.value._id }),
      }
    );

    const deductResult = await deductResponse.json();

    if (!deductResponse.ok) {
      useNuxtApp().$toast.error(deductResult.error, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
        theme: "colored",
        position: "bottom-center",
      });
      await useLazyFetch(`https://skbj.tv/api/users/getInfo`, {
        server: false,
        credentials: "include",

        onResponse(res) {
          if (res.response._data.error !== "Forbidden") {
            accountInfoStore.updateAccountInfo(res.response._data.userDB);
            accountInfoStore.triggerAccountLogin(true);
          } else {
            accountInfoStore.triggerAccountLogin(false);
          }
        },
        onResponseError(err) {
          if (err.response._data.error === "Forbidden") {
            accountInfoStore.triggerAccountLogin(false);
          }
        },
      });
      throw new Error(deductResult.error || "Failed to deduct coins");
    }

    // Update account info after deducting coins
    await useLazyFetch(`https://skbj.tv/api/users/getInfo`, {
      server: false,
      credentials: "include",

      onResponse(res) {
        if (res.response._data.error !== "Forbidden") {
          accountInfoStore.updateAccountInfo(res.response._data.userDB);
          accountInfoStore.triggerAccountLogin(true);
        } else {
          accountInfoStore.triggerAccountLogin(false);
        }
      },
      onResponseError(err) {
        if (err.response._data.error === "Forbidden") {
          accountInfoStore.triggerAccountLogin(false);
        }
      },
    });
  } catch (error) {
    console.error("Error during coin deduction:", error);
    isSpinning.value = false;
    emit("spinning", false);
    return; // Exit the spin function if there's an error
  }

  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 10 + 10 * 1000; // Increase the duration here
  rotateWheel();
};

onMounted(() => {
  drawRouletteWheel(); // Initial draw with question marks
});
</script>

<style scoped>
.roulette-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}

.btn-disabled {
  background-color: grey;
  cursor: not-allowed;
}

.tumb-preview {
  max-width: 300px;
  max-height: 300px;
}
</style>

<template>
    <div class="roulette-container">
      <canvas ref="canvas" width="500" height="500"></canvas>
      <button @click="spin" :disabled="pending">Spin</button>
      <p v-if="pending">Loading...</p>
      <p v-if="error">Error loading data</p>
      <div v-if="winningItem">
        <p>Winning Item: {{ winningItem.name }}</p>
        <img :src="winningItem.thumbnail" alt="Winning Thumbnail" width="100" />
        <p>Cost: ${{ winningItem.cost }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
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
  
  // Initialize pending and error
  const pending = ref(false);
  const error = ref(null);
  
  const fetchData = async () => {
    pending.value = true;
    error.value = null;
    try {
      const response = await fetch('https://kbjfree.tv/api/videos/special?limit=3000');
      const data = await response.json();
      const shuffled = data.videos.sort(() => 0.5 - Math.random());
      items.value = shuffled.slice(0, 8);
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
      items.value.map(item => {
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
      const segmentAngle = Math.PI * 2 / 8; // Always draw 8 segments
  
      context.value = canvas.value.getContext('2d');
      context.value.clearRect(0, 0, 500, 500);
  
      context.value.strokeStyle = 'black';
      context.value.lineWidth = 2;
  
      for (let i = 0; i < 8; i++) {
        const angle = startAngle + i * segmentAngle;
  
        context.value.save();
        context.value.beginPath();
        context.value.moveTo(250, 250);
        context.value.arc(250, 250, outsideRadius, angle, angle + segmentAngle, false);
        context.value.lineTo(250, 250);
        context.value.closePath();
        context.value.clip();
  
        if (initialDraw.value) {
          context.value.fillStyle = 'grey';
          context.value.fillRect(250 + Math.cos(angle + segmentAngle / 2) * insideRadius - 50, 250 + Math.sin(angle + segmentAngle / 2) * insideRadius - 50, 100, 100);
          context.value.fillStyle = 'white';
          context.value.font = 'bold 40px Arial';
          context.value.fillText('?', 250 + Math.cos(angle + segmentAngle / 2) * insideRadius - 10, 250 + Math.sin(angle + segmentAngle / 2) * insideRadius + 15);
        } else {
          const img = images.value[i];
          if (img) {
            const imgWidth = img.width;
            const imgHeight = img.height;
            const scale = Math.min(outsideRadius * 2 / imgWidth, outsideRadius * 2 / imgHeight);
            const x = 250 + Math.cos(angle + segmentAngle / 2) * insideRadius - (imgWidth * scale) / 2;
            const y = 250 + Math.sin(angle + segmentAngle / 2) * insideRadius - (imgHeight * scale) / 2;
            context.value.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
          }
  
          // Draw the cost text with shadow
          if (items.value[i]) {
            context.value.fillStyle = 'gold';
            context.value.font = 'bold 20px Arial';
            context.value.shadowColor = 'black';
            context.value.shadowOffsetX = 2;
            context.value.shadowOffsetY = 2;
            context.value.shadowBlur = 5;
            context.value.fillText(
              `$${items.value[i].cost}`,
              250 + Math.cos(angle + segmentAngle / 2) * 165 - context.value.measureText(`$${items.value[i].cost}`).width / 2,
              250 + Math.sin(angle + segmentAngle / 2) * 165 + 10
            );
            context.value.shadowColor = 'transparent'; // Reset shadow
          }
        }
  
        context.value.restore();
  
        context.value.beginPath();
        context.value.arc(250, 250, outsideRadius, angle, angle + segmentAngle, false);
        context.value.arc(250, 250, insideRadius, angle + segmentAngle, angle, true);
        context.value.stroke();
      }
  
      // Arrow
      context.value.fillStyle = 'black';
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
    }
  };
  
  const rotateWheel = () => {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
  };
  
  const stopRotateWheel = () => {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = 360 / items.value.length;
    const index = Math.floor((360 - degrees % 360) / arcd);
    winningItem.value = items.value[index]; // Update the winning item after the spin stops
    drawRouletteWheel();
    drawSelectedThumbnail(winningItem.value.thumbnail);
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
        const scale = Math.max(radius * 2 / imgWidth, radius * 2 / imgHeight);
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
    await fetchData();
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
  
  canvas {
    border: 2px solid black;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  
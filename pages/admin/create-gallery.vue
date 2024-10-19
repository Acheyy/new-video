<template>
  <div class="upload-wrapper" v-if="accountDetails.isAdmin">
    <input
      type="file"
      id="images"
      name="images"
      accept="image/jpeg, image/png, video/mp4"
      class="drop-zone margin file-input"
      @change="handleFileSelection($event)"
      multiple
    />

    name:
    <input
      id="name-input"
      class="input text-input margin input-bordered"
      type="text"
      :value="nameInput"
      @keyup="handleNameInput($event)"
    />
    price:
    <input
      id="price-input"
      class="input text-input margin input-bordered"
      type="text"
      :value="priceInput"
      @keyup="handlePriceInput($event)"
    />
    <div class="margin">
      Tags:
      <template v-for="(tag, index) in tagsData" :key="index">
        <input
          @change="handleTagSelect($event, tag._id)"
          class="checkbox checkbox-sm"
          type="checkbox"
          name="tag"
          :value="tag.name"
          :id="tag.name"
        />
        <label :for="tag.name">{{ tag.name }}</label>
      </template>
    </div>
    <div class="margin">
      Actor:
      <template v-for="(actor, index) in actorsData.actors" :key="index">
        <input
          class="radio radio-sm"
          type="radio"
          name="actor"
          :value="actor.name"
          :id="actor.name"
          @click="handleActorelect($event, actor._id)"
        />
        <label :for="actor.name">{{ actor.name }}</label>
      </template>
    </div>
    Name:
    {{ nameInput }}
    <br />
    Price:
    {{ priceInput }}
    <br />
    <br />
    Tags:
    {{ tags }}
    <br />
    Actor:
    {{ actor }}
    <br />
    <button @click="submitVideo()" class="btn margin">Submit</button>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const accountInfoStore = useAccountInfo();
const { accountDetails } = storeToRefs(accountInfoStore);

const files = ref([]);
let nameInput = ref("");
let priceInput = ref("");
let actor = ref("");
let actorId = ref("");
let tags = ref([]);
let tagIds = ref([]);

const handleFileSelection = (event) => {
  let uploadedFiles = event.target.files;
  if (uploadedFiles.length) {
    files.value = [...uploadedFiles];
  }
};

function getImageDimensions(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
}

const handleNameInput = (event) => {
  nameInput.value = event.target.value;
  console.log(event.target.value);
};
const handlePriceInput = (event) => {
  priceInput.value = event.target.value;
  console.log(event.target.value);
};
const handleActorelect = (event, ID) => {
  actor.value = event.target.value;
  actorId.value = ID;
};
const handleTagSelect = (event, ID) => {
  if (event.target.checked) {
    tags.value.push(event.target.value);
    tagIds.value.push(ID);
  } else {
    tags.value = tags.value.filter((e) => e !== event.target.value);
    tagIds.value = tagIds.value.filter((e) => e !== ID);
  }
};

async function captureThumbnail(videoFile, time) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.addEventListener("loadeddata", () => {
      video.currentTime = time;
    });

    video.addEventListener("seeked", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/webp");
    });

    video.src = URL.createObjectURL(videoFile);
  });
}

async function submitVideo() {
  let formData = new FormData();

  for (const file of files.value) {
    const { width, height } = await getImageDimensions(file);
    formData.append("images", file, file.name);
    formData.append("imageWidths", width);
    formData.append("imageHeights", height);
  }

  formData.append("name", nameInput.value);
  formData.append("price", priceInput.value);
  formData.append("tags[]", tagIds.value);
  formData.append("actor", actorId.value);

  await $fetch(`http://localhost:3030/api/galleries`, {
    method: "POST",
    body: formData,
    onResponse() {
      toast("Video Added!", {
        theme: "dark",
        type: "success",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
    },
  });
}
const { data: categories } = await useFetch(
  `http://localhost:3030/api/categories `
);
const { data: tagsData } = await useFetch(`http://localhost:3030/api/tags `);
const { data: actorsData } = await useFetch(
  `http://localhost:3030/api/actors?limit=9999 `
);
</script>

<style scoped lang="scss">
.drop-zone {
  width: 500px;
  height: 100px;
  border: 1px dashed grey;
}
.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.margin {
  margin: 20px 0;
}
.text-input {
  width: 500px;
}

label {
  margin: 0 8px 0 4px;
  cursor: pointer;
}
</style>

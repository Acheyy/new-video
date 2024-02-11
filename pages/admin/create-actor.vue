<template>
  <div class="upload-wrapper">
    <input
      type="file"
      id="video"
      name="video"
      accept="video/mp4, .webp"
      class="drop-zone margin"
      @change="handleFileSelection($event)"
    />
    Name:
    <input
      id="name-input"
      class="text-input margin"
      type="text"
      :value="nameInput"
      @keyup="handleNameInput($event)"
    />
    Thumbnail
    <input
      id="thumbnail-input"
      class="text-input margin"
      type="text"
      :value="thumbnailInput"
      @keyup="handleThumbnailInput($event)"
    />
    {{ nameInput }} <br />
    {{ thumbnailInput }}
    <button @click="submitVideo()" class="margin">Submit</button>
  </div>
</template>

<script setup>
const files = ref([]);
let nameInput = ref("");
let thumbnailInput = ref("");


const handleFileSelection = (event) => {
  let uploadedFiles = event.target.files;
  files.value = uploadedFiles;
  nameInput.value = files.value[0].name;
};
const handleNameInput = (event) => {
  nameInput.value = event.target.value;
  console.log(event.target.value);
};
const handleThumbnailInput = (event) => {
  thumbnailInput.value = event.target.value;
  console.log(event.target.value);
};
async function submitVideo() {
  let formData = new FormData();
  formData.append("name", nameInput.value);
  formData.append("video", files.value[0]);
  console.log(formData.values);
  await $fetch(`http://localhost:3030/api/actors`, {
    method: "POST",
    body: formData,
  });


  // await $fetch(`http://localhost:3030/api/actors`, {
  //   method: "POST",
  //   body: { name: nameInput.value, thumbnail: thumbnailInput.value },
  // });
}
</script>

<style scoped lang="scss">
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
</style>

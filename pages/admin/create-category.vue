<template>
  <div class="upload-wrapper">
    <input
      id="name-input"
      class="text-input margin"
      type="text"
      :value="nameInput"
      @keyup="handleNameInput($event)"
    />
    {{ nameInput }}
    <button @click="submitVideo()" class="margin">Submit</button>
  </div>
</template>

<script setup>
const files = ref([]);
let nameInput = ref("");

const handleNameInput = (event) => {
  nameInput.value = event.target.value;
  console.log(event.target.value);
};
async function submitVideo() {
  await $fetch(`http://localhost:3030/api/categories`, {
    method: "POST",
    body: { name: nameInput.value },
  });
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

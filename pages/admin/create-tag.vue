<template>
  <div class="upload-wrapper">
    <span>Tag*</span>
    <input
      id="name-input"
      class="text-input margin"
      type="text"
      v-model="formData.nameInput"
    />
    <button @click="submitVideo()" class="margin">Submit</button>
  </div>
</template>

<script setup>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { toast } from "vue3-toastify";

const rules = computed(() => {
  return {
    nameInput: { required, minLength: minLength(3) },
  };
});
const formData = reactive({ nameInput: "" });
const v$ = useVuelidate(rules, formData);

async function submitVideo() {
  v$.value.$validate();
  console.log(v$.value)
  if (!v$.value.$error) {
    await $fetch(`https://skbj.tv/api/tags`, {
      method: "POST",
      body: { name: formData.nameInput },
    });
  } else {
    toast("Complete the required fields!", {
      theme: "dark",
      type: "error",
      autoClose: false,
      toastClassName: "custom-wrapper error",
      closeOnClick: false,
    });
  }
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

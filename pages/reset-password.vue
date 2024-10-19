<template>
  <div class="upload-wrapper mt-24 mb-64" v-if="!isAccountLoggedIn">
    <div>
      <label class="label">
        <span class="label-text">New password</span>
      </label>
      <input
        class="input input-bordered w-full max-w-xs"
        :class="v$.password.$error ? 'error' : ''"
        id="password"
        v-model="formData.password"
        type="password"
        placeholder="Password"
      />
      <div
        style="margin-top: 4px; color: rgb(121, 0, 0)"
        v-if="v$.password.$error"
      >
        Password minimum 6 characters
      </div>
    </div>

    <button
      @click="login"
      :disabled="v$.$error"
      style="margin-top: 16px"
      class="btn btn-sm"
    >
      {{ $t("resetPassword") }}
    </button>
    <br />
  </div>
  <div v-else>Aleady logged in</div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const rules = computed(() => {
  return {
    password: { required, minLength: minLength(6) },
  };
});
const formData = reactive({ password: "" });
const v$ = useVuelidate(rules, formData);

const router = useRouter();
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn } = storeToRefs(accountInfoStore);

async function login() {
  v$.value.$validate();
  console.log(v$.value.password.$error);
  if (!v$.value.$error) {
    await $fetch(`https://skbj.tv/api/users/resetPassword`, {
      method: "POST",
      body: {
        newPassword: formData.password,
        token: router.currentRoute.value.query.token,
      },

      onResponse(res) {
        console.log(res);
        if (res.response.status === 200) {
          useNuxtApp().$toast.success(
            "Your password was successfuly changed!",
            {
              autoClose: 3000,
              dangerouslyHTMLString: true,
              theme: "colored",
              position: "bottom-center",
            }
          );

          setTimeout(() => {
            router.push({ path: `/login` });
          }, 1000);
        } else {
        }
      },
      onResponseError(err) {
        console.log(err);
        useNuxtApp().$toast.error(
          `There was an error! ${err.response._data.error}`,
          {
            autoClose: 10000,
            dangerouslyHTMLString: true,
            theme: "colored",
            position: "bottom-center",
          }
        );

      },
    });
  } else {
    useNuxtApp().$toast.error(`Complete the required fields!`, {
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
.label-text {
  color: #cacaca;
}
</style>

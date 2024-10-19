<template>
  <div class="upload-wrapper mt-24 mb-64" v-if="!isAccountLoggedIn">
    <div>
      <label class="label">
        <span class="label-text">{{ $t('email') }}</span>
      </label>
      <input
        class="input input-bordered w-full max-w-xs"
        :class="v$.email.$error ? 'error' : ''"
        id="Email"
        v-model="formData.email"
        type="text"
        :placeholder="$t('email')"
      />
      <div v-if="v$.email.$error">Invalid email</div>
    </div>

    <button
      style="margin-top: 16px"
      class="btn btn-sm"
      @click="login"
      :disabled="v$.$error"
    >
      {{$t("resetPassword")}}
    </button>
    <br />
    <button @click="goToRegister" class="btn btn-sm">      {{$t("login")}}
</button>
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
    email: { required, minLength: minLength(4) },
  };
});
const goToRegister = () => {
  router.push({ path: `/login` });
};
const formData = reactive({ email: "" });
const v$ = useVuelidate(rules, formData);
const router = useRouter();
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn } = storeToRefs(accountInfoStore);

async function login() {
  v$.value.$validate();
  console.log(v$.value.email.$error);
  if (!v$.value.$error) {
    await $fetch(`https://skbj.tv/api/users/forgotPassword`, {
      method: "POST",
      body: {
        email: formData.email,
      },

      onResponse(res) {
        console.log(res);
        if (res.response.status === 200) {
          useNuxtApp().$toast.success(
            "Please click the link in your email to reset your password",
            {
              autoClose: 3000,
              dangerouslyHTMLString: true,
              theme: "colored",
              position: "bottom-center",
            }
          );

          setTimeout(() => {
            router.push({ path: `/` });
          }, 2000);
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

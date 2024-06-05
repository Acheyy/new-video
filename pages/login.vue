<template>
  <div v-if="!isAccountLoggedIn" class="text-center mt-24 mb-64">
    <div>
      <label class="label justify-center">
        <span class="label-text">{{ $t("username") }}</span>
      </label>
      <input class="input input-bordered w-full max-w-xs" :class="v$.userName.$error ? 'input-error' : ''" id="userName"
        v-model="formData.userName" type="text" :placeholder="$t('username')" />
      <div v-if="v$.userName.$error" class="text-error">
        {{ $t("usernameMinimum") }}
      </div>
    </div>
    <div class="mt-4">
      <label class="label justify-center">
        <span class="label-text">{{ $t("password") }}</span>
      </label>
      <input class="input input-bordered w-full max-w-xs" :class="v$.password.$error ? 'input-error' : ''" id="password"
        v-model="formData.password" type="password" :placeholder="$t('password')" />
      <div class="text-error" v-if="v$.password.$error">
        {{ $t("passwordMinimum") }}
      </div>
    </div>
    <label class="label justify-center">
      <span class="label-text">
        <NuxtLink to="/forgot-password" style="margin-bottom: 20px; font-size: 12px">{{ $t("forgotPassword") }}
        </NuxtLink>
      </span>
    </label>

    <button style="margin-top: 16px" class="btn btn-sm mb-2" @click="login" :disabled="v$.$error">
      {{ $t("login") }}
    </button>
    <br />
    <button class="btn btn-sm" @click="goToRegister">
      {{ $t("register") }}
    </button>
  </div>
  <div v-else class="text-center mt-24 mb-64">
    {{ $t("alreadyLoggedIn") }} <br />
    Redirecting..
  </div>
</template>

<script setup>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useRouteHistoryStore } from "~/store/routeHistory";

const routeHistoryStore = useRouteHistoryStore();
const { t: $t } = useI18n(); // This is how you destructure the $t function
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn } = storeToRefs(accountInfoStore);
const rules = computed(() => {
  return {
    userName: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(6) },
  };
});
const formData = reactive({ userName: "", password: "" });
const v$ = useVuelidate(rules, formData);
const token = useCookie("token", {
  maxAge: 60 * 60 * 24 * 30, // Expires in 30 days
  path: '/',
  secure: true,
  sameSite: 'lax'
});
const router = useRouter();
const goToRegister = () => {
  router.push({ path: `/register` });
};
useSeoMeta({
  title: `${$t("login")} - KBJFREE`,
  twitterTitle: `${$t("login")} - KBJFREE`,
  ogTitle: `${$t("login")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social3.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social3.png`,
  twitterCard: `summary_large_image`,
});

setTimeout(() => {
  if (isAccountLoggedIn.value) {
    setTimeout(() => {
      router.go(-1);
    }, 1000);
  }
}, 1000);

async function login() {
  v$.value.$validate();
  if (!v$.value.$error) {
    await $fetch(`https://kbjfree.tv/api/users/login`, {
      method: "POST",
      body: {
        userName: formData.userName,
        password: formData.password,
      },
      onRequest() {
        accountInfoStore.triggerAccountLoad(true);
      },
      onResponse(res) {
        if (res.response.status === 200) {
          token.value = res.response._data.accessToken;
          accountInfoStore.updateAccountInfo(res.response._data.user);
          accountInfoStore.triggerAccountLogin(true);
          accountInfoStore.triggerAccountLoad(false);
          useNuxtApp().$toast.success($t("loginSuccess"), {
            autoClose: 3000,
            dangerouslyHTMLString: true,
            theme: "colored",
            position: "bottom-center",
          });

          setTimeout(() => {
            let previousRoute =
              routeHistoryStore.history[routeHistoryStore.history.length - 1] ||
              "/";
            router.push(previousRoute);
          }, 2000);
        } else {
          accountInfoStore.triggerAccountLoad(false);
        }
      },
      onResponseError(err) {
        useNuxtApp().$toast.error(
          $t("loginErrorMessageCredentials") + "! " + err.response._data,
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
    useNuxtApp().$toast.error($t("loginErrorMessageValidation"), {
      autoClose: 10000,
      dangerouslyHTMLString: true,
      theme: "colored",
      position: "bottom-center",
    });
  }
}
</script>

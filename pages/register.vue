<template>
    <div class="text-center mt-24 mb-64" v-if="!isAccountLoggedIn">
        <div>

            <label class="label justify-center">
                <span class="label-text">{{ $t("username") }}</span>
            </label>
            <input class="input input-bordered w-full max-w-xs" :class="v$.userName.$error ? 'input-error' : ''"
                v-model="formData.userName" type="text" :placeholder="$t('username')"
                :status="v$.userName.$error ? 'error' : ''" />
        </div>
        <div class="mt-4">

            <label class="label justify-center">
                <span class="label-text">{{ $t("email") }}</span>
            </label>
            <input class="input input-bordered w-full max-w-xs" :class="v$.email.$error ? 'input-error' : ''" id="userName"
                v-model="formData.email" type="text" :placeholder="$t('email')" />
        </div>
        <div class="mt-4">

            <label class="label justify-center">
                <span class="label-text">{{ $t("password") }}</span>
            </label>
            <input class="input input-bordered w-full max-w-xs" :class="v$.password.$error ? 'input-error' : ''"
                id="userName" v-model="formData.password" type="password" :placeholder="$t('password')" />
        </div>
        <button style="margin-top: 26px" class="btn btn-sm mb-2" @click="submitVideo()">
            {{ $t("register") }}
        </button>
    </div>
    <div class="text-center mt-24 mb-64" v-else>You are already logged in</div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { required, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import DOMPurify from "dompurify";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n(); // This is how you destructure the $t function
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn } = storeToRefs(accountInfoStore);
const router = useRouter();
useSeoMeta({
  title: `${$t("register")} - SKBJ`,
  twitterTitle: `${$t("register")} - SKBJ`,
  ogTitle: `${$t("register")}`,
  description: `${$t("bestGirls")}`,
  ogDescription: `${$t("bestGirls")}`,
  twitterDescription: `${$t("bestGirls")}`,
  ogImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterImage: `https://skbj.b-cdn.net/random/social2.png`,
  twitterCard: `summary_large_image`,
});

const rules = computed(() => {
    return {
        userName: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(8) },
        email: { required, email },
    };
});
const formData = reactive({ userName: "", email: "", password: "" });
const v$ = useVuelidate(rules, formData);
async function submitVideo() {
    const sanitizeduserName = DOMPurify.sanitize(formData.userName).replace(
        /\s+/g,
        ""
    );
    const sanitizedemail = DOMPurify.sanitize(formData.email).replace(/\s+/g, "");
    const sanitizedpassword = DOMPurify.sanitize(formData.password).replace(
        /\s+/g,
        ""
    );

    v$.value.$validate();
    if (!v$.value.$error) {
        await $fetch(`http://localhost:3030/api/users`, {
            method: "POST",
            body: {
                userName: sanitizeduserName.replace(/\s+/g, ""),
                email: sanitizedemail.toLowerCase().replace(/\s+/g, ""),
                password: sanitizedpassword,
            },
            async onResponse(res) {
                if (res.response.status === 200) {
                    useNuxtApp().$toast.success($t("accountCreated"), {
                        autoClose: 10000,
                        dangerouslyHTMLString: true,
                        theme: "colored",
                        position: "bottom-center",
                    });
                    await $fetch(`http://localhost:3030/api/users/sendConfirmation`, {
                        method: "POST",
                        body: { username: sanitizeduserName, to: sanitizedemail },
                    });
                    router.push({ path: `/login` });
                } else {
                    useNuxtApp().$toast.error(
                        `There was an error! ${res.response._data.error}`,
                        {
                            autoClose: 10000,
                            dangerouslyHTMLString: true,
                            theme: "colored",
                            position: "bottom-center",
                        }
                    );
                }
            },
        });
    } else {
        useNuxtApp().$toast.error($t("registrationValidation"), {
            autoClose: 10000,
            dangerouslyHTMLString: true,
            theme: "colored",
            position: "bottom-center",
        });
    }
}
</script>


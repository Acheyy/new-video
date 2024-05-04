<template>
  <div
    class="navbar bg-base-100 container mx-auto"
    :class="{ 'has-scroll': hasScrolled }"
    ref="navbarRef"
  >
    <div class="flex-none">
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Page content here -->
          <label
            for="my-drawer"
            class="btn btn-ghost drawer-button"
            :class="{ 'btn-sm': hasScrolled }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <LanguageSelector></LanguageSelector>
            <li></li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/')" class="py-3">
                <Icon name="mdi:home" size="20" />
                {{ $t("home") }}
              </NuxtLink>
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/videos')" class="py-3"
                ><Icon name="mdi:all-inclusive" size="20" />
                {{ $t("allVideos") }}</NuxtLink
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/all-girls')" class="py-3"
                ><Icon name="mdi:list-box-outline" size="20" />
                {{ $t("BJlist") }}</NuxtLink
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/most-popular')" class="py-3"
                ><Icon name="mdi:fire" size="20" />
                {{ $t("mostPopular") }}</NuxtLink
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/most-liked')" class="py-3"
                ><Icon name="mdi:thumb-up" size="20" />
                {{ $t("mostLiked") }}</NuxtLink
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/special-sales')" class="py-3"
                ><Icon name="mdi:gift" size="20" />
                {{ $t("specialSales") }}</NuxtLink
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/galleries')" class="py-3"
                ><Icon name="mdi:picture" size="20" /> {{ $t("galleries") }}</NuxtLink
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/categories')" class="py-3"
                ><Icon name="mdi:category" size="20" /> {{ $t("categories") }}
              </NuxtLink>
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/tags')" class="py-3"
                ><Icon name="mdi:tag" size="20" /> {{ $t("tags") }}
              </NuxtLink>
            </li>
            <li></li>
            <li @click="toggleDrawer">
              <a
                class="link"
                href="https://l.erodatalabs.com/s/0ab1Nq"
                target="_blank"
                rel="nofollow"
                data-v-1e0d9e0b=""
                ><img src="https://skbj.b-cdn.net/random/game.webp" data-v-1e0d9e0b="" /> Hentai Game</a
              >
            </li>
            <li @click="toggleDrawer">
              <a
                class="link"
                href="https://theporndude.com"
                target="_blank"
                rel="nofollow"
                data-v-1e0d9e0b=""
                ><img src="/images/tpd.ico" data-v-1e0d9e0b="" /> ThePornDude</a
              >
            </li>
            <li @click="toggleDrawer">
              <a
                class="link"
                href="https://discord.gg/gCcUVYAaNE"
                target="_blank"
                rel="nofollow"
                data-v-1e0d9e0b=""
              >
                <div class="icon">
                  <IconsDiscord></IconsDiscord>
                </div>
                Discord</a
              >
            </li>
            <li @click="toggleDrawer">
              <NuxtLink :to="localePath('/contact')" class="py-3"
                ><Icon name="mdi:email" size="20" />
                {{ $t("contact") }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-1 main-logo">
      <NuxtLink
        :to="localePath('/')"
        class="btn btn-ghost text-xl text-secondary"
        :class="{ 'btn-sm': hasScrolled }"
      >
        <img src="/images/skbjLogo.png"
      /></NuxtLink>
    </div>
    <div class="flex-none">
      <LanguageSelector class="max-sm:!hidden"></LanguageSelector>

      <NuxtLink :to="localePath('/search')" class="btn btn-sm btn-ghost ml-1">
        <Icon name="mdi:magnify" size="20" />
      </NuxtLink>
      <div class="flex-none">
        <div class="drawer drawer-end">
          <input id="my-drawer2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label
              for="my-drawer2"
              class="btn btn-sm btn-square btn-ghost ml-1 text-lg"
              :class="{ 'btn-sm': hasScrolled }"
            >
              <svg
                class="svg-icon"
                :fill="isAccountLoggedIn ? 'green' : 'currentColor'"
                style="
                  width: 1em;
                  height: 1em;
                  vertical-align: middle;
                  overflow: hidden;
                "
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M819.2 729.088V757.76c0 33.792-27.648 61.44-61.44 61.44H266.24c-33.792 0-61.44-27.648-61.44-61.44v-28.672c0-74.752 87.04-119.808 168.96-155.648 3.072-1.024 5.12-2.048 8.192-4.096 6.144-3.072 13.312-3.072 19.456 1.024C434.176 591.872 472.064 604.16 512 604.16c39.936 0 77.824-12.288 110.592-32.768 6.144-4.096 13.312-4.096 19.456-1.024 3.072 1.024 5.12 2.048 8.192 4.096 81.92 34.816 168.96 79.872 168.96 154.624z"
                />
                <path
                  d="M359.424 373.76a168.96 152.576 90 1 0 305.152 0 168.96 152.576 90 1 0-305.152 0Z"
                />
              </svg>
            </label>
          </div>
          <div class="drawer-side overflow-x-hidden" v-if="!isAccountLoggedIn">
            <label
              for="my-drawer2"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <!-- Sidebar content here -->
              <li @click="toggleDrawer">
                <NuxtLink :to="localePath('/login')" class="py-3">
                  {{ $t("login") }}</NuxtLink
                >
              </li>
              <li @click="toggleDrawer">
                <NuxtLink :to="localePath('/register')" class="py-3">
                  {{ $t("register") }}</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div class="drawer-side overflow-x-hidden" v-else>
            <label
              for="my-drawer2"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <div class="btn" v-if="accountDetails.isUserPremium">
                {{ $t("vipExpiration") }}:
                <strong>{{
                  timeAgo.format(new Date(accountDetails.premiumExpiry))
                }}</strong>
              </div>
              <div
                class="btn btn-warning"
                v-else
                onclick="my_modal_1.showModal()"
              >
                {{ $t("upgradeToVip") }}!
              </div>
              <div
                class="btn custom-coin mt-2"
                onclick="my_modal_2.showModal()"
              >
                {{ $t("availableCoins") }}:<strong>{{
                  accountDetails.credit
                }}</strong>
                <IconsCoin></IconsCoin>
              </div>

              <!-- Sidebar content here -->
              <li @click="toggleDrawer">
                <NuxtLink :to="localePath('/profile')" class="py-3">
                  <Icon name="mdi:account" size="20" />
                  {{ $t("profile") }}</NuxtLink
                >
              </li>

              <li @click="toggleDrawer">
                <NuxtLink :to="localePath('/profile/purchased')" class="py-3">
                  <Icon name="mdi:lock-open" size="20" />
                  {{ $t("purchased") }}</NuxtLink
                >
              </li>

              <li @click="toggleDrawer">
                <NuxtLink :to="localePath('/profile/following')" class="py-3">
                  <Icon name="mdi:account-supervisor" size="20" />
                  {{ $t("following") }}</NuxtLink
                >
              </li>

              <li @click="toggleDrawer">
                <div @click="logout()" class="py-3">
                  <Icon name="mdi:logout" size="20" />
                  {{ $t("logout") }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
const { $getTimeAgo } = useNuxtApp();
const currentLocale = $t("home") == "Home" ? "en" : "ko"; // Replace with dynamic locale from i18n or state
const timeAgo = $getTimeAgo(currentLocale);

const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

const localePath = useLocalePath();
const hasScrolled = ref(false);
const token = useCookie("token");

function toggleDrawer() {
  const drawerCheckbox = document.getElementById("my-drawer");
  if (drawerCheckbox) {
    drawerCheckbox.checked = false;
  }
  const drawerCheckbox2 = document.getElementById("my-drawer2");
  if (drawerCheckbox2) {
    drawerCheckbox2.checked = false;
  }
}

function checkScroll() {
  hasScrolled.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});

if (token.value) {
  await useLazyFetch(`http://localhost:3030/api/users/getInfo`, {
    server: false,
    credentials: "include",

    onResponse(res) {
      if (res.response._data.error !== "Forbidden") {
        accountInfoStore.updateAccountInfo(res.response._data.userDB);
        accountInfoStore.triggerAccountLogin(true);
      } else {
        accountInfoStore.triggerAccountLogin(false);
        token.value = null;
      }
    },
    onResponseError(err) {
      if ((err.response._data.error = "Forbidden")) {
        accountInfoStore.triggerAccountLogin(false);
      }
    },
  });
}

function logout() {
  token.value = null;
  accountInfoStore.deleteAccountInfo();
  accountInfoStore.triggerAccountLogin(false);
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 99;
  top: 0;
  transition: 0.3s ease-in-out;
  height: 46px;
  border-bottom: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
}
.link {
  text-decoration: none;
  img {
    max-width: 24px;
  }

  .icon {
    width: 24px;
    fill: #ffffff;
  }
}
.btn {
  transition: 0.3s ease-in-out;
}

.has-scroll {
  border-bottom: 1px solid #65656530;
  min-height: 46px;

  .main-logo img {
    max-height: 24px;
  }
}
.main-logo img {
  max-height: 32px;
  transition: 0.3s ease-in-out;
}
.custom-coin {
  display: flex;
  align-items: center;

  img {
    margin-left: 0;
    max-width: 20px;
    max-height: calc(100% - 4px);
  }
}
</style>

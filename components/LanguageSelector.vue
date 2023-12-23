<template>
    <div class="wrapper">
        <NuxtLink 
          class="btn btn-sm btn-ghost text-xs form-control mr-0.5"
          :class="{ 'btn-disabled custom-disabled': currentLocale === 'en' }"
          :to="switchLocalePath('en')">
            <label class="label cursor-pointer">
                <div class="label-text">
                    <IconsUs></IconsUs>
                    EN
                </div>
            </label>
        </NuxtLink>
        <NuxtLink 
          class="btn btn-sm btn-ghost text-xs text-sm form-control ml-0.5"
          :class="{ 'btn-disabled custom-disabled': currentLocale === 'kr' }"
          :to="switchLocalePath('kr')">
            <label class="label cursor-pointer">
                <div class="label-text">
                    <IconsKr></IconsKr>
                    KR
                </div>
            </label>
        </NuxtLink>
        <NuxtLink 
          class="btn btn-sm btn-ghost text-xs form-control ml-0.5"
          :class="{ 'btn-disabled custom-disabled': currentLocale === 'cn' }"
          :to="switchLocalePath('cn')">
            <label class="label cursor-pointer">
                <div class="label-text">
                    <IconsCn></IconsCn>
                    CN
                </div>
            </label>
        </NuxtLink>
    </div>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath();

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
</script>



<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .label-text {
        margin-right: 8px !important;
        display: flex;
        align-items: center;

        svg {
            width: 20px;
            height: 12px;
            margin-right: 8px;
        }
    }
}

.custom-disabled{
    border: 1px solid #f969d54b !important;
}
</style>

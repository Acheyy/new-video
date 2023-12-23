<template>
    <div class="left-content">
        <div class="player-wrapper relative mt-10 bg-base-200 skeleton">
            <div loading="lazy" class="main-player absolute"
                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" allowfullscreen="true"></div>
        </div>
        <div class="sources justify-between">
      <div class="sources">
        <button class="btn btn-sm btn-neutral m-1">Source 1</button>
        <button class="btn btn-sm btn-neutral m-1">Source 2</button>
      </div>
      <div class="sources">
        <button class="btn btn-sm btn-neutral w-16 skeleton m-1 btn-disabled">
          <Icon name="mdi:eye" size="18" color="gray" />
          
        </button>
        <button class="btn btn-sm btn-neutral m-1 w-16 skeleton" >
          <div class="flex items-center">
            <Icon name="mdi:heart" size="18" color="gray" class="mr-1" />
          </div>
        </button>
      </div>
    </div>        <h1 class="main-title text-xl bg-base-200 skeleton my-1"></h1>
        <p>
        <div class="btn btn-xs m-1 uppercase text-xs skeleton" v-for="index in Array.from({ length: 2 }, (v, k) => k + 1)">
            "Loading"
        </div>
        </p>

        <div class="text-center mt-2">
          <CardBJBiggerLoading></CardBJBiggerLoading>

        </div>

    </div>
</template>

<style scoped lang="scss">
.player-wrapper {
  padding-top: 56.25%;
  width: 100%;

  .main-player {
    border: none;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 0.1s ease;

    &.is-loaded {
      opacity: 1;
    }
  }
}

.main-title {
  height: 1.75rem;
}

.sources {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

</style>

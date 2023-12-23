<template>
    <div class="left-content">
        <div class="player-wrapper relative mt-10 bg-base-200 ">
            <div loading="lazy" class="main-player absolute"
                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" allowfullscreen="true"></div>
        </div>
        <div class="sources justify-between">
      <div class="sources">
        <button class="btn btn-sm btn-neutral m-1">Error..</button>
        <button class="btn btn-sm btn-neutral m-1">Error..</button>
      </div>
      <div class="sources">
        <button class="btn btn-sm btn-neutral w-16  m-1 btn-disabled">
          <Icon name="mdi:eye" size="18" color="gray" />
          
        </button>
        <button class="btn btn-sm btn-neutral m-1 w-16 " >
          <div class="flex items-center">
            <Icon name="mdi:heart" size="18" color="gray" class="mr-1" />
          </div>
        </button>
      </div>
    </div>        <h1 class="main-title text-xl bg-base-200  my-1">Error..</h1>
        <p>
        <div class="btn btn-xs m-1 uppercase text-xs " v-for="index in Array.from({ length: 2 }, (v, k) => k + 1)">
            "Error.."
        </div>
        </p>

        <CardBJBiggerLoading></CardBJBiggerLoading>

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

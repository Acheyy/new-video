<template>
    <div class="card card-compact  w-48 md:w-72 bg-base-100 bg-base-100 shadow-md mx-auto">
        <figure class="figure-container skeleton">
            <div class="img-responsive rounded-lg" ></div>
        </figure>
        <div class="card-body">
            <h1 class="card-title skeleton text-md">
                Loading..
            </h1>
            <p class="text-accent skeleton">Loading..</p>

            <div class="card-actions justify-end">
                <div class="badge skeleton w-48 badge-outline badge-secondary">
                  Loading..
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath();

const { data } = defineProps({
    data: Object,
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid transparent;
  transition: 0.1s ease-in-out;

  &:hover{
    border-color: #353535
  }
}
.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines you want */
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.75rem;
  height: 1.75rem; /* Adjust height if necessary */
  align-items: flex-start;
}

.figure-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 16:9 Aspect Ratio */
  overflow: hidden;
  background-color: #16191e; /* Placeholder color */

  /* Optional: Add a loading spinner or image */
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Style your spinner or add a background image */
  }
}

.figure-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the container without stretching */
}

</style>

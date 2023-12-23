<template>
  <div class="card card-compact w-44 sm:w-72 md:w-80 bg-base-100 shadow-md">
    <figure class="skeleton figure-container">
      <div class="img-responsive"> </div>
    </figure>
    <div class="card-body">
      <h2 class="card-title skeleton">
      </h2>
      <p class="text-accent customtext-1 skeleton"></p>
      <p class="text-accent customtext-2 text-xs skeleton"></p>

      <div class="card-actions justify-end items-center">
        <div class="badge badge-sm  skeleton w-12" >
        </div>
        <div class="badge badge-sm  skeleton w-12" >
        </div>

        <div class="badge skeleton badge-outline badge-secondary w-24"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>
.customtext-1{
  height: 1.25rem;
}
.customtext-2{
  height: 1rem;
}
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
  height: 3.5rem; /* Adjust height if necessary */
  align-items: flex-start;
}

.figure-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
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

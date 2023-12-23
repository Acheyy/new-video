<template>
    <div class="join my-12">
      <!-- Ellipsis for leading skipped pages -->
      <button class="join-item btn btn-disabled" v-if="currentPage > 5">...</button>
  
      <!-- Buttons for page numbers -->
      <button
        v-for="index in pageNumbers"
        :key="index"
        class="join-item btn page-number"
        :class="{ 'btn-disabled': currentPage === index }"
        @click="changePage(index)"
      >
        {{ index }}
      </button>
  
      <!-- Ellipsis for trailing skipped pages -->
      <button class="join-item btn btn-disabled" v-if="totalPages > currentPage + 4 ">...</button>
  
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  
  const router = useRouter();
  const props = defineProps({
    totalPages: Number,
    currentPage: Number,
  });
  
  const pageNumbers = computed(() => {
    let pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
      if (i >= props.currentPage - 4 && i <= props.currentPage + 4) {
        pages.push(i);
      }
    }
    return pages;
  });
  
  function changePage(index) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        page: index,
      },
    });
  }
  </script>
  
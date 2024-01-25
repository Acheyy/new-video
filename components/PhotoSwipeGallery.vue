<template>
    <div class="pswp-gallery custom-class" id="gallery">
      <a v-for="(item, index) in images" :key="index"
         :href="item.url" 
         :data-pswp-width="item.width" 
         :data-pswp-height="item.height" 
         target="_blank">
        <NuxtImg :src="item.url + '?width=200&aspect_ratio=2:4'" :alt="`Image ${index + 1}`"/>
      </a>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  
  const props = defineProps({
    images: Array
  });
  
  onMounted(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
  });
  </script>
  
  <style>
  @import 'photoswipe/style.css';
  .custom-class{
    display: flex;
    flex-wrap: wrap;
  }
  .custom-class a {
    margin: 4px;
  }
  </style>
  
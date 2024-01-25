<template>
  <div>
    <PhotoSwipeGallery :images="imageArray" />
  </div>
</template>

<script setup>
import PhotoSwipeGallery from "~/components/PhotoSwipeGallery.vue";

const imageArray = [
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0385-14e54d7ebaa7e1a19.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0385-14e54d7ebaa7e1a19.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0399-166c68e8a984475f7.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0399-166c68e8a984475f7.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0421-1dc6dffc6cc89d021.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0421-1dc6dffc6cc89d021.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0446-1f0ba729591047e13.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0446-1f0ba729591047e13.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0453-152f2131af9a90e30.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0453-152f2131af9a90e30.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0454-19593b1dcccdf4ade.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0454-19593b1dcccdf4ade.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0465-10fd6a805e9e06e58.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0465-10fd6a805e9e06e58.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0473-1e812f2e8ee949cf5.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0473-1e812f2e8ee949cf5.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0495-1a0ebd5f505e5050e.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0495-1a0ebd5f505e5050e.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
    {
        original: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0501-17735c908046d2898.jpg",
        thumbnail: "https://skbjvid.b-cdn.net/gallery/berry-christmas/_MG_0501-17735c908046d2898.jpg?width=300&height=200",
        width: 4032,
        height: 6048, 
    },
  
];
</script>

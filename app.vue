<script setup lang="ts">
import NavBar from './components/NavBar.vue';
const route = useRoute()
</script>

<template>
  <UApp class="color-black">
    <NavBar v-if="!route.meta.hideNavbar" />
    <NuxtPage />
  </UApp>
</template>

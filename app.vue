<script setup lang="ts">
import NavBar from './components/NavBar.vue';
const route = useRoute()
</script>

<template>
  <div>
    <NavBar v-if="!route.meta.hideNavbar" />
    <NuxtPage />
  </div>
</template>

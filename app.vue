<script setup lang="ts">
import NavBar from './components/NavBar.vue';
const route = useRoute()
</script>

<template>
  <UApp>
    <NavBar v-if="!route.meta.hideDefaultNavbar" />
    <NuxtPage />
  </UApp>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';

const route = useRoute();

// State to track if the user is on mobile
const isMobile = ref(false);

if (typeof window === 'undefined') {
  isMobile.value = false; // Default to desktop during SSR
}

// Function to update the device type
function updateDeviceType() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  updateDeviceType();
  window.addEventListener('resize', updateDeviceType);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceType);
});
</script>

<template>
  <UApp class="color-black">
    <div>
      <NavBar v-if="!route.meta.hideDefaultNavbar" />
      <NuxtPage />
    </div>
  </UApp>
</template>

<style scoped>

</style>
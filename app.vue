<script setup lang="ts">
import NavBar from './components/NavBar.vue';
const route = useRoute()
import LandingPage from './components/MobileLandingPage.vue';
import MobileHomepage from './pages/MobileHomepage.vue';
import MobileSummarizer from './pages/MobileSummarizer.vue';
import MobileOptions from './pages/MobileOptions.vue';
import { ref, onMounted, onUnmounted } from 'vue';

// State to track if the user is on mobile
const isMobile = ref(false);

// State to track which mobile page is displayed
const showMobileHomepage = ref(false);
const showMobileSummarizer = ref(false);
const showMobileOptions = ref(false);

// Function to update the device type
const updateDeviceType = () => 
{
  isMobile.value = window.innerWidth <= 768; // Mobile if width is 768px or less
};

// Function to navigate to the mobile homepage
const navigateToMobileHomepage = () => 
{
  showMobileHomepage.value = true;
  showMobileSummarizer.value = false;
  showMobileOptions.value = false;
};

// Function to navigate to the mobile summarizer
const navigateToMobileSummarizer = () => 
{
  showMobileHomepage.value = false;
  showMobileSummarizer.value = true;
  showMobileOptions.value = false;
};

// Function to navigate back to the mobile landing page
const navigateToLandingPage = () => 
{
  showMobileHomepage.value = false;
  showMobileSummarizer.value = false;
  showMobileOptions.value = false;
};

const navigateToMobileOptions = () => 
{
  showMobileHomepage.value = false;
  showMobileSummarizer.value = false;
  showMobileOptions.value = true; // Show MobileOptions
};

// Set up event listeners to detect screen size changes
onMounted(() => 
{
  updateDeviceType();
  window.addEventListener('resize', updateDeviceType);
});

onUnmounted(() => 
{
  window.removeEventListener('resize', updateDeviceType);
});
</script>

<template>
  <div>
    <NavBar v-if="!route.meta.hideNavbar" />
    <NuxtPage />
  </div>
</template>
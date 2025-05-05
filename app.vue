<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import LandingPage from './components/MobileLandingPage.vue';
import MobileHomepage from './pages/MobileHomepage.vue';
import MobileSummarizer from './pages/MobileSummarizer.vue';
import MobileOptions from './pages/MobileOptions.vue';
import MobileLogin from './pages/MobileLogin.vue';
import { ref, onMounted, onUnmounted } from 'vue';

// State to track if the user is on mobile
const isMobile = ref(false);

if (typeof window === 'undefined') 
{
  isMobile.value = false; // Default to desktop during SSR
}

// State to track which mobile page is displayed
const showMobileHomepage = ref(false);
const showMobileSummarizer = ref(false);
const showMobileOptions = ref(false);
const showMobileLogin = ref(false);

// Function to update the device type
function updateDeviceType() {
  isMobile.value = window.innerWidth <= 768; // Mobile if width is 768px or less
}

// Function to navigate to the mobile homepage
const navigateToMobileHomepage = () => 
{
  if (isMobile.value) {
    showMobileHomepage.value = true;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
  }
};

// Function to navigate to the mobile login page
const navigateToMobileLogin = () => 
{
  if (isMobile.value) {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = true;
  }
};

// Function to navigate to the mobile summarizer
const navigateToMobileSummarizer = () => 
{
  if (isMobile.value) {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = true;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
  }
};

// Function to navigate to the mobile options page
const navigateToMobileOptions = () => 
{
  if (isMobile.value) {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = true;
    showMobileLogin.value = false;
  }
};

// Function to navigate back to the mobile landing page
const navigateToLandingPage = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
  }
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
const route = useRoute()
</script>

<template>
  <UApp class="color-black">
    <!-- Show MobileLogin if navigated and on mobile -->
    <MobileLogin
      v-if="isMobile && showMobileLogin"
      @navigateToHomepage="navigateToMobileHomepage"
    />
    <!-- Show MobileOptions if navigated and on mobile -->
    <MobileOptions
      v-else-if="isMobile && showMobileOptions"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
    />
    <!-- Show MobileSummarizer if navigated and on mobile -->
    <MobileSummarizer
      v-else-if="isMobile && showMobileSummarizer"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToLandingPage="navigateToLandingPage"
      @navigateToOptions="navigateToMobileOptions"
    />
    <!-- Show MobileHomepage if navigated and on mobile -->
    <MobileHomepage
      v-else-if="isMobile && showMobileHomepage"
      @navigateToLandingPage="navigateToLandingPage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToLogin="navigateToMobileLogin"
    />
    <!-- Show LandingPage if on mobile and no other mobile page is active -->
    <LandingPage
      v-else-if="isMobile && !showMobileHomepage && !showMobileSummarizer && !showMobileOptions && !showMobileLogin"
      @navigateToHomepage="navigateToMobileHomepage"
    />
    <!-- Show NavBar and NuxtPage for desktop -->
    <div v-else>
      <NavBar v-if="!route.meta.hideDefaultNavbar" />
      <NuxtPage />
    </div>
  </UApp>
</template>
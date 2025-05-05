<template>
  <div class="page-container">
    <LandingPage />
    <!-- Footer -->
    <footer class="footer">
      <p class="space-x-4">
        <a href="/DesktopAboutUs.html">About Us</a> |
        <a href="/DesktopFAQ.html">FAQ</a> |
        <a href="/site-map">Site Map</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
// No additional logic is required
</script>
<script setup>
import MobileLandingPage from '~/components/MobileLandingPage.vue';
import MobileHomepage from './MobileHomepage.vue';
import MobileSummarizer from './MobileSummarizer.vue';
import MobileOptions from './MobileOptions.vue';
import MobileLogin from './MobileLogin.vue';
  import MobileSignup from './MobileSignup.vue';
import { ref, onMounted, onUnmounted } from 'vue';

// State to track if the user is on mobile
const isMobile = ref(false);

// State to track which mobile page is displayed
const showMobileHomepage = ref(false);
const showMobileSummarizer = ref(false);
const showMobileOptions = ref(false);

// Function to update the device type
const updateDeviceType = () => {
  isMobile.value = window.innerWidth <= 768; // Mobile if width is 768px or less
};

// Function to navigate to the mobile homepage
const navigateToMobileHomepage = () => {
  showMobileHomepage.value = true;
  showMobileSummarizer.value = false;
  showMobileOptions.value = false;
};

// Function to navigate to the mobile summarizer
const navigateToMobileSummarizer = () => {
  showMobileHomepage.value = false;
  showMobileSummarizer.value = true;
  showMobileOptions.value = false;
};

// Function to navigate back to the mobile landing page
const navigateToLandingPage = () => {
  showMobileHomepage.value = false;
  showMobileSummarizer.value = false;
  showMobileOptions.value = false;
};

const navigateToMobileOptions = () => {
  showMobileHomepage.value = false;
  showMobileSummarizer.value = false;
  showMobileOptions.value = true; // Show MobileOptions
};

// Set up event listeners to detect screen size changes
onMounted(() => {
  updateDeviceType();
  window.addEventListener('resize', updateDeviceType);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceType);
});
</script>

<template>
  <!-- Show MobileOptions if navigated and on mobile -->
  <MobileOptions
    v-if="isMobile && showMobileOptions"
    @navigateToHomepage="navigateToMobileHomepage"
    @navigateToSummarizer="navigateToMobileSummarizer"
  />
  <!-- Show MobileSummarizer if navigated and on mobile -->
  <MobileSummarizer
    v-if="isMobile && showMobileSummarizer"
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
  />
  <!-- Show LandingPage if on mobile and no other mobile page is active -->
  <MobileLandingPage
    v-else-if="isMobile && !showMobileHomepage && !showMobileSummarizer && !showMobileOptions"
    @navigateToHomepage="navigateToMobileHomepage"
  />
  <!-- Show NavBar and NuxtPage for desktop -->
</template>

<style scoped>
/* Flexbox container to ensure footer stays at the bottom */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full height of the viewport */
}

/* Push the footer to the bottom */
.footer {
  margin-top: auto; /* Pushes the footer to the bottom */
  background-color: #f9f9f9; /* Optional: Light background for the footer */
  padding: 1rem 0;
  text-align: center;
  font-size: 0.875rem; /* Small text */
  color: #555;
}
</style>

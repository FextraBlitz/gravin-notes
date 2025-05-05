<template>
  <div class="page-container">
    <main class="main-content">
      <section id="hero" class="hero-section">
        <div class="hero-image">
          <!-- Placeholder for the hero image -->
          <div class="image-placeholder"></div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="feature">
          <h3 class="feature-title">All-in-One Productivity. Smarter, Faster.</h3>
          <p class="feature-description">
            Whether you're a student, a creative, or a professional, our platform combines powerful note-taking with real-time AI assistance to help you organize, summarize, and create—effortlessly.
          </p>
        </div>
        <div class="feature">
          <h3 class="feature-title">Talk to Your Notes</h3>
          <p class="feature-description">
            Say hello to your AI Summarizer.
            Need to revisit long notes or dense ideas? Just chat with our built-in AI and get instant summaries, clarifications, or next-step suggestions—all in your own words.
          </p>
        </div>
        <div class="feature">
          <h3 class="feature-title">Write Freely, Edit Clearly</h3>
          <p class="feature-description">
            Our minimalist text editor is designed to help you focus on your thoughts. Create, edit, and organize your notes with intuitive tools that stay out of your way—perfect for brainstorming, journaling, or planning.
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p class="footer-links">
        <a href="/DesktopAboutUs.html">About Us</a> |
        <a href="/DesktopFAQ.html">FAQ</a> |
        <NuxtLink to="/DesktopSitemap">Site Map</NuxtLink>
      </p>
    </footer>
  </div>
</template>

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
/* Overall Page Container */
.page-container 
{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Main Content Section */
.main-content 
{
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

/* Hero Section */
.hero-section 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 120px;
}

.hero-content 
{
  max-width: 800px;
  margin-bottom: 20px;
}

.hero-image .image-placeholder 
{
  width: 100%;
  height: 300px;
  background-color: #d6d6d6;
  border-radius: 12px;
}

/* Features Section */
.features-section 
{
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.feature 
{
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  background-color: #e8e8e8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-title 
{
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.feature-description 
{
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

/* Footer Section */
.footer 
{
  margin-top: auto;
  background-color: #f9f9f9;
  padding: 25px;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  width: 100%;
  box-sizing: border-box;
}

.footer-links a 
{
  color: #000000;
  text-decoration: none;
  margin: 0 10px;
}
</style>


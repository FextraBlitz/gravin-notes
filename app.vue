<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import DesktopLogin from './pages/DesktopLogin.vue';
import LandingPage from './components/MobileLandingPage.vue';
import MobileHomepage from './pages/MobileHomepage.vue';
import MobileSummarizer from './pages/MobileSummarizer.vue';
import MobileOptions from './pages/MobileOptions.vue';
import MobileLogin from './pages/MobileLogin.vue';
import MobileSignup from './pages/MobileSignup.vue';
import MobileFAQ from './pages/MobileFAQ.vue';
import MobileNotes from './pages/MobileNotes.vue';
import MobileAboutUs from './pages/MobileAboutUs.vue';
import MobileDeletedNotes from './pages/MobileDeletedNotes.vue';
import MobileAccount from './pages/MobileAccount.vue';
import MobileDeleteAccount from './pages/MobileDeleteAccount.vue';
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
const showMobileSignup = ref(false);
const showMobileFAQ = ref(false);
const showMobileNotes = ref(false);
const showMobileAboutUs = ref(false);
const showMobileDeletedNotes = ref(false);
const showMobileAccount = ref(false);
const showMobileDeleteAccount = ref(false);
const showDesktopLogin = ref(false);

// Function to update the device type
function updateDeviceType() 
{
  isMobile.value = window.innerWidth <= 768; // Mobile if width is 768px or less
}

const route = useRoute();
watch(
  () => route.path,
  (newPath) => {
    if (!isMobile.value && newPath === '/desktop-login') {
      showDesktopLogin.value = true;
    } else {
      showDesktopLogin.value = false;
    }
  },
);


// Function to navigate to the mobile homepage
const navigateToMobileHomepage = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = true;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

// Function to navigate to the mobile login page
const navigateToMobileLogin = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = true;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

const navigateToMobileSignup = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = true;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

const navigateToMobileNotes = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = true;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

// Function to navigate to the mobile summarizer
const navigateToMobileSummarizer = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = true;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

// Function to navigate to the mobile options page
const navigateToMobileOptions = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = true;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

const navigateToMobileDeletedNotes = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = true;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

const navigateToMobileAccount = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = true;
    showMobileDeleteAccount.value = false;
  }
};

const navigateToMobileDeleteAccount = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = true;
  }
};

const navigateToMobileAboutUs = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = true;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
  }
};

const navigateToMobileFAQ = () => 
{
  if (isMobile.value) 
  {
    showMobileHomepage.value = false;
    showMobileSummarizer.value = false;
    showMobileOptions.value = false;
    showMobileLogin.value = false;
    showMobileSignup.value = false;
    showMobileFAQ.value = true;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
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
    showMobileSignup.value = false;
    showMobileFAQ.value = false;
    showMobileNotes.value = false;
    showMobileAboutUs.value = false;
    showMobileDeletedNotes.value = false;
    showMobileAccount.value = false;
    showMobileDeleteAccount.value = false;
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
    <!-- Render DesktopLogin.vue only in desktop mode -->
    <div v-if="$route.path === '/desktop-login'">
      <DesktopLogin />
    </div>
    <!-- Show MobileLogin if navigated and on mobile -->
    <MobileLogin
      v-if="isMobile && showMobileLogin"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSignup="navigateToMobileSignup"
    />
    <MobileSignup
      v-if="isMobile && showMobileSignup"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToLogin="navigateToMobileLogin"
    />
    <MobileNotes
      v-if="isMobile && showMobileNotes"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
    />
    <MobileOptions
      v-else-if="isMobile && showMobileOptions"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToFAQ="navigateToMobileFAQ"
      @navigateToNotes="navigateToMobileNotes"
      @navigateToAboutUs="navigateToMobileAboutUs"
      @navigateToDeletedNotes="navigateToMobileDeletedNotes"
      @navigateToAccount="navigateToMobileAccount"
      @navigateToDeleteAccount="navigateToMobileDeleteAccount"
    />
    <MobileAccount
      v-else-if="isMobile && showMobileAccount"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToNotes="navigateToMobileNotes"
      @navigateToDeleteAccount="navigateToMobileDeleteAccount"
    />
    <MobileDeleteAccount
      v-else-if="isMobile && showMobileDeleteAccount"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToNotes="navigateToMobileNotes"
      @navigateToAccount="navigateToMobileAccount"
      @navigateToLandingPage="navigateToLandingPage"
    />
    <MobileDeletedNotes
      v-else-if="isMobile && showMobileDeletedNotes"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToNotes="navigateToMobileNotes"
    />
    <MobileAboutUs
      v-else-if="isMobile && showMobileAboutUs"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToNotes="navigateToMobileNotes"
      />
    <MobileFAQ
      v-else-if="isMobile && showMobileFAQ"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToNotes="navigateToMobileNotes"
    />
    <!-- Show MobileSummarizer if navigated and on mobile -->
    <MobileSummarizer
      v-else-if="isMobile && showMobileSummarizer"
      @navigateToHomepage="navigateToMobileHomepage"
      @navigateToLandingPage="navigateToLandingPage"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToNotes="navigateToMobileNotes"
    />
    <!-- Show MobileHomepage if navigated and on mobile -->
    <MobileHomepage
      v-else-if="isMobile && showMobileHomepage"
      @navigateToLandingPage="navigateToLandingPage"
      @navigateToSummarizer="navigateToMobileSummarizer"
      @navigateToOptions="navigateToMobileOptions"
      @navigateToLogin="navigateToMobileLogin"
      @navigateToNotes="navigateToMobileNotes"
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
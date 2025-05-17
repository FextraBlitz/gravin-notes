<template>
  <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-9999">
    <!-- Mobile Navbar -->
    <div v-if="isMobile">
      <!-- Top Bar with Logo, Account Button, and Menu Button -->
      <div class="flex justify-between items-center py-3 px-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center logo">
          <img src="/assets/icons/logo.png" alt="Gravin Notes Logo" class="w-6 h-6">
          <span class="ml-2 font-semibold text-gray-800 text-base tracking-tight">Gravin Notes</span>
        </NuxtLink>
        <!-- Right Section: Account Button and Menu Toggle -->
        <div class="flex items-center gap-2">
          <!-- Auth Components -->
          <ProfileButton
            v-if="isLoggedIn"
            :user-name="store.userName"
            :user-email="store.userEmail"
            @logout="handleLogout"
            class="text-sm"
          />
          <LoginSignupButton
            v-else
            @login="storeCurrentPath"
            @signup="storeCurrentPath"
            class="text-sm"
          />
          <!-- Menu Toggle Button -->
          <button 
            @click="toggleMenu" 
            class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <img 
              v-if="!menuOpen" 
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/menu.svg" 
              alt="Open Menu" 
              class="w-6 h-6 text-gray-600"
            />
            <img 
              v-else 
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x.svg" 
              alt="Close Menu" 
              class="w-6 h-6 text-gray-600"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div 
        v-if="menuOpen"
        class="flex flex-col bg-white py-3 px-4 animate-fade-in-down shadow-md"
      >
        <NuxtLink 
          to="/ai-summarizer" 
          class="py-3 border-b border-gray-100 text-gray-600 hover:text-purple-500 transition-colors duration-200 mobile-nav-link"
          @click="closeMenu"
        >
          AI Summarizer
        </NuxtLink>
        <NuxtLink 
          to="/editor" 
          class="py-3 border-b border-gray-100 text-gray-600 hover:text-purple-500 transition-colors duration-200 mobile-nav-link"
          @click="closeMenu"
        >
          Editor
        </NuxtLink>
        <NuxtLink 
          to="/your-notes" 
          class="py-3 border-b border-gray-100 text-gray-600 hover:text-purple-500 transition-colors duration-200 mobile-nav-link"
          @click="closeMenu"
        >
          My Notes
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          class="py-3 border-b border-gray-100 text-gray-600 hover:text-purple-500 transition-colors duration-200 mobile-nav-link"
          @click="closeMenu"
        >
          Contact
        </NuxtLink>
      </div>
    </div>

    <!-- Desktop Navbar -->
    <div v-else class="flex justify-between items-center py-4 px-6">
      <!-- Left Section: Logo and Navigation Links -->
      <div class="flex items-center gap-6">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center logo">
          <img src="/assets/icons/logo.png" alt="Gravin Notes Logo" class="w-8 h-8">
          <span class="ml-2 font-semibold text-gray-800 text-lg tracking-tight">Gravin Notes</span>
        </NuxtLink>
        <!-- Navigation Links -->
        <nav class="flex gap-8 text-gray-600 font-medium">
          <NuxtLink to="/ai-summarizer" class="hover:text-purple-600 transition-colors duration-200 relative group">
            AI Summarizer
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink to="/editor" class="hover:text-purple-600 transition-colors duration-200 relative group">
            Editor
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink to="/your-notes" class="hover:text-purple-600 transition-colors duration-200 relative group">
            My Notes
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </nav>
      </div>
      
      <!-- Right Section: Contact and Auth -->
      <div class="flex gap-6 text-sm font-medium items-center">
        <NuxtLink to="/contact" class="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center">Contact</NuxtLink>
        
        <!-- Auth Components -->
        <ProfileButton
          v-if="isLoggedIn"
          :user-name="store.userName"
          :user-email="store.userEmail"
          @logout="handleLogout"
        />
        
        <LoginSignupButton
          v-else
          @login="storeCurrentPath"
          @signup="storeCurrentPath"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { inject, computed, watch, onMounted, ref } from 'vue';
import { useRoute } from '#app';
import ProfileButton from '~/components/navbarparts/ProfileButton.vue';
import LoginSignupButton from '~/components/navbarparts/LoginSignupButton.vue';

// Get route and inject store
const route = useRoute();
const store = inject('store');
const isMobile = inject('isMobile');

// Menu state for mobile
const menuOpen = ref(false);

// Local computed property for isLoggedIn
const isLoggedIn = computed(() => store.isLoggedIn.value);

// Watch isLoggedIn for debugging
watch(isLoggedIn, (newValue) => {
  console.log('isLoggedIn changed:', newValue);
});

// Store current path when navigating to login/signup
const storeCurrentPath = () => {
  store.setLastVisitedPage(route.fullPath);
};

// Handle logout
const handleLogout = () => {
  store.logout();
  closeMenu();
};

// Toggle menu function
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Close menu function
const closeMenu = () => {
  menuOpen.value = false;
};

// When the component mounts, store the current page
onMounted(() => {
  if (!['/login', '/signup'].includes(route.fullPath)) {
    store.setLastVisitedPage(route.fullPath);
  }
});
</script>

<style scoped>
/* Clean hover effects and transitions */
a {
  position: relative;
}

.logo {
  text-decoration: none !important;
}

/* Desktop Active link styling */
a.router-link-active:not([to="/"]):not(.mobile-nav-link) {
  color: #7c3aed; /* purple-600 */
  font-weight: 600;
}

a.router-link-active:not([to="/"]):not(.mobile-nav-link):after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #7c3aed; /* purple-600 */
}

/* Mobile Active link styling */
a.router-link-active.mobile-nav-link {
  color: #BD93F9; /* Dracula Alucard purple */
  font-weight: 600;
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Animation for mobile menu */
.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-out forwards;
}

@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* SVG icon colors for mobile */
img[src*="menu.svg"],
img[src*="x.svg"] {
  filter: invert(42%) sepia(12%) saturate(455%) hue-rotate(179deg) brightness(95%) contrast(86%);
}
</style>
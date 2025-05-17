<template>
  <div class="relative">
    <!-- Login/Signup Button -->
    <button 
      @click="toggleLoginDropdown" 
      class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200 cursor-pointer flex items-center"
    >
      Login/Sign Up
    </button>
    
    <!-- Login/Signup Dropdown Menu -->
    <div 
      v-show="isDropdownOpen" 
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100"
    >
      <NuxtLink 
        to="/login" 
        @click="handleNavigation('login')" 
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
      >
        Login
      </NuxtLink>
      <NuxtLink 
        to="/signup" 
        @click="handleNavigation('signup')" 
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
      >
        Sign Up
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '~/store/main' // Assuming you're using Pinia for state management

const props = defineProps({
  // Any props can be added here if needed
})

const emit = defineEmits(['login', 'signup'])

// Store and route
const mainStore = useMainStore()
const route = useRoute()

// Dropdown state
const isDropdownOpen = ref(false)

// Toggle dropdown
const toggleLoginDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside
const closeDropdown = (event) => {
  if (isDropdownOpen.value && !event.target.closest('.relative')) {
    isDropdownOpen.value = false
  }
}

// Handle navigation and store the current path
const handleNavigation = (action) => {
  // Store the current route path for redirection after login/signup
  mainStore.setLastVisitedPage(route.fullPath)
  
  // Close dropdown
  isDropdownOpen.value = false
  
  // Emit event for parent components that might need this info
  emit(action)
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
/* Add any component-specific styles if needed */
</style>
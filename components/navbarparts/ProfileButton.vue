<template>
  <div class="relative">
    <!-- Profile Icon Button -->
    <button 
      @click="toggleProfileMenu" 
      class="relative flex items-center justify-center w-9 h-9 rounded-full bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors duration-200"
    >
      <span v-if="userInitial" class="text-purple-600 font-medium">{{ userInitial }}</span>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <!-- Profile Dropdown Menu -->
    <div 
      v-show="profileMenuOpen" 
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100"
    >
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm font-medium text-gray-700">{{ userName }}</p>
        <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
      </div>
      <NuxtLink 
        to="/account" 
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
      >
        Profile
      </NuxtLink>
      <NuxtLink 
        to="/settings" 
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
      >
        Settings
      </NuxtLink>
      <NuxtLink 
        to="/notes" 
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
      >
        My Notes
      </NuxtLink>
      <div class="border-t border-gray-100">
        <button 
          @click="handleLogout" 
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    default: ''
  },
  userEmail: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['logout'])

// Inject store from App.vue
const store = inject('store')

// Computed property to get user initial for avatar
const userInitial = computed(() => {
  if (props.userName && props.userName.length > 0) {
    return props.userName.charAt(0).toUpperCase()
  }
  return null
})

// Profile dropdown state
const profileMenuOpen = ref(false)

// Toggle profile dropdown
const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
}

// Close profile menu when clicking outside
const closeProfileMenu = (event) => {
  if (profileMenuOpen.value && !event.target.closest('.relative')) {
    profileMenuOpen.value = false
  }
}

// Handle logout
const handleLogout = () => {
  store.logout()
  profileMenuOpen.value = false
  emit('logout')
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', closeProfileMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeProfileMenu)
})
</script>

<style scoped>
/* Add any component-specific styles if needed */
</style>
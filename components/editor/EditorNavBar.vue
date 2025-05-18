```vue
<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from '#app';

const props = defineProps({
  title: {
    type: String,
    default: 'Untitled Notebook'
  }
});

const emit = defineEmits(['update-title', 'save-notebook', 'load-notebook']);

// Inject store and isMobile
const store = inject('store');
const isMobile = inject('isMobile');

// Title editing
const isEditing = ref(false);
const editableTitle = ref(props.title);

const startEditing = () => {
  editableTitle.value = props.title;
  isEditing.value = true;
};

const finishEditing = () => {
  isEditing.value = false;
  emit('update-title', editableTitle.value);
};

// Save/Load dropdown
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event) => {
  if (isDropdownOpen.value && !event.target.closest('.dropdown-container')) {
    isDropdownOpen.value = false;
  }
};

const saveNotebook = () => {
  emit('save-notebook');
  isDropdownOpen.value = false;
};

const loadNotebook = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!file.name.endsWith('.gnb')) {
      alert('Please select a valid .gnb notebook file.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const notebookData = JSON.parse(e.target.result);
        if (!notebookData.pages || !Array.isArray(notebookData.pages)) {
          throw new Error('Invalid format');
        }
        emit('load-notebook', notebookData);
      } catch (error) {
        alert('Error loading notebook: Invalid format');
        console.error('Error parsing notebook file:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }
  isDropdownOpen.value = false;
};

const fileInputRef = ref(null);

const triggerFileInput = () => {
  fileInputRef.value.click();
};

// Account button
const isLoggedIn = computed(() => store.isLoggedIn.value);
const userInitial = computed(() => {
  const userName = store.userName;
  return typeof userName === 'string' && userName.length > 0
    ? userName.charAt(0).toUpperCase()
    : null;
});

const profileMenuOpen = ref(false);
const loginDropdownOpen = ref(false);

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value;
  loginDropdownOpen.value = false;
};

const toggleLoginDropdown = () => {
  loginDropdownOpen.value = !loginDropdownOpen.value;
  profileMenuOpen.value = false;
};

const closeProfileMenu = (event) => {
  if (profileMenuOpen.value && !event.target.closest('.profile-container')) {
    profileMenuOpen.value = false;
  }
};

const closeLoginDropdown = (event) => {
  if (loginDropdownOpen.value && !event.target.closest('.login-container')) {
    loginDropdownOpen.value = false;
  }
};

const handleLogout = () => {
  store.logout();
  profileMenuOpen.value = false;
};

const route = useRoute();
const handleNavigation = (action) => {
  store.setLastVisitedPage(route.fullPath);
  loginDropdownOpen.value = false;
  emit(action);
};

// Debug store state
watch([isLoggedIn, () => store.userName], ([newLoggedIn, newUserName]) => {
  console.log('Store state:', {
    isLoggedIn: newLoggedIn,
    userName: newUserName,
    userEmail: store.userEmail
  });
}, { immediate: true });

// Event listeners for dropdowns
onMounted(() => {
  document.addEventListener('click', closeDropdown);
  document.addEventListener('click', closeProfileMenu);
  document.addEventListener('click', closeLoginDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
  document.removeEventListener('click', closeProfileMenu);
  document.removeEventListener('click', closeLoginDropdown);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[150] bg-white shadow-md border-b border-gray-200 pt-safe"
    role="banner"
  >
    <div class="flex items-center justify-between px-3 py-2">
      <!-- Left: Logo and Title -->
      <div class="flex items-center flex-1 min-w-0">
        <!-- Dropdown Button -->
        <div class="dropdown-container relative">
          <button
            class="flex items-center gap-1 p-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-sm transition-colors"
            @click="toggleDropdown"
            role="button"
            aria-label="Notebook actions menu"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/book.svg"
              alt="Notebook icon"
              class="h-5 w-5"
            >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/chevron-down.svg"
              alt="Dropdown icon"
              class="h-4 w-4"
            >
          </button>
          <!-- Dropdown Menu -->
          <div
            v-show="isDropdownOpen"
            class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[150] border border-gray-100"
          >
            <button
              @click="saveNotebook"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            >
              Save
            </button>
            <button
              @click="triggerFileInput"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            >
              Load
            </button>
            <input
              ref="fileInputRef"
              type="file"
              accept=".gnb"
              @change="loadNotebook"
              class="hidden"
            />
          </div>
        </div>
        <!-- Title -->
        <div
          class="flex-grow ml-2 overflow-x-auto whitespace-nowrap scrollbar-thin max-w-[calc(100%-60px)]"
          @click="startEditing"
        >
          <span
            v-if="!isEditing"
            class="text-lg font-semibold text-gray-800 px-2 py-1 rounded hover:bg-gray-50 transition-colors whitespace-nowrap"
            aria-label="Notebook title"
          >
            {{ title }}
          </span>
          <input
            v-else
            ref="titleInput"
            v-model="editableTitle"
            @blur="finishEditing"
            @keyup.enter="finishEditing"
            class="text-lg font-semibold text-gray-800 px-2 py-1 border-b-2 border-purple-500 bg-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500 whitespace-nowrap"
            type="text"
            aria-label="Edit notebook title"
          />
        </div>
      </div>
      <!-- Right: Account Button -->
      <div class="flex items-center flex-shrink-0">
        <!-- Profile Button (Logged In) -->
        <div v-if="isLoggedIn" class="profile-container relative">
          <button
            @click="toggleProfileMenu"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors"
            aria-label="Profile menu"
          >
            <span v-if="userInitial" class="text-purple-600 font-medium">{{ userInitial }}</span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </button>
          <div
            v-show="profileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[150] border border-gray-100"
          >
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="text-sm font-medium text-gray-700">{{ store.userName || 'User' }}</p>
              <p class="text-xs text-gray-500 truncate">{{ store.userEmail || 'No email' }}</p>
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
              to="/your-notes"
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
        <!-- Login/Signup Button (Not Logged In) -->
        <div v-else class="login-container relative">
          <button
            @click="toggleLoginDropdown"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center"
            aria-label="Login or sign up"
          >
            Login/Sign Up
          </button>
          <div
            v-show="loginDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[150] border border-gray-100"
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
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Icon filters */
img[src*="lucide-static"] {
  filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

button:hover img[src*="lucide-static"] {
  filter: invert(40%) sepia(57%) saturate(5135%) hue-rotate(247deg) brightness(98%) contrast(96%);
}

.bg-purple-600 img[src*="lucide-static"],
.bg-purple-700 img[src*="lucide-static"] {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #BD93F9;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #A775F0;
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Safe area for mobile */
.pt-safe {
  padding-top: env(safe-area-inset-top);
}
</style>
```
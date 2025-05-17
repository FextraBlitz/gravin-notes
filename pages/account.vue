```vue
<script setup>
import { ref, computed, inject, watch, onMounted } from 'vue';
import { useRouter, useFetch } from '#app';

console.log('Account page setup');

definePageMeta({
  title: 'Manage Your Account',
});

const router = useRouter();
const store = inject('store');

// Initialize user data if null
if (!store.user.value) {
  store.user.value = {
    username: '',
    email: '',
    contact: '',
    address: '',
    school: ''
  };
}

const initialState = ref({});
const errors = ref({});
const isSaving = ref(false);
const showLogoutConfirm = ref(false);
const localLoading = ref(true);
const saveSuccess = ref(false);
const isEditing = ref({
  username: false,
  email: false,
  contact: false,
  address: false,
  school: false
});

// Computed user data with fallback
const userData = computed(() => store.user.value || {
  username: '',
  email: '',
  contact: '',
  address: '',
  school: ''
});

// Debug user data on mount
onMounted(() => {
  console.log('Account mounted, store.user:', store.user.value);
  console.log('store.isLoggedIn:', store.isLoggedIn.value);
  console.log('localStorage.user:', localStorage.getItem('user'));
  console.log('initialState:', initialState.value);
});

// Initialize initialState
watch(
  () => store.isLoading.value,
  (newValue) => {
    console.log('Store loading state changed:', newValue);
    if (!newValue && store.user.value) {
      initialState.value = { ...store.user.value };
      localLoading.value = false;
      console.log('initialState set:', initialState.value);
    }
  },
  { immediate: true }
);

// Watch user and loading states
watch(() => store.user.value, (newVal) => {
  console.log('User value changed:', newVal);
}, { immediate: true });

watch(() => store.isLoading.value, (newVal) => {
  console.log('Global loading state:', newVal);
}, { immediate: true });

watch(() => localLoading.value, (newVal) => {
  console.log('Local loading state:', newVal);
});

const hasChanges = computed(() => {
  if (!store.user.value || !initialState.value) {
    console.log('hasChanges: false (null user or initialState)');
    return false;
  }
  const changes = Object.keys(userData.value).some(key => store.user.value[key] !== initialState.value[key]);
  console.log('hasChanges:', changes);
  return changes;
});

const validateForm = () => {
  errors.value = {};
  if (!store.user.value?.username?.trim()) errors.value.username = 'Username is required';
  if (!store.user.value?.email?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.value.email = 'Valid email is required';
  if (store.user.value?.contact && !store.user.value.contact.match(/^\+?\d{10,15}$/)) errors.value.contact = 'Valid phone number is required';
  if (store.user.value?.address && !store.user.value.address.trim()) errors.value.address = 'Address cannot be empty';
  if (store.user.value?.school && !store.user.value.school.trim()) errors.value.school = 'School cannot be empty';
  return Object.keys(errors.value).length === 0;
};

const saveProfile = async () => {
  if (!validateForm()) return;
  isSaving.value = true;
  saveSuccess.value = false;
  try {
    await store.updateUser(store.user.value);
    initialState.value = { ...store.user.value };
    console.log('Profile updated:', store.user.value);
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3000);
  } catch (err) {
    console.error('Error saving profile:', err);
    errors.value.form = 'Failed to save profile. Please try again.';
  } finally {
    isSaving.value = false;
  }
};

const resetForm = () => {
  router.push('/');
};

const handleLogout = () => {
  showLogoutConfirm.value = true;
};

const confirmLogout = () => {
  store.logout();
  showLogoutConfirm.value = false;
  router.push('/');
};

const toggleEditing = (field, state) => {
  isEditing.value[field] = state;
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <main class="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
      <h1 class="text-xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-10">
        Manage Your Account
      </h1>

      <!-- Loading state -->
      <div v-if="localLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-r-transparent"></div>
        <p class="mt-4 text-gray-600 text-sm sm:text-base">Loading your account information...</p>
      </div>

      <!-- User logged in state -->
      <div v-else-if="store.isLoggedIn" class="flex flex-col gap-6">
        <!-- Success message -->
        <div
          v-if="saveSuccess"
          class="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r flex items-center transition-opacity duration-300"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/check-circle.svg"
            alt="Success icon"
            class="h-5 w-5 text-purple-400 mr-2"
          >
          <span class="text-gray-700 text-sm sm:text-base">Profile updated successfully!</span>
        </div>

        <!-- Form error message -->
        <div v-if="errors.form" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
          <p class="text-red-600 text-sm sm:text-base">{{ errors.form }}</p>
        </div>

        <!-- Form card -->
        <form
          @submit.prevent="saveProfile"
          class="bg-white rounded-md shadow-lg p-6 sm:p-8 border-2 border-purple-400 hover:border-purple-500 flex flex-col gap-4"
        >
          <!-- Username -->
          <div class="flex flex-col gap-2 relative">
            <label for="username" class="text-sm sm:text-base font-medium text-gray-600">
              Username
            </label>
            <input
              id="username"
              v-model="userData.username"
              type="text"
              class="p-2 text-sm sm:text-base text-gray-900 rounded-lg focus:outline-none focus:border-gray-200 focus:bg-gray-50 focus:shadow-sm focus:ring-2 focus:ring-purple-500 hover:border-gray-200 hover:bg-white hover:shadow-sm"
              :class="{ 'border-gray-200 bg-gray-50 shadow-sm': isEditing.username, 'border-none bg-transparent': !isEditing.username, 'border-red-500': errors.username }"
              placeholder="Enter your username"
              aria-required="true"
              @focus="toggleEditing('username', true)"
              @blur="toggleEditing('username', false)"
            />
            <img
              v-if="!isEditing.username"
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit-2.svg"
              alt="Edit icon"
              class="h-4 w-4 text-gray-600 absolute right-2 top-1/2 translate-y-1/4"
            >
            <p v-if="errors.username" class="text-red-500 text-xs sm:text-sm">{{ errors.username }}</p>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2 relative">
            <label for="email" class="text-sm sm:text-base font-medium text-gray-600">
              Email Address
            </label>
            <input
              id="email"
              v-model="userData.email"
              type="email"
              class="p-2 text-sm sm:text-base text-gray-900 rounded-lg focus:outline-none focus:border-gray-200 focus:bg-gray-50 focus:shadow-sm focus:ring-2 focus:ring-purple-500 hover:border-gray-200 hover:bg-white hover:shadow-sm"
              :class="{ 'border-gray-200 bg-gray-50 shadow-sm': isEditing.email, 'border-none bg-transparent': !isEditing.email, 'border-red-500': errors.email }"
              placeholder="Enter your email address"
              aria-required="true"
              @focus="toggleEditing('email', true)"
              @blur="toggleEditing('email', false)"
            />
            <img
              v-if="!isEditing.email"
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit-2.svg"
              alt="Edit icon"
              class="h-4 w-4 text-gray-600 absolute right-2 top-1/2 translate-y-1/4"
            >
            <p v-if="errors.email" class="text-red-500 text-xs sm:text-sm">{{ errors.email }}</p>
          </div>

          <!-- Contact -->
          <div class="flex flex-col gap-2 relative">
            <label for="contact" class="text-sm sm:text-base font-medium text-gray-600">
              Contact Number
            </label>
            <input
              id="contact"
              v-model="userData.contact"
              type="tel"
              class="p-2 text-sm sm:text-base text-gray-900 rounded-lg focus:outline-none focus:border-gray-200 focus:bg-gray-50 focus:shadow-sm focus:ring-2 focus:ring-purple-500 hover:border-gray-200 hover:bg-white hover:shadow-sm"
              :class="{ 'border-gray-200 bg-gray-50 shadow-sm': isEditing.contact, 'border-none bg-transparent': !isEditing.contact, 'border-red-500': errors.contact }"
              placeholder="Enter your contact number"
              @focus="toggleEditing('contact', true)"
              @blur="toggleEditing('contact', false)"
            />
            <img
              v-if="!isEditing.contact"
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit-2.svg"
              alt="Edit icon"
              class="h-4 w-4 text-gray-600 absolute right-2 top-1/2 translate-y-1/4"
            >
            <p v-if="errors.contact" class="text-red-500 text-xs sm:text-sm">{{ errors.contact }}</p>
          </div>

          <!-- Address -->
          <div class="flex flex-col gap-2 relative">
            <label for="address" class="text-sm sm:text-base font-medium text-gray-600">
              Address
            </label>
            <input
              id="address"
              v-model="userData.address"
              type="text"
              class="p-2 text-sm sm:text-base text-gray-900 rounded-lg focus:outline-none focus:border-gray-200 focus:bg-gray-50 focus:shadow-sm focus:ring-2 focus:ring-purple-500 hover:border-gray-200 hover:bg-white hover:shadow-sm"
              :class="{ 'border-gray-200 bg-gray-50 shadow-sm': isEditing.address, 'border-none bg-transparent': !isEditing.address, 'border-red-500': errors.address }"
              placeholder="Enter your address"
              @focus="toggleEditing('address', true)"
              @blur="toggleEditing('address', false)"
            />
            <img
              v-if="!isEditing.address"
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit-2.svg"
              alt="Edit icon"
              class="h-4 w-4 text-gray-600 absolute right-2 top-1/2 translate-y-1/4"
            >
            <p v-if="errors.address" class="text-red-500 text-xs sm:text-sm">{{ errors.address }}</p>
          </div>

          <!-- School -->
          <div class="flex flex-col gap-2 relative">
            <label for="school" class="text-sm sm:text-base font-medium text-gray-600">
              School
            </label>
            <input
              id="school"
              v-model="userData.school"
              type="text"
              class="p-2 text-sm sm:text-base text-gray-900 rounded-lg focus:outline-none focus:border-gray-200 focus:bg-gray-50 focus:shadow-sm focus:ring-2 focus:ring-purple-500 hover:border-gray-200 hover:bg-white hover:shadow-sm"
              :class="{ 'border-gray-200 bg-gray-50 shadow-sm': isEditing.school, 'border-none bg-transparent': !isEditing.school, 'border-red-500': errors.school }"
              placeholder="Enter your school"
              @focus="toggleEditing('school', true)"
              @blur="toggleEditing('school', false)"
            />
            <img
              v-if="!isEditing.school"
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit-2.svg"
              alt="Edit icon"
              class="h-4 w-4 text-gray-600 absolute right-2 top-1/2 translate-y-1/4"
            >
            <p v-if="errors.school" class="text-red-500 text-xs sm:text-sm">{{ errors.school }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col max-[400px]:flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              type="button"
              @click="handleLogout"
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm sm:text-base"
              aria-label="Logout"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/log-out.svg"
                alt="Logout icon"
                class="h-4 w-4"
              >
              Logout
            </button>
            <button
              type="button"
              @click="resetForm"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2 text-sm sm:text-base"
              aria-label="Cancel and return to homepage"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x.svg"
                alt="Cancel icon"
                class="h-4 w-4"
              >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!hasChanges || isSaving"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
              aria-label="Apply changes"
            >
              <img
                v-if="!isSaving"
                src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/save.svg"
                alt="Save icon"
                class="h-4 w-4"
              >
              <div v-else class="animate-spin h-4 w-4 border-2 border-white border-r-transparent rounded-full"></div>
              {{ isSaving ? 'Saving...' : 'Apply' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Not logged in state -->
      <div v-else class="bg-white rounded-md shadow-lg p-6 sm:p-8 border-2 border-purple-400 text-center">
        <p class="text-gray-700 text-sm sm:text-base mb-6">You must be logged in to manage your account.</p>
        <div class="flex flex-col max-[400px]:flex-col sm:flex-row justify-center gap-2">
          <NuxtLink
            to="/"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/home.svg"
              alt="Home icon"
              class="h-4 w-4"
            >
            Return to Homepage
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/log-in.svg"
              alt="Login icon"
              class="h-4 w-4"
            >
            Log In or Sign Up
          </NuxtLink>
        </div>
      </div>
    </main>

    <!-- Logout confirmation modal -->
    <div
      v-if="showLogoutConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[200]"
    >
      <div class="bg-white rounded-md shadow-lg max-w-md w-full p-6 sm:p-8 border-2 border-purple-400">
        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h3>
        <p class="text-gray-600 text-sm sm:text-base mb-6">Are you sure you want to logout from your account?</p>
        <div class="flex flex-col max-[400px]:flex-col sm:flex-row justify-end gap-2">
          <button
            @click="showLogoutConfirm = false"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x.svg"
              alt="Cancel icon"
              class="h-4 w-4"
            >
            Cancel
          </button>
          <button
            @click="confirmLogout"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/log-out.svg"
              alt="Logout icon"
              class="h-4 w-4"
            >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>

    <footer class="bg-white border-t border-gray-200 p-4 sm:p-6 text-center text-gray-600">
      <div class="inline-flex gap-4 sm:gap-6">
        <NuxtLink to="/about" class="text-purple-600 hover:text-purple-700 text-sm sm:text-base transition-colors">
          About Us
        </NuxtLink>
        <NuxtLink to="/faq" class="text-purple-600 hover:text-purple-700 text-sm sm:text-base transition-colors">
          FAQ
        </NuxtLink>
        <NuxtLink to="/site-map" class="text-purple-600 hover:text-purple-700 text-sm sm:text-base transition-colors">
          Site Map
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Icon filters */
img[src*="lucide-static"] {
  filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

img[src*="edit-2"] {
  filter: invert(40%) sepia(10%) saturate(500%) hue-rotate(180deg) brightness(90%) contrast(90%);
}

.bg-purple-600 img[src*="lucide-static"],
.bg-purple-700 img[src*="lucide-static"],
.bg-red-500 img[src*="lucide-static"],
.bg-red-600 img[src*="lucide-static"],
.bg-gray-200 img[src*="lucide-static"],
.bg-gray-300 img[src*="lucide-static"] {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #BD93F9;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A775F0;
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}
</style>
```
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useState } from '#app';
import { useFetch } from '#app';

// Define page metadata for SEO
definePageMeta({
  title: 'Manage Your Account',
});

// Nuxt router
const router = useRouter();

// Reactive state for user data, persisted across navigation
const user = useState('user', () => ({
  displayName: '',
  email: '',
  contactNumber: '',
  school: '',
  address: '',
}));

// Track initial state for change detection
const initialState = ref({ ...user.value });
const hasChanges = computed(() => {
  return (
    user.value.displayName !== initialState.value.displayName ||
    user.value.email !== initialState.value.email ||
    user.value.contactNumber !== initialState.value.contactNumber ||
    user.value.school !== initialState.value.school ||
    user.value.address !== initialState.value.address
  );
});

// Form validation
const errors = ref({});
const validateForm = () => {
  errors.value = {};
  if (!user.value.displayName.trim()) errors.value.displayName = 'Display name is required';
  if (!user.value.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.value.email = 'Valid email is required';
  if (user.value.contactNumber && !user.value.contactNumber.match(/^\+?\d{10,15}$/)) errors.value.contactNumber = 'Valid phone number is required';
  return Object.keys(errors.value).length === 0;
};

// Fetch initial user data
const { data, error, pending } = await useFetch('/api/user', {
  method: 'GET',
  server: true, // Enable SSR
  onResponse({ response }) {
    if (response.ok) {
      user.value = response._data;
      initialState.value = { ...response._data };
    }
  },
});

// Save profile changes
const isSaving = ref(false);
const saveProfile = async () => {
  if (!validateForm()) return;
  isSaving.value = true;
  try {
    const { data } = await useFetch('/api/user', {
      method: 'PUT',
      body: user.value,
    });
    if (data.value) {
      initialState.value = { ...user.value };
      console.log('Profile updated:', data.value);
    }
  } catch (err) {
    console.error('Error saving profile:', err);
    errors.value.form = 'Failed to save profile. Please try again.';
  } finally {
    isSaving.value = false;
  }
};

// Logout confirmation
const showLogoutConfirm = ref(false);
const handleLogout = () => {
  showLogoutConfirm.value = true;
};
const confirmLogout = () => {
  console.log('Logging out...');
  // Clear user state
  user.value = { displayName: '', email: '', contactNumber: '', school: '', address: '' };
  showLogoutConfirm.value = false;
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <main class="flex-1 p-4 sm:p-6">
      <div class="container mx-auto">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">Manage Your Account</h1>
        <!-- Loading State -->
        <div v-if="pending" class="text-center text-gray-600">Loading...</div>
        <!-- Error State -->
        <div v-else-if="error" class="text-center text-red-500">Failed to load user data. Please try again.</div>
        <!-- Main Content -->
        <div v-else class="flex flex-col md:flex-row gap-6 sm:gap-8">
          <!-- Left Section -->
          <div class="w-full md:w-1/3 flex flex-col gap-4 items-center md:items-start">
            <div class="w-32 h-32 rounded-full bg-gray-200 border-2 border-dashed border-gray-300"></div>
            <button
              class="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              aria-label="Edit avatar"
            >
              Edit Avatar
            </button>
            <button
              class="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              aria-label="Change password"
            >
              Change Password
            </button>
            <button
              @click="handleLogout"
              class="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
          <!-- Right Section -->
          <div class="w-full md:w-2/3 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label for="display-name" class="text-gray-700 font-medium">Display Name</label>
              <input
                id="display-name"
                v-model="user.displayName"
                type="text"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Enter your display name"
                :class="{ 'border-red-500': errors.displayName }"
              />
              <p v-if="errors.displayName" class="text-red-500 text-sm">{{ errors.displayName }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <label for="email" class="text-gray-700 font-medium">Email Address</label>
              <input
                id="email"
                v-model="user.email"
                type="email"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Enter your email address"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <label for="contact-number" class="text-gray-700 font-medium">Contact Number</label>
              <input
                id="contact-number"
                v-model="user.contactNumber"
                type="text"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Enter your contact number"
                :class="{ 'border-red-500': errors.contactNumber }"
              />
              <p v-if="errors.contactNumber" class="text-red-500 text-sm">{{ errors.contactNumber }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <label for="school" class="text-gray-700 font-medium">School / University (If applicable)</label>
              <input
                id="school"
                v-model="user.school"
                type="text"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Enter your school/university"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="address" class="text-gray-700 font-medium">Address</label>
              <input
                id="address"
                v-model="user.address"
                type="text"
                class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Enter your address"
              />
            </div>
            <p v-if="errors.form" class="text-red-500 text-sm">{{ errors.form }}</p>
            <button
              @click="saveProfile"
              :disabled="!hasChanges || isSaving"
              class="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              aria-label="Save profile"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </main>
    <!-- Logout Confirmation Dialog -->
    <div
      v-if="showLogoutConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg flex flex-col gap-4">
        <p class="text-gray-800">Are you sure you want to logout?</p>
        <div class="flex gap-4">
          <button
            @click="confirmLogout"
            class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Yes, Logout
          </button>
          <button
            @click="showLogoutConfirm = false"
            class="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <footer class="bg-gray-100 p-6 text-center text-gray-600">
      <div class="inline-flex gap-4">
        <NuxtLink to="/about" class="text-purple-500 hover:underline">About Us</NuxtLink>
        <span>|</span>
        <NuxtLink to="/faq" class="text-purple-500 hover:underline">FAQ</NuxtLink>
        <span>|</span>
        <NuxtLink to="/sitemap" class="text-purple-500 hover:underline">Site Map</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Minimal custom CSS since Tailwind handles most styling */
</style>
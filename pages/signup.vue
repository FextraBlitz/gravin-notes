<script setup>
import { ref, inject } from 'vue';
import { useRouter } from '#app';

// Define page metadata
definePageMeta({
  title: 'Sign Up',
  hideDefaultNavbar: true,
});

// Nuxt router
const router = useRouter();

// Inject store
const store = inject('store');

// Reactive state
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const isLoading = ref(false);

// Sign up handler
const handleSignUp = async () => {
  isLoading.value = true;
  try {
    const redirectPath = await store.registerUser({
      name: username.value, // Using 'name' as param to match store.registerUser
      email: email.value,
      password: password.value,
    });
    router.push(redirectPath);
  } catch (error) {
    console.error('Sign up error:', error);
    alert(error.message || 'Error creating account. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

// Toggle password visibility
const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    passwordVisible.value = !passwordVisible.value;
  } else {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">Create Account</h1>
      <p class="text-gray-600 text-center">Sign up to start using GRAVIN Notes.</p>
      
      <!-- Form -->
      <div class="flex flex-col gap-4">
        <!-- Username -->
        <div class="flex flex-col gap-2">
          <label for="username" class="text-gray-700 font-medium">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Enter your username"
            aria-label="Username"
          />
        </div>
        
        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label for="email" class="text-gray-700 font-medium">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Enter your email"
            aria-label="Email address"
          />
        </div>
        
        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label for="password" class="text-gray-700 font-medium">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              class="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-10"
              placeholder="Enter your password"
              aria-label="Password"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
              @click="togglePasswordVisibility('password')"
              type="button"
              aria-label="Toggle password visibility"
            >
              <img
                :src="passwordVisible ? 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye-off.svg' : 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye.svg'"
                :alt="passwordVisible ? 'Hide Password' : 'Show Password'"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
        
        <!-- Confirm Password -->
        <div class="flex flex-col gap-2">
          <label for="confirmPassword" class="text-gray-700 font-medium">Confirm Password</label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              class="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-10"
              placeholder="Confirm your password"
              aria-label="Confirm password"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
              @click="togglePasswordVisibility('confirm')"
              type="button"
              aria-label="Toggle confirm password visibility"
            >
              <img
                :src="confirmPasswordVisible ? 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye-off.svg' : 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye.svg'"
                :alt="confirmPasswordVisible ? 'Hide Password' : 'Show Password'"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
        
        <!-- Sign Up Button -->
        <button
          @click="handleSignUp"
          :disabled="isLoading"
          class="relative w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed overflow-hidden transition-colors ripple"
          aria-label="Create Account"
        >
          <span class="relative z-10">{{ isLoading ? 'Creating Account...' : 'Create Account' }}</span>
        </button>
      </div>
      
      <!-- Divider -->
      <div class="flex items-center gap-2 text-gray-400">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span>Or</span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>
      
      <!-- Google Sign Up -->
      <button
        class="relative w-full py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-4 overflow-hidden transition-colors ripple"
        aria-label="Sign up with Google"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          class="w-6 h-6 fill-current text-purple-500"
        />
        <span class="relative z-10">Sign up with Google</span>
      </button>
      
      <!-- Login Prompt -->
      <p class="text-center text-gray-600">
        Already have an account?
        <NuxtLink to="/login" class="text-purple-500 hover:underline">Log in here</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Ripple effect for Material Design buttons */
.ripple {
  position: relative;
}
.ripple::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: inherit;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  pointer-events: none;
}
.ripple:active::before {
  transform: scale(2);
  opacity: 1;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .min-h-screen {
    padding: 1rem;
  }
}
</style>
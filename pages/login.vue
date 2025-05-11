<script setup>
import { ref } from 'vue';
import { useRouter, useFetch } from '#app';

// Define page metadata for SEO
definePageMeta({
  title: 'Sign In',
  hideDefaultNavbar: true,
});

// Nuxt router
const router = useRouter();

// Reactive state for form inputs
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const passwordVisible = ref(false);
const errors = ref({});
const isLoading = ref(false);

// Form validation
const validateForm = () => {
  errors.value = {};
  if (!email.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.value.email = 'Valid email is required';
  if (password.value.length < 6) errors.value.password = 'Password must be at least 6 characters';
  return Object.keys(errors.value).length === 0;
};

// Login handler
const login = async () => {
  if (!validateForm()) return;
  isLoading.value = true;
  try {
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: { 
        email: email.value, 
        password: password.value, 
        rememberMe: rememberMe.value 
      },
    });
    if (error.value) throw new Error(error.value.message);
    if (data.value) {
      console.log('Login successful:', data.value);
      if (rememberMe.value) {
        console.log('Storing credentials for rememberMe');
      }
      router.push('/');
    }
  } catch (err) {
    console.error('Login error:', err);
    errors.value.form = 'Invalid email or password. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">Sign In</h1>
      <p class="text-gray-600 text-center">Log in by entering your email address and password.</p>
      
      <!-- Form -->
      <div class="flex flex-col gap-4">
        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label for="email" class="text-gray-700 font-medium">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Enter your email"
            :class="{ 'border-red-500': errors.email }"
            aria-label="Email address"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
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
              :class="{ 'border-red-500': errors.password }"
              aria-label="Password"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
              @click="togglePasswordVisibility"
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
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
          <NuxtLink to="/forgot-password" class="text-sm text-purple-500 hover:underline text-right">Forgot password?</NuxtLink>
        </div>
        
        <!-- Form Error -->
        <p v-if="errors.form" class="text-red-500 text-sm text-center">{{ errors.form }}</p>
        
        <!-- Remember Me -->
        <div class="flex items-center gap-2">
          <input
            id="rememberMe"
            v-model="rememberMe"
            type="checkbox"
            class="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500/20"
            aria-label="Remember me"
          />
          <label for="rememberMe" class="text-gray-700">Remember me</label>
        </div>
        
        <!-- Login Button -->
        <button
          @click="login"
          :disabled="isLoading"
          class="relative w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed overflow-hidden transition-colors ripple"
          aria-label="Log in"
        >
          <span class="relative z-10">{{ isLoading ? 'Logging In...' : 'Log In' }}</span>
        </button>
      </div>
      
      <!-- Divider -->
      <div class="flex items-center gap-2 text-gray-400">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span>Or</span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>
      
      <!-- Google Login -->
      <button
        class="relative w-full py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-4 overflow-hidden transition-colors ripple"
        aria-label="Sign in with Google"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          class="w-6 h-6 fill-current text-purple-500"
        />
        <span class="relative z-10">Sign in with Google</span>
      </button>
      
      <!-- Signup Prompt -->
      <p class="text-center text-gray-600">
        Don't have an account?
        <NuxtLink to="/signup" class="text-purple-500 hover:underline">Sign up here</NuxtLink>
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

/* Checkbox styling */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  padding: 0;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:before {
  content: '';
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

input[type="checkbox"]:checked:before {
  background: #9580FF;
  border-color: #9580FF;
}

input[type="checkbox"]:after {
  content: '';
  display: block;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
  opacity: 0;
}

input[type="checkbox"]:checked:after {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .min-h-screen {
    padding: 1rem;
  }
}
</style>
<template>
  <nav class="bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/assets/icons/logo.png" class="h-8" alt="Gravin Notes Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Gravin Notes</span>
      </NuxtLink>

      <!-- Hamburger Menu Button -->
      <button
        @click="toggleMenu"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Navigation Links -->
      <div
        :class="['w-full md:block md:w-auto', isMenuOpen ? 'block' : 'hidden']"
        id="navbar-default"
      >
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <NuxtLink to="#" class="text-white hover:text-gray-300">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="text-white hover:text-gray-300">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="text-white hover:text-gray-300">Services</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="text-white hover:text-gray-300">Pricing</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="text-white hover:text-gray-300">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// State to track whether the menu is open
const isMenuOpen = ref(false);

// Function to toggle the menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
</style>
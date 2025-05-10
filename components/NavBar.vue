<template>
  <nav class="flex justify-between items-center bg-gray-100 py-4 px-6 shadow-sm border-b border-gray-200">
    <!-- Left Section: Logo and Navigation Links -->
    <div class="flex items-center gap-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center logo">
        <img src="/assets/icons/image1.png" alt="Gravin Notes Logo" class="w-8 h-8">
        <span class="ml-2 font-semibold text-gray-800 text-lg tracking-tight ">Gravin Notes</span>
      </NuxtLink>
      <!-- Navigation Links -->
      <nav class="flex gap-8 text-gray-600 font-medium">
        <NuxtLink to="/ai-summarizer" class="hover:text-gray-900 transition-colors duration-200 relative group">
          AI Summarizer
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300"></span>
        </NuxtLink>
        <NuxtLink to="/editor" class="hover:text-gray-900 transition-colors duration-200 relative group">
          Editor
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300"></span>
        </NuxtLink>
      </nav>
    </div>
    <!-- Right Section: Links -->
    <div class="flex gap-6 text-sm font-medium items-center">
      <a href="/DesktopContact.html" class="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center">Contact</a>
      <NuxtLink to="/DesktopLogin" class="px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer">Login/Sign Up</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
// No additional logic is required for this static navbar
</script>

<style scoped>
/* Clean hover effects and transitions */
a {
  position: relative;
}

/* Active link styling */
a.router-link-active:not([to="/"]) {
  color: #1a202c; /* gray-900 */
  font-weight: 600;
}

a.router-link-active:not([to="/"]):after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1a202c; /* gray-900 */
}

.logo{
  text-decoration: none !important; 
}
</style>
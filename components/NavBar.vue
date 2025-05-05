<template>
  <nav class="flex justify-between items-center bg-gray-200 p-4">
    <!-- Left Section: Logo and Navigation Links -->
    <div class="flex items-center gap-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/assets/icons/image1.png" alt="Gravin Notes Logo" class="w-10 h-10">
      </NuxtLink>
      <!-- Navigation Links -->
      <nav class="flex gap-6 text-gray-800 font-medium">
        <NuxtLink to="/ai-summarizer" class="hover:text-gray-500">AI Summarizer</NuxtLink>
        <NuxtLink to="/notes" class="hover:text-gray-500">Notes</NuxtLink>
      </nav>
    </div>

    <!-- Right Section: Links -->
    <div class="flex gap-4 text-sm font-medium">
      <a href="/DesktopContact.html" class="hover:text-gray-500">Contact</a>
      <NuxtLink to="/DesktopLogin" class="hover:text-gray-500">Login/Sign Up</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
// No additional logic is required for this static navbar
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
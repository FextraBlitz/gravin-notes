<template>
  <div class="flex flex-col items-center justify-center h-screen p-5 bg-gray-100">
    <div class="mb-10">
      <!-- Logo Box -->
      <img src="/assets/icons/logo.png" alt="Gravin Notes Logo" class="h-30 w-30 object-contain ml-7" />
    </div>
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2" style="color: #000000;">GRAVIN Notes</h1>
      <p class="text-lg leading-relaxed" style="color: #666666;">
        Your Smart Workspace <br> for Notes, Ideas, and <br> AI-Powered Insights
      </p>
    </div>
    <button
      class="py-3 px-10 rounded-lg text-lg hover:bg-gray-900 transition duration-300"
      style="background-color: #000000; color: #ffffff;"
      @click="$emit('navigateToHomepage')"
    >
      Get Started
    </button>
  </div>
</template>

<script setup>
</script>
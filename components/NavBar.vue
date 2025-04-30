<template>
    

<nav class="bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <NuxtLink to="/" class="flex items-center">
        <img src="/assets/icons/logo.png" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gravin Notes</span>
    </NuxtLink>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NuxtLink to="#" class="text-white">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#" class="text-white">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#" class="text-white">Services</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#" class="text-white">Pricing</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#" class="text-white">Contact</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>

<script setup>

</script>

<style scoped>
@layer base {
  html {
    background-color: black;
  }
}
</style>
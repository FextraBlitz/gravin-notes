<template>
  <nav class="navbar">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <!-- Left Section: Logo and Links -->
      <div class="flex items-center space-x-8">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <div class="logo-box flex items-center justify-center bg-gray-300 w-12 h-12 rounded-md">
            <img src="/assets/icons/logo.png" class="h-20 w-20 object-contain" alt="Gravin Notes Logo" />
          </div>
        </NuxtLink>

        <!-- Navigation Links (Left) -->
        <ul class="flex items-center space-x-8 text-gray-700 font-medium">
          <li>
            <NuxtLink to="/ai-summarizer" class="hover:text-gray-500">AI Summarizer</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/notes" class="hover:text-gray-500">Notes</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Right Section: Links -->
      <ul class="flex items-center space-x-8 text-gray-700 font-medium">
        <li>
          <NuxtLink to="/contact" class="hover:text-gray-500">Contact</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/DesktopLogin" class="hover:text-gray-500">Login/Sign Up</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// No additional logic is required for this static navbar
</script>

<style scoped>
/* Navbar container */
.navbar {
  background-color: #D6D6D6; /* Light gray background */
  border-bottom: 1px solid #ccc; /* Subtle border for separation */
}

/* Navigation links */
ul {
  display: flex;
  gap: 20px;
}

ul li a {
  text-decoration: none;
  color: #333; /* Default text color */
  font-size: 1rem;
  font-weight: 500;
}

ul li a:hover {
  color: #007bff; /* Hover color */
}
</style>
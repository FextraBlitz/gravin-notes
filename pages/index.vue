<template>
  <div class="page-container">
    <LandingPage />
    <!-- Footer -->
    <footer class="footer">
      <p class="space-x-4">
        <a href="/DesktopAboutUs.html">About Us</a> |
        <a href="/DesktopFAQ.html">FAQ</a> |
        <a href="/site-map">Site Map</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
// No additional logic is required
</script>

<style scoped>
/* Flexbox container to ensure footer stays at the bottom */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full height of the viewport */
}

/* Push the footer to the bottom */
.footer {
  margin-top: auto; /* Pushes the footer to the bottom */
  background-color: #f9f9f9; /* Optional: Light background for the footer */
  padding: 1rem 0;
  text-align: center;
  font-size: 0.875rem; /* Small text */
  color: #555;
}
</style>
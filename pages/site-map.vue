<script setup>
// Define page metadata for SEO
definePageMeta({
  title: 'Site Map',
});

// No additional logic is required for this static page
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <main class="flex-1 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">GRAVIN Notes Site Map</h1>
        
        <div class="flex flex-col md:flex-row gap-12 items-start">
          <!-- Site Map Links -->
          <div class="w-full md:w-1/2 flex flex-col gap-8">
            <!-- About Us Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">About Us</h2>
              <ul class="flex flex-col gap-3 ml-1">
                <li>
                  <a href="/about-us" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    Group Profile
                  </a>
                </li>
                <li>
                  <a href="/about-us" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    About GRAVIN Notes
                  </a>
                </li>
              </ul>
            </div>
            
            <!-- Notes Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Notes</h2>
              <ul class="flex flex-col gap-3 ml-1">
                <li>
                  <NuxtLink to="/your-notes" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    Your Notes
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- AI Summarizer Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">AI Summarizer</h2>
              <ul class="flex flex-col gap-3 ml-1">
                <li>
                  <NuxtLink to="/upload-pdf" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    Upload a PDF
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/notebooks" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    Notebooks
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- Account Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Account</h2>
              <ul class="flex flex-col gap-3 ml-1">
                <li>
                  <NuxtLink to="/account" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    Manage Your Account
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/signup" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors">
                    Create an Account
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Site Map Image -->
          <div class="w-full md:w-1/2 flex justify-center">
            <div class="bg-white rounded-lg shadow-md p-6 w-full aspect-square flex items-center justify-center">
              <div class="relative h-full w-full flex items-center justify-center">
                <!-- Replace with actual image path or use a placeholder -->
                <img 
                  src="/images/sitemap.png" 
                  alt="Site Map Illustration" 
                  class="max-w-full max-h-full object-contain"
                  aria-label="Visual representation of site structure"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-white shadow-md-up py-6 mt-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-center items-center">
          <nav aria-label="Footer navigation">
            <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li>
                <NuxtLink to="/about-us" class="text-gray-600 hover:text-purple-500 transition-colors">
                  About Us
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <span class="text-gray-300">|</span>
              </li>
              <li>
                <NuxtLink to="/faq" class="text-gray-600 hover:text-purple-500 transition-colors">
                  FAQ
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <span class="text-gray-300">|</span>
              </li>
              <li>
                <NuxtLink to="/site-map" class="text-purple-500 font-medium">
                  Site Map
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Shadow for cards */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Shadow for footer (from top) */
.shadow-md-up {
  box-shadow: 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Transitions for hover states */
a {
  transition: color 0.2s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flex-col {
    gap: 1.5rem;
  }
  
  .max-w-6xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
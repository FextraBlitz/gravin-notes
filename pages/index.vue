<template>
  <div class="page-container">
    <main class="w-full">
      <!-- Video Banner Section -->
      <section class="banner relative overflow-hidden">
        <div class="absolute inset-0 z-0">
          <video
            autoplay
            muted
            loop
            playsinline
            class="w-full h-full object-cover opacity-85"
          >
            <source src="/videos/notebook-banner.mp4" type="video/mp4">
            <img src="/images/notebook-banner-fallback.jpg" alt="Markdown notebook interface">
          </video>
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/10"></div>
        </div>
        <div class="relative z-10 h-[80vh] sm:h-screen flex items-center justify-center text-center px-4">
          <div class="max-w-3xl backdrop-blur-md bg-white/10 p-6 sm:p-10 rounded-xl space-y-6 border border-white/10 shadow-2xl">
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
              Gravin Notebooks
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl text-gray-200 font-light mb-8">
              A minimalist writing experience with simple formatting and save features.
            </p>
            <div class="flex justify-center">
              <button 
                @click="navigateToEditor"
                class="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 sm:py-24 bg-gray-100">
        <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16 tracking-tight">Key Features</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <!-- Feature Cards -->
            <div class="p-6 sm:p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl border border-gray-200 hover:border-gray-300 hover:transform hover:-translate-y-1 group">
              <div class="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Lightweight Design</h3>
              <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                Experience blazing-fast performance with our minimal 2MB client. Works smoothly even on older devices 
                without consuming excessive resources.
              </p>
            </div>
            <!-- Markdown Card -->
            <div class="p-6 sm:p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl border border-gray-200 hover:border-gray-300 hover:transform hover:-translate-y-1 group">
              <div class="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Markdown First</h3>
              <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                Write with clean Markdown syntax and see real-time previews. Supports CommonMark spec with 
                extensions for tables, footnotes, and mathematical equations.
              </p>
            </div>
            <!-- Offline Card -->
            <div class="p-6 sm:p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl border border-gray-200 hover:border-gray-300 hover:transform hover:-translate-y-1 group">
              <div class="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Offline Ready</h3>
              <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                Work anywhere, anytime. All content saves locally first with optional cloud sync. 
                Perfect for remote areas or unstable connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 sm:py-24 bg-gray-900 text-white">
        <div class="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ready to start writing?</h2>
          <p class="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Create beautiful documents with our minimalist Markdown editor. No distractions, just your words.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              @click="navigateToEditor"
              class="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 cursor-pointer"
            >
              Start Now
            </button>
            <NuxtLink 
              to="/about"
              class="border border-white text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white text-gray-900 py-8 sm:py-12 border-t border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <div class="flex items-center mb-4 sm:mb-0">
            <img src="/assets/icons/image1.png" alt="Gravin Notebooks Logo" class="w-8 h-8 mr-3">
            <span class="font-semibold text-lg sm:text-xl">Gravin Notebooks</span>
          </div>
          <nav class="flex flex-col sm:flex-row gap-4 sm:gap-8 text-gray-600 font-medium">
            <NuxtLink to="/editor" class="hover:text-gray-900 transition-colors duration-200">
              Notes
            </NuxtLink>
            <NuxtLink to="/about" class="hover:text-gray-900 transition-colors duration-200">
              About Us
            </NuxtLink>
            <NuxtLink to="/faq" class="hover:text-gray-900 transition-colors duration-200">
              FAQ
            </NuxtLink>
            <NuxtLink to="/site-map" class="hover:text-gray-900 transition-colors duration-200">
              Site Map
            </NuxtLink>
          </nav>
        </div>
        <div class="border-t border-gray-200 pt-6 sm:pt-8 text-center text-sm text-gray-500">
          &copy; 2024 Gravin Notebooks. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from '#app';

const router = useRouter();

const navigateToEditor = () => {
  router.push('/editor');
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.banner {
  position: relative;
  background-color: #111827; /* gray-900 */
}

button {
  transition: all 0.3s ease;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(209, 213, 219, 0.5); /* gray-300 */
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 640px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
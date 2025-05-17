<script setup>
import { inject } from 'vue';

// Inject isMobile from app.vue
const isMobile = inject('isMobile');

// Define page metadata
definePageMeta({
  title: 'Contact',
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Desktop Layout -->
    <div v-if="!isMobile" class="flex-1 pt-16">
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-12 px-6">
        <!-- Contact Us -->
        <section class="mb-12">
          <div class="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-gray-200 shadow-md">
            <h1 class="text-3xl font-bold text-gray-800 text-center flex items-center justify-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/mail.svg" alt="Contact Us icon" class="w-8 h-8 mr-2">
              Contact Us
            </h1>
            <p class="text-xl text-gray-600 text-center mt-4">We’d love to hear from you.</p>
          </div>
        </section>

        <!-- Intro -->
        <section class="mb-12">
          <article class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <p class="text-gray-600 text-center max-w-3xl mx-auto">
              Have questions, feedback, or just want to say hello? Whether you're a user with a suggestion, a partner with an idea, or someone curious about what we do—we're here and ready to connect.
            </p>
          </article>
        </section>
        <hr class="border-gray-200 my-8">

        <!-- General Inquiries -->
        <section class="mb-12">
          <article class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/message-square.svg" alt="General Inquiries icon" class="w-6 h-6 mr-2">
              General Inquiries
            </h2>
            <p class="text-gray-600 mb-2">Got something on your mind? Reach out to us anytime at</p>
            <a href="mailto:hello@gravinnotes.com" class="text-purple-500 hover:text-purple-600 transition-colors text-lg" aria-label="Email us at hello@gravinnotes.com">
              hello@gravinnotes.com
            </a>
          </article>
        </section>
        <hr class="border-gray-200 my-8">

        <!-- Need Help or Support? -->
        <section class="mb-12">
          <article class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/help-circle.svg" alt="Support icon" class="w-6 h-6 mr-2">
              Need Help or Support?
            </h2>
            <p class="text-gray-600 mb-2">
              Visit our <NuxtLink to="/help" class="text-purple-500 hover:text-purple-600 transition-colors" aria-label="Visit Help Center">Help Center</NuxtLink> or email our support team at
            </p>
            <a href="mailto:support@gravinnotes.com" class="text-purple-500 hover:text-purple-600 transition-colors text-lg" aria-label="Email support at support@gravinnotes.com">
              support@gravinnotes.com
            </a>
            <p class="text-gray-600 mt-2">We’ll get back to you within 24–48 hours.</p>
          </article>
        </section>
        <hr class="border-gray-200 my-8">

        <!-- Partnership or Collaboration? -->
        <section class="mb-12">
          <article class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/users.svg" alt="Partnership icon" class="w-6 h-6 mr-2">
              Partnership or Collaboration?
            </h2>
            <p class="text-gray-600 mb-2">Interested in working with us or integrating your product? Let’s talk!</p>
            <a href="mailto:partner@gravinnotes.com" class="text-purple-500 hover:text-purple-600 transition-colors text-lg" aria-label="Email partnerships at partner@gravinnotes.com">
              partner@gravinnotes.com
            </a>
          </article>
        </section>
        <hr class="border-gray-200 my-8">

        <!-- Follow Us -->
        <section class="mb-12">
          <article class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/share-2.svg" alt="Follow Us icon" class="w-6 h-6 mr-2">
              Follow Us
            </h2>
            <p class="text-gray-600 mb-4">Stay updated with new features, tips, and community highlights:</p>
            <div class="flex justify-center gap-6">
              <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our Facebook page">
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/facebook.svg" alt="Facebook icon" class="w-6 h-6">
              </a>
              <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our Twitter page">
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/twitter.svg" alt="Twitter icon" class="w-6 h-6">
              </a>
              <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our Instagram page">
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/instagram.svg" alt="Instagram icon" class="w-6 h-6">
              </a>
              <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our LinkedIn page">
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/linkedin.svg" alt="LinkedIn icon" class="w-6 h-6">
              </a>
            </div>
          </article>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 py-6" role="contentinfo">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <div class="flex justify-center gap-4 text-gray-600">
            <NuxtLink to="/about" class="hover:text-purple-500 transition-colors" aria-label="About Us">About us</NuxtLink>
            <span>|</span>
            <NuxtLink to="/faq" class="hover:text-purple-500 transition-colors" aria-label="FAQ">FAQ</NuxtLink>
            <span>|</span>
            <NuxtLink to="/sitemap" class="hover:text-purple-500 transition-colors" aria-label="Site Map">Site Map</NuxtLink>
          </div>
        </div>
      </footer>
    </div>

    <!-- Mobile Layout -->
    <div v-else class="flex-1 p-6 flex flex-col items-center pt-16 pb-16 bg-gray-100">
      <!-- Contact Content Card -->
      <div class="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h1 class="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/mail.svg" alt="Contact Us icon" class="w-6 h-6 mr-2">
          Contact Us
        </h1>
        <p class="text-gray-600 text-center mb-6">We’d love to hear from you! Reach out with questions, feedback, or partnership ideas.</p>
        <hr class="border-gray-200 my-6">
        
        <!-- Email Links -->
        <div class="flex flex-col gap-4 mb-6">
          <div>
            <p class="text-gray-600 font-medium flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/message-square.svg" alt="General Inquiries icon" class="w-5 h-5 mr-2">
              General Inquiries
            </p>
            <a href="mailto:hello@gravinnotes.com" class="text-purple-500 hover:text-purple-600 transition-colors" aria-label="Email us at hello@gravinnotes.com">
              hello@gravinnotes.com
            </a>
          </div>
          <div>
            <p class="text-gray-600 font-medium flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/help-circle.svg" alt="Support icon" class="w-5 h-5 mr-2">
              Support
            </p>
            <a href="mailto:support@gravinnotes.com" class="text-purple-500 hover:text-purple-600 transition-colors" aria-label="Email support at support@gravinnotes.com">
              support@gravinnotes.com
            </a>
          </div>
          <div>
            <p class="text-gray-600 font-medium flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/users.svg" alt="Partnership icon" class="w-5 h-5 mr-2">
              Partnerships
            </p>
            <a href="mailto:partner@gravinnotes.com" class="text-purple-500 hover:text-purple-600 transition-colors" aria-label="Email partnerships at partner@gravinnotes.com">
              partner@gravinnotes.com
            </a>
          </div>
        </div>
        <hr class="border-gray-200 my-6">
        
        <!-- Social Links -->
        <div class="flex flex-col gap-4">
          <p class="text-gray-600 font-medium text-center flex items-center justify-center">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/share-2.svg" alt="Follow Us icon" class="w-5 h-5 mr-2">
            Follow Us
          </p>
          <div class="flex justify-center gap-4">
            <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our Facebook page">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/facebook.svg" alt="Facebook icon" class="w-6 h-6">
            </a>
            <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our Twitter page">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/twitter.svg" alt="Twitter icon" class="w-6 h-6">
            </a>
            <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our Instagram page">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/instagram.svg" alt="Instagram icon" class="w-6 h-6">
            </a>
            <a href="#" class="text-gray-600 hover:text-purple-500 transition-colors" aria-label="Visit our LinkedIn page">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/linkedin.svg" alt="LinkedIn icon" class="w-6 h-6">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Shadow for cards */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Hover shadow for cards */
.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Icon colors for Dracula Alucard purple */
img[src*="lucide-static"] {
  filter: invert(69%) sepia(12%) saturate(2093%) hue-rotate(213deg) brightness(101%) contrast(96%);
}

/* Hover effect for social links */
a:hover img[src*="lucide-static"] {
  filter: invert(40%) sepia(57%) saturate(5135%) hue-rotate(247deg) brightness(98%) contrast(96%);
}

/* Active nav link styling (handled by NavBar.vue) */
a.router-link-active:not([to="/"]) {
  color: #BD93F9; /* Dracula Alucard purple */
}

/* Hover effects for links */
a:hover:not(.social-link) {
  color: #BD93F9;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .min-h-screen {
    padding-bottom: 4rem; /* Space for MobileBottomNav */
  }
}
</style>
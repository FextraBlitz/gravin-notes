```vue
<script setup>
import { inject } from 'vue';
// Import team member images from src/assets/team/
import vincentImage from '@/assets/team/vincent.jpg';
import ghenImage from '@/assets/team/ghen.jpg';
import raphaelImage from '@/assets/team/raphael.jpg';


// Inject isMobile from app.vue
const isMobile = inject('isMobile');
// Define team members with imported images
const teamMembers = [
  {
    name: 'Vincent Paul Bacalso',
    role: 'Team Member',
    image: vincentImage,
    alt: 'Vincent Paul Bacalso',
  },
  {
    name: 'Ghen Benedict Namol',
    role: 'Team Member',
    image: ghenImage,
    alt: 'Ghen Benedict Namol',
  },
  {
    name: 'Raphael Angelo Gajelomo',
    role: 'Team Member',
    image: raphaelImage,
    alt: 'Raphael Angelo Gajelomo',
  },
];

// Define page metadata
definePageMeta({
  title: 'About',
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Desktop Layout -->
    <div v-if="!isMobile" class="flex-1 pt-16">
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-12 px-6">
        <!-- Group Profile -->
        <section class="mb-12">
          <div class="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-gray-200 shadow-md mb-8">
            <h1 class="text-3xl font-bold text-gray-800 text-center flex items-center justify-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/users.svg" alt="Group Profile icon" class="w-8 h-8 mr-2">
              Group Profile
            </h1>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Team Members -->
            <article
              v-for="member in teamMembers"
              :key="member.name"
              class="bg-[#f9f9f9] rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-[box-shadow,background-color] duration-150"
              role="article"
              :aria-label="`Profile of ${member.name}`"
            >
              <img
                :src="member.image"
                :alt="member.alt"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                @error="handleImageError"
              >
              <h2 class="text-xl font-semibold text-gray-800">{{ member.name }}</h2>
              <p class="text-gray-600">{{ member.role }}</p>
            </article>
          </div>
        </section>

        <!-- About Us -->
        <section class="mb-12">
          <div class="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-gray-200 shadow-md mb-8">
            <h1 class="text-3xl font-bold text-gray-800 flex items-center">
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/info.svg" alt="About Us icon" class="w-8 h-8 mr-2">
              About Us
            </h1>
            <p class="text-xl text-gray-600 mt-4">Re-imagining Productivity with AI and Simplicity</p>
          </div>

          <!-- Who We Are -->
          <article class="bg-[#f9f9f9] rounded-xl shadow-md p-8 mb-8 hover:shadow-xl transition-[box-shadow,background-color] duration-150">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
            <p class="text-gray-600">
              We're a team of students, creators, builders, and thinkers passionate about helping people work smarter—not harder.
              We believe that great ideas deserve a space where they can grow, evolve, and take shape without distraction.
              That’s why we built GRAVIN Notes—a modern workspace that combines intuitive note-taking with the power of AI,
              helping you capture, organize, and understand your thoughts with clarity.
            </p>
          </article>
          <hr class="border-gray-200 my-8">

          <!-- Our Mission -->
          <article class="bg-[#f9f9f9] rounded-xl shadow-md p-8 mb-8 hover:shadow-xl transition-[box-shadow,background-color] duration-150">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p class="text-gray-600">
              We’re here to help individuals stay focused, informed, and in control of their ideas by giving them tools that are
              intelligent, simple, and flexible.
            </p>
          </article>
          <hr class="border-gray-200 my-8">

          <!-- What We Do -->
          <article class="bg-[#f9f9f9] rounded-xl shadow-md p-8 mb-8 hover:shadow-xl transition-[box-shadow,background-color] duration-150">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
            <ul class="list-disc pl-5 text-gray-600">
              <li>Smart Text Editors – Designed for clarity, focus, and freedom of expression</li>
              <li>AI Summarizer Assistant – A conversational tool that helps you summarize, explore, and interact with your content</li>
              <li>Unified Workspace – A seamless experience where note-taking meets AI-powered understanding</li>
            </ul>
          </article>
          <hr class="border-gray-200 my-8">

          <!-- Why We Do It -->
          <article class="bg-[#f9f9f9] rounded-xl shadow-md p-8 hover:shadow-xl transition-[box-shadow,background-color] duration-150">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Why We Do It</h2>
            <p class="text-gray-600">
              We saw the gap between traditional note-taking tools and the growing need for deeper understanding.
              Long notes pile up. Important details get lost. And traditional tools can’t keep up.
              So, we created GRAVIN Notes—where your ideas don’t just get stored, they get smarter.
            </p>
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
            <NuxtLink to="/site-map" class="hover:text-purple-500 transition-colors" aria-label="Site Map">Site Map</NuxtLink>
          </div>
        </div>
      </footer>
    </div>

    <!-- Mobile Layout -->
    <div v-else class="flex-1 p-6 flex flex-col items-center pt-16 pb-16 bg-gray-100">
      <!-- About Content Card -->
      <div class="bg-[#f9f9f9] rounded-xl shadow-md p-6 w-full max-w-md">
        <h1 class="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/info.svg" alt="About GRAVIN Notes icon" class="w-6 h-6 mr-2">
          About GRAVIN Notes
        </h1>
        <p class="text-gray-600 text-center mb-2">Version Alpha Build 1.0</p>
        <p class="text-gray-800 font-medium text-center mb-4">Find out more about us here!</p>
        <div class="flex justify-center mb-6">
          <a href="https://gravinnotes.com" class="text-purple-500 hover:text-purple-600 hover:underline transition-colors text-lg" aria-label="Visit Gravin Notes website">
            gravinnotes.com
          </a>
        </div>
        <hr class="border-gray-200 my-6">
        
        <!-- Social Links -->
        <div class="flex flex-col gap-4">
          <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Visit our Facebook page">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/facebook.svg" alt="Facebook icon" class="w-6 h-6 mr-4 text-purple-500">
            <span class="text-gray-800">Facebook</span>
          </a>
          <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Visit our Twitter page">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/twitter.svg" alt="Twitter icon" class="w-6 h-6 mr-4 text-purple-500">
            <span class="text-gray-800">Twitter</span>
          </a>
          <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Visit our Instagram page">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/instagram.svg" alt="Instagram icon" class="w-6 h-6 mr-4 text-purple-500">
            <span class="text-gray-800">Instagram</span>
          </a>
          <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Visit our LinkedIn page">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/linkedin.svg" alt="LinkedIn icon" class="w-6 h-6 mr-4 text-purple-500">
            <span class="text-gray-800">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleImageError(event) {
      // Fallback to a placeholder image if the team member image fails to load
      event.target.src = 'https://via.placeholder.com/128?text=Team+Member';
    },
  },
};
</script>

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
```
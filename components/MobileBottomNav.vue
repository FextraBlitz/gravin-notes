<template>
  <div>
    <!-- Mobile UI -->
    <div v-if="isMobile">
      <!-- Bottom Navigation Bar - Sticky -->
      <nav class="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-md-up">
        <div class="flex justify-around items-center h-16">
          <NuxtLink to="/MobileHomepage" class="flex flex-col items-center justify-center text-gray-600 hover:text-purple-500 transition-colors px-2 py-1">
            <img 
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/home.svg" 
              alt="Home" 
              class="w-6 h-6 mb-1"
            />
            <span class="text-xs">Home</span>
          </NuxtLink>
          <NuxtLink to="/MobileSummarizer" class="flex flex-col items-center justify-center text-gray-600 hover:text-purple-500 transition-colors px-2 py-1">
            <img 
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/zap.svg" 
              alt="AI" 
              class="w-6 h-6 mb-1"
            />
            <span class="text-xs">AI</span>
          </NuxtLink>
          <NuxtLink to="/MobileNotes" class="flex flex-col items-center justify-center text-gray-600 hover:text-purple-500 transition-colors px-2 py-1">
            <img 
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" 
              alt="Notes" 
              class="w-6 h-6 mb-1"
            />
            <span class="text-xs">Notes</span>
          </NuxtLink>
          <NuxtLink to="/MobileOptions" class="flex flex-col items-center justify-center text-gray-600 hover:text-purple-500 transition-colors px-2 py-1">
            <img 
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/more-horizontal.svg" 
              alt="More" 
              class="w-6 h-6 mb-1"
            />
            <span class="text-xs">More</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Content spacer for bottom nav -->
      <div class="pb-16"></div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

// Inject isMobile state from app.vue
const isMobile = inject('isMobile');
</script>

<style scoped>
/* Shadow for footer (from top) */
.shadow-md-up {
  box-shadow: 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* SVG icon colors */
img[src*="home.svg"],
img[src*="zap.svg"],
img[src*="file-text.svg"],
img[src*="more-horizontal.svg"] {
  filter: invert(42%) sepia(12%) saturate(455%) hue-rotate(179deg) brightness(95%) contrast(86%);
}

/* Active bottom nav icons */
.router-link-active img[src*="home.svg"],
.router-link-active img[src*="zap.svg"],
.router-link-active img[src*="file-text.svg"],
.router-link-active img[src*="more-horizontal.svg"] {
  filter: invert(48%) sepia(85%) saturate(1000%) hue-rotate(230deg) brightness(90%) contrast(90%);
}

/* Active bottom nav text */
.router-link-active.flex.flex-col {
  color: #BD93F9; /* Dracula Alucard purple */
}
</style>
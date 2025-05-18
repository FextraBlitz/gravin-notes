```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('NewNotebookCard mounted')
})
</script>

<template>
  <div
    class="w-full max-w-[95%] sm:w-80 bg-white rounded-md shadow-lg p-3 sm:p-4 transition-transform hover:scale-[1.02] border-1 sm:border-2 border-purple-600 hover:border-purple-700 hover:shadow-purple-200"
    role="region"
    aria-label="Create a new notebook or summarize a PDF"
  >
    <div class="flex flex-col h-full">
      <!-- Heading -->
      <h2 class="text-base sm:text-lg font-semibold text-gray-800 mb-2">
        Create a New Notebook
      </h2>
      <!-- Subtext -->
      <p class="text-sm sm:text-base text-gray-600 mb-3">
        Start a new notebook or summarize a PDF document.
      </p>
      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-2 mt-auto">
        <NuxtLink
          to="/editor"
          class="flex items-center justify-center gap-2 flex-1 bg-purple-500 text-white text-center text-sm sm:text-base font-medium py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
          role="button"
          aria-label="Create a new notebook"
          @click="console.log('Navigating to /editor')"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-plus-2.svg"
            alt="New notebook icon"
            class="h-5 w-5 text-white"
          >
          New Notebook
        </NuxtLink>
        <NuxtLink
          to="/editor?openSummarizer=true"
          class="flex items-center justify-center gap-2 flex-1 bg-purple-500 text-white text-center text-sm sm:text-base font-medium py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
          role="button"
          aria-label="Summarize a PDF"
          @click="console.log('Navigating to /editor?openSummarizer=true')"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg"
            alt="Summarize PDF icon"
            class="h-5 w-5 text-white"
          >
          Summarize PDF
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Icon styling */
img[src*="file-plus-2"], img[src*="file-text"] {
  filter: brightness(0) invert(1); /* Ensure white color */
}
</style>
```
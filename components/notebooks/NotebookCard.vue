```vue
<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  lastSaved: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['delete']);

// Format last saved date
const formattedLastSaved = computed(() => {
  const date = new Date(props.lastSaved);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Handle delete click
const handleDelete = () => {
  emit('delete', props.id, props.title);
};
</script>

<template>
  <article
    class="bg-white rounded-md shadow-lg p-3 sm:p-4 relative w-full max-w-[95%] sm:w-80 mx-auto transition-transform hover:scale-[1.02] border-1 sm:border-2 border-purple-600 hover:border-purple-700 hover:shadow-purple-200"
  >
    <!-- Delete Icon -->
    <button
      @click="handleDelete"
      class="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition-colors"
      :aria-label="`Delete notebook with title ${title}`"
    >
      <img
        src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg"
        alt="Delete icon"
        class="h-5 w-5 text-red-500"
      >
    </button>
    <!-- Notebook Details -->
    <h2 class="text-base sm:text-lg font-semibold text-gray-800 truncate mb-2">
      {{ title }}
    </h2>
    <p class="text-sm sm:text-base text-gray-600">
      Pages: {{ pageCount }}
    </p>
    <p class="text-sm sm:text-base text-gray-600">
      Last Saved: {{ formattedLastSaved }}
    </p>
  </article>
</template>

<style scoped>
/* Icon filter for red trash icon */
img[src*="trash-2"] {
  filter: none; /* Override default Lucide filter for red color */
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}
</style>
```
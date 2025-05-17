```vue
<script setup>
import { ref, inject } from 'vue';
import NotebookCard from '~/components/notebooks/NotebookCard.vue';

// Inject isMobile from parent (like index.vue)
const isMobile = inject('isMobile');

// Dummy notebook data
const notebooks = ref([
  { id: 1, title: 'Project Notes', pageCount: 3, lastSaved: '2025-05-15T10:00:00Z' },
  { id: 2, title: 'Meeting Summaries', pageCount: 5, lastSaved: '2025-05-14T14:30:00Z' },
  { id: 3, title: 'Research Ideas', pageCount: 2, lastSaved: '2025-05-13T09:15:00Z' },
  { id: 4, title: 'Personal Journal', pageCount: 8, lastSaved: '2025-05-12T18:45:00Z' },
  { id: 5, title: 'Study Guide', pageCount: 4, lastSaved: '2025-05-11T11:20:00Z' },
]);

// Handle delete with confirmation
const handleDelete = (id, title) => {
  if (window.confirm(`Are you sure you want to delete the notebook "${title}"? This cannot be undone.`)) {
    notebooks.value = notebooks.value.filter(notebook => notebook.id !== id);
    console.log(`Deleted notebook with ID ${id}`); // Mock backend call
    // TODO: Replace with actual backend API call, e.g.:
    // await fetch(`/api/notebooks/${id}`, { method: 'DELETE' });
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6">
    <!-- Header -->
    <h1 class="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
      Your Notebooks
    </h1>
    <!-- Notebook List -->
    <div
      class="max-w-7xl mx-auto"
      :class="isMobile ? 'flex flex-col gap-2' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'"
    >
      <NotebookCard
        v-for="notebook in notebooks"
        :key="notebook.id"
        :id="notebook.id"
        :title="notebook.title"
        :page-count="notebook.pageCount"
        :last-saved="notebook.lastSaved"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #BD93F9;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A775F0;
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}
</style>
```
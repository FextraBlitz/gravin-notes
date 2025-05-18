```vue
<script setup>
import { ref, onMounted } from 'vue'
import NotebookCard from '~/components/notebooks/NotebookCard.vue'
import NewNotebookCard from '~/components/notebooks/NewNotebookCard.vue'

const notebooks = ref([])
const isLoading = ref(true)

const fetchNotebooks = async () => {
  isLoading.value = true
  try {
    const access = localStorage.getItem('access')
    if (!access) throw new Error('No authentication token found')
    const response = await fetch('https://ccs8finalproj-production.up.railway.app/notebook/get/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      }
    })
    const data = await response.json()
    if (response.ok && data.status === 200 && data.notebooks) {
      notebooks.value = data.notebooks.map(notebook => ({
        id: notebook['notebook ID'],
        title: notebook.title,
        pageTitles: notebook.pages.map(page => page.title)
      }))
      console.log('Notebooks fetched', { notebooks: notebooks.value })
    } else {
      throw new Error('Invalid notebook data')
    }
  } catch (error) {
    console.error('Error fetching notebooks:', error)
    notebooks.value = [
      {
        id: 1,
        title: 'Science Notebook',
        pageTitles: ['Atoms and Molecules, Hello']
      }
    ]
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchNotebooks()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="container mx-auto p-4 sm:p-6">
      <h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">Your Notebooks</h1>
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-[#BD93F9] border-gray-200"></div>
      </div>
      <div v-else-if="notebooks.length === 0" class="text-center text-gray-600">
        <p class="text-lg">No notebooks found. Create a new one to get started!</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <NotebookCard
          v-for="notebook in notebooks"
          :key="notebook.id"
          :notebook="notebook"
          class="cursor-pointer"
        />
        <NewNotebookCard />
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
</style>
```
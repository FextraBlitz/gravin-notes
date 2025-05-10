<script setup>
import { ref, inject, computed, watch } from 'vue'

// Inject notebook and control functions
const notebook = inject('notebook', ref({ pages: [] }))
const activePage = inject('activePage', ref(null))
const setActivePage = inject('setActivePage', (id) => {})
const addPage = inject('addPage', () => {})
const deletePage = inject('deletePage', (id) => {})

// Fallback pages in case notebook has none
const fallbackpages = ref([
  {
    id: 1,
    title: "YOU SHOULD NOT BE SEEING THIS",
    blocks: [
      { id: 1, text: '# Welcome to Your Markdown Notebook\n\nThis is a **markdown-powered** notebook application.' },
      { id: 2, text: 'You can create multiple pages and add various content blocks.\n\n- Create lists\n- Add code snippets\n- Insert images\n- And much more!' }
    ]
  },
  {
    id: 2,
    title: "YOU SHOULD NOT BE SEEING THIS",
    blocks: [
      { id: 3, text: '## Markdown Examples\n\nHere are some examples of what you can do with Markdown:' },
      { id: 4, text: '### Code Blocks\n\n```javascript\nfunction helloWorld() {\n  console.log("Hello World!");\n}\n```' },
      { id: 5, text: '### Tables\n\n| Name | Email | Role |\n|------|-------|------|\n| John | john@example.com | Admin |\n| Jane | jane@example.com | Editor |' }
    ]
  }
])

// Computed: reactive pages list
const pages = computed(() => {
  return notebook.value?.pages?.length > 0
    ? notebook.value.pages
    : fallbackpages.value
})

// Watch pages and initialize active page if needed
watch(pages, (newPages) => {
  if (!activePage.value && newPages.length > 0) {
    setActivePage(newPages[0].id)
    console.log('Auto-selected first page:', newPages[0])
  }
}, { immediate: true })

// Sidebar UI state
const isActive = ref(true)
const setWidth = ref(300)
const sidebarRef = ref(null)
const cursorStyle = ref('default')
let isResizing = false
const RESIZE_MARGIN = 10

const checkStartResize = (e) => {
  if (!sidebarRef.value) return
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  if (rect.width - offsetX <= RESIZE_MARGIN) {
    e.preventDefault()
    isResizing = true
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stop)
  }
}

const checkCursor = (e) => {
  if (!sidebarRef.value) return
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  cursorStyle.value = (rect.width - offsetX <= RESIZE_MARGIN)
    ? 'ew-resize'
    : 'default'
}

const resetCursor = () => {
  cursorStyle.value = 'default'
}

const resize = (e) => {
  if (isResizing) {
    setWidth.value = Math.min(500, Math.max(200, e.clientX))
  }
}

const stop = () => {
  isResizing = false
  document.body.classList.remove('no-select')
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stop)
}

// Handle page selection
const handlePageClick = (pageId) => {
  setActivePage(pageId)
  console.log('Page selected:', pageId)
}

// Handle delete with confirmation
const confirmDeletePage = (event, pageId) => {
  event.stopPropagation()
  if (confirm("Delete this page?")) {
    deletePage(pageId)
  }
}

// Display title safely
const formatPageTitle = (page) => {
  if (!page) return 'Untitled Page'
  return page.title || `Page ${page.id}`
}
</script>

<template>
  <div ref="sidebarRef"
    @mousemove="checkCursor"
    @mouseleave="resetCursor"
    @mousedown="checkStartResize"
    :style="{ width: setWidth + 'px', cursor: cursorStyle }"
    class="bg-[#e8e8e0] h-[calc(100vh-2rem)] sticky top-[2rem] shrink-0" >
    <div class="relative flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="w-full h-[3rem] flex bg-[#d8d8d0] border-b border-[#c8c8c0]">
        <div @click="isActive = !isActive" class='h-full aspect-square flex items-center justify-center hover:bg-[#bd93f9] transition-colors'>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#282a36]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="h-full flex-1 inline-flex items-center px-3 font-medium text-[#282a36]">
          <div>Pages</div>
        </div>
      </div>

      <!-- Pages List -->
      <div id="Notebooks" :class="`overflow-y-auto max-h-[calc(100vh-3rem-2rem)] bg-[#f0f0ea] ${isActive ? 'block' : 'hidden'}`">
        <ul class="p-2">
          <!-- Page items -->
          <li 
            v-for="page in pages || fallbackpages" 
            :key="page.id"
            @click="handlePageClick(page.id)"
            :class="[
              'flex justify-between items-center px-3 py-2 rounded-md', 
              'cursor-pointer mb-1 group',
              activePage.value === page.id ? 'bg-[#d7d4f0] text-[#282a36]' : 'hover:bg-[#e0e0da] text-[#282a36]'
            ]"
          >
            <span class="truncate">{{ formatPageTitle(page) }}</span>
            <button 
              @click="(e) => confirmDeletePage(e, page.id)" 
              class="text-[#6272a4] hover:text-[#ff5555] opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </li>

          <!-- Add Page Button -->
          <li 
            @click="addPage" 
            class="flex items-center px-3 py-2 rounded-md bg-[#f0f0ea] hover:bg-[#8be9fd] cursor-pointer border border-dashed border-[#bd93f9] mt-2 text-[#282a36]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Add Page</span>
          </li>
        </ul>
      </div>
      
      <!-- Resize Handle -->
      <div
        class="absolute top-0 right-0 h-full cursor-ew-resize z-50"
        :style="{ width: RESIZE_MARGIN + 'px' }"
        @mousedown="checkStartResize"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.no-select {
  user-select: none;
}

/* Add smooth transitions */
.transition-colors {
  transition: background-color 0.2s ease;
}

.transition-opacity {
  transition: opacity 0.2s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #bd93f9;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8be9fd;
}
</style>
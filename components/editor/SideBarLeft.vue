```vue
<script setup>
import { ref, inject, computed, watch } from 'vue'

const notebook = inject('notebook', ref({ pages: [] }))
const activePage = inject('activePage', ref(null))
const setActivePage = inject('setActivePage', (id) => {})
const addPage = inject('addPage', () => {})
const deletePage = inject('deletePage', (id) => {})
const isMobile = inject('isMobile') // Inject isMobile for mobile detection

const fallbackpages = ref([
  {
    id: 1,
    title: "Welcome",
    blocks: [
      { id: 1, text: '# Welcome to Your Markdown Notebook\n\nThis is a **markdown-powered** notebook application.' },
      { id: 2, text: 'You can create multiple pages and add various content blocks.\n\n- Create lists\n- Add code snippets\n- Insert images\n- And much more!' }
    ]
  },
  {
    id: 2,
    title: "Examples",
    blocks: [
      { id: 3, text: '## Markdown Examples\n\nHere are some examples of what you can do with Markdown:' },
      { id: 4, text: '### Code Blocks\n\n```javascript\nfunction helloWorld() {\n  console.log("Hello World!");\n}\n```' },
      { id: 5, text: '### Tables\n\n| Name | Email | Role |\n|------|-------|------|\n| John | john@example.com | Admin |\n| Jane | jane@example.com | Editor |' }
    ]
  }
])

const pages = computed(() => {
  const source = notebook.value?.pages?.length > 0 ? notebook.value.pages : fallbackpages.value
  console.log('Pages:', source) // Debug page IDs
  return source.map((page, index) => ({
    ...page,
    uniqueKey: `${page.id}-${index}` // Ensure unique key
  }))
})

watch(pages, (newPages) => {
  if (!activePage.value && newPages.length > 0) {
    setActivePage(newPages[0].id)
    console.log('Auto-selected first page:', newPages[0])
  }
}, { immediate: true })

// Initialize sidebar mode based on device
const sidebarMode = ref(isMobile.value ? 'thin' : 'full')
const setWidth = ref(isMobile.value && sidebarMode.value === 'full' ? '100%' : (sidebarMode.value === 'full' ? 300 : 50))
const sidebarRef = ref(null)
const cursorStyle = ref('default')
let isResizing = false
const RESIZE_MARGIN = 10

const toggleSidebar = () => {
  sidebarMode.value = sidebarMode.value === 'full' ? 'thin' : 'full'
  setWidth.value = sidebarMode.value === 'full' ? (isMobile.value ? '100%' : 300) : 50
}

const checkStartResize = (e) => {
  if (isMobile.value || !sidebarRef.value) return // Disable resizing on mobile
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
  if (isMobile.value || !sidebarRef.value) return // No resize cursor on mobile
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
    const newWidth = Math.min(500, Math.max(200, e.clientX))
    setWidth.value = newWidth
    sidebarMode.value = 'full' // Ensure full mode during resizing
  }
}

const stop = () => {
  isResizing = false
  document.body.classList.remove('no-select')
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stop)
}

const handlePageClick = (pageId) => {
  setActivePage(pageId)
  console.log('Page selected:', pageId)
}

const confirmDeletePage = (event, pageId) => {
  event.stopPropagation()
  if (confirm("Delete this page?")) {
    deletePage(pageId)
  }
}

const formatPageTitle = (page) => {
  if (!page) return 'Untitled Page'
  return page.title || `Page ${page.id}`
}
</script>

<template>
  <div
    ref="sidebarRef"
    :class="{ 'bg-gray-100': true, 'h-[calc(100vh-4rem)]': true, 'shrink-0': !isMobile, 'mobile-fixed-sidebar': isMobile, 'z-[10]': true}"
    :style="{ width: typeof setWidth === 'number' ? setWidth + 'px' : setWidth, cursor: cursorStyle }"
    @mousemove="checkCursor"
    @mouseleave="resetCursor"
    @mousedown="checkStartResize"
    role="navigation"
    :aria-label="sidebarMode === 'full' ? 'Page navigation' : 'Collapsed page navigation'"
    :aria-expanded="sidebarMode === 'full'"
  >
    <div class="relative flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="w-full h-12 flex bg-white border-b border-gray-200 shadow-md rounded-t-md backdrop-blur-md">
        <button
          @click="toggleSidebar"
          class="h-full aspect-square flex items-center justify-center hover:bg-purple-100 transition-colors"
          :aria-label="sidebarMode === 'full' ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/menu.svg" alt="Menu icon" class="h-5 w-5 text-gray-800">
        </button>
        <div v-if="sidebarMode === 'full'" class="h-full flex-1 inline-flex items-center px-3 font-medium text-gray-800">
          Pages
        </div>
      </div>

      <!-- Pages List -->
      <div
        :class="`overflow-y-auto max-h-[calc(100vh-4rem-3rem)] bg-gray-100 ${sidebarMode === 'full' ? 'p-4' : 'py-4'}`"
      >
        <ul class="space-y-2">
          <!-- Page items (Full Mode) -->
          <li
            v-if="sidebarMode === 'full'"
            v-for="page in pages"
            :key="page.uniqueKey"
            @click="handlePageClick(page.id)"
            class="flex justify-between items-center px-3 py-2 rounded-md bg-white shadow-sm hover:bg-purple-100 transition-colors duration-150 cursor-pointer"
            :class="activePage === page.id ? 'border-purple-500 border-2' : 'border-gray-200 border'"
            :aria-label="`Select page: ${formatPageTitle(page)}`"
          >
            <span class="truncate text-gray-800">{{ formatPageTitle(page) }}</span>
            <button
              @click="(e) => confirmDeletePage(e, page.id)"
              class="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete page"
              aria-label="Delete page"
            >
              <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg" alt="Delete icon" class="h-4 w-4">
            </button>
          </li>
          <!-- Page items (Thin Mode) -->
          <li
            v-else
            v-for="page in pages"
            @click="handlePageClick(page.id)"
            class="flex justify-center items-center h-10 w-10 mx-auto rounded-full bg-white shadow-sm hover:bg-purple-100 transition-colors duration-150 cursor-pointer"
            :class="activePage === page.id ? 'border-purple-500 border-2' : 'border-gray-200 border'"
            :aria-label="`Select page ${page.id}`"
          >
            <span class="text-gray-800 font-medium">{{ page.id }}</span>
          </li>
          <hr v-if="sidebarMode === 'full'" class="border-gray-200 my-4">
          <!-- Add Page Button (Full Mode Only) -->
          <li
            v-if="sidebarMode === 'full'"
            @click="addPage"
            class="flex items-center px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white shadow-sm transition-colors duration-150 cursor-pointer"
            aria-label="Add new page"
          >
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/plus.svg" alt="Add icon" class="h-4 w-4 mr-2">
            Add Page
          </li>
        </ul>
      </div>
      
      <!-- Resize Handle -->
      <div
        v-if="!isMobile"
        class="absolute top-0 right-0 h-full z-[0]"
        :style="{ width: RESIZE_MARGIN + 'px' }"
        @mousedown="checkStartResize"
        aria-hidden="true"
      >
        <div class="w-1 h-full bg-purple-100 opacity-30 hover:opacity-50 cursor-ew-resize"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-select {
  user-select: none;
}

.mobile-fixed-sidebar {
  position: fixed;
  top: 4rem;
  left: 0;
  z-index: 50;
  height: calc(100vh - 4rem);
}

/* Desktop styling */
@media (min-width: 768px) {
  .mobile-fixed-sidebar {
    position: sticky;
    top: 4rem;
    z-index: 60;
  }
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Icon colors */
img[src*="lucide-static"] {
  filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

/* Hover effect for icons */
button:hover img[src*="lucide-static"], li:hover img[src*="lucide-static"] {
  filter: invert(40%) sepia(57%) saturate(5135%) hue-rotate(247deg) brightness(98%) contrast(96%);
}

/* White icons for purple buttons */
.bg-purple-500 img[src*="lucide-static"], .bg-purple-600 img[src*="lucide-static"] {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

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
</style>
```
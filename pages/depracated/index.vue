```vue
<script setup>
import { ref, watch, onMounted, nextTick, computed, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideBarLeft from '~/components/editor/SideBarLeft.vue';
import SideBarRight from '~/components/editor/SideBarRight.vue';
import RegularText from '~/components/editor/content-types/RegularText.vue';
import EditorNavBar from '~/components/editor/EditorNavBar.vue';
import AISummarizerDialog from '~/components/editor/AISummarizerDialog.vue';

definePageMeta({
  hideDefaultNavbar: true
});

const isMobile = inject('isMobile');
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isSummarizing = ref(false);

const notebook = ref({
  id: null,
  title: '',
  pages: [],
  userdata: {},
  lastSaved: null
});

const activePage = ref(null);
const activeBlock = ref(null);
const currentTextboxText = ref('');
const isDialogOpen = ref(false);

const currentPage = computed(() => {
  return notebook.value.pages.find(page => page.id === activePage.value) || notebook.value.pages[0];
});

const currentBlocks = computed(() => {
  return currentPage.value?.blocks || [];
});

watch(() => activeBlock.value, (newId) => {
  if (newId !== null) {
    const block = findBlockById(newId);
    currentTextboxText.value = block?.text || '';
  } else {
    currentTextboxText.value = '';
  }
});

const findBlockById = (blockId) => {
  for (const page of notebook.value.pages) {
    const block = page.blocks.find(b => b.id === blockId);
    if (block) return block;
  }
  return null;
};

const blockRefs = ref({});
const blockMethods = ref({});

const getNextBlockId = () => {
  const allBlockIds = notebook.value.pages.flatMap(page => 
    page.blocks.map(block => block.id)
  );
  return allBlockIds.length > 0 ? Math.max(...allBlockIds) + 1 : 1;
};

const getNextPageId = () => {
  const pageIds = notebook.value.pages.map(page => page.id);
  return pageIds.length > 0 ? Math.max(...pageIds) + 1 : 1;
};

const registerRef = (el, id) => {
  if (el) blockRefs.value[id] = el;
};

const registerMethods = (id, methods) => {
  blockMethods.value[id] = methods;
};

const addBlock = () => {
  const newId = getNextBlockId();
  if (currentPage.value) {
    currentPage.value.blocks.push({
      id: newId,
      text: ''
    });
    nextTick(() => {
      activeBlock.value = newId;
    });
  }
};

const addPage = () => {
  const newPageId = getNextPageId();
  notebook.value.pages.push({
    id: newPageId,
    title: `New Page`,
    blocks: []
  });
  activePage.value = newPageId;
};

const sidebarRef = ref(null);
const setActiveBlock = (id) => {
  activeBlock.value = id;
  const block = findBlockById(id);
  if (block) {
    currentTextboxText.value = block.text || '';
    nextTick(() => {
      if (sidebarRef.value?.refInput) {
        sidebarRef.value.refInput.focus();
      }
    });
  }
};

const closeRightSidebar = () => {
  activeBlock.value = null;
  currentTextboxText.value = '';
};

const setActivePage = (pageId) => {
  activePage.value = pageId;
  activeBlock.value = null;
  currentTextboxText.value = '';
};

const deleteBlock = (idToDelete) => {
  for (const page of notebook.value.pages) {
    const blockIndex = page.blocks.findIndex(b => b.id === idToDelete);
    if (blockIndex !== -1) {
      page.blocks.splice(blockIndex, 1);
      delete blockRefs.value[idToDelete];
      delete blockMethods.value[idToDelete];
      if (activeBlock.value === idToDelete) {
        activeBlock.value = null;
        currentTextboxText.value = '';
      }
      return;
    }
  }
  console.warn(`Block with ID ${idToDelete} not found`);
};

const deletePage = (pageId) => {
  const pageIndex = notebook.value.pages.findIndex(p => p.id === pageId);
  if (pageIndex !== -1) {
    if (notebook.value.pages.length <= 1) {
      alert("Cannot delete the last page.");
      return;
    }
    if (activePage.value === pageId) {
      const newActivePage = notebook.value.pages[pageIndex - 1]?.id || 
                            notebook.value.pages[pageIndex + 1]?.id;
      if (newActivePage) {
        activePage.value = newActivePage;
      }
      activeBlock.value = null;
      currentTextboxText.value = '';
    }
    notebook.value.pages[pageIndex].blocks.forEach(block => {
      delete blockRefs.value[block.id];
      delete blockMethods.value[block.id];
    });
    notebook.value.pages.splice(pageIndex, 1);
  } else {
    console.warn(`Page with ID ${pageId} not found`);
  }
};

const updateText = (newText) => {
  if (activeBlock.value !== null) {
    const block = findBlockById(activeBlock.value);
    if (block) {
      block.text = newText;
      currentTextboxText.value = newText;
    }
  }
};

const updatePageTitle = (pageId, newTitle) => {
  const page = notebook.value.pages.find(p => p.id === pageId);
  if (page) {
    page.title = newTitle;
  }
};

const updateNotebookTitle = (newTitle) => {
  notebook.value.title = newTitle;
};

const saveNotebook = () => {
  notebook.value.lastSaved = new Date().toISOString();
  const notebookData = JSON.stringify(notebook.value, null, 2);
  const blob = new Blob([notebookData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${notebook.value.title.replace(/\s+/g, '_')}.gnb`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const loadNotebook = (notebookData) => {
  try {
    activeBlock.value = null;
    currentTextboxText.value = '';
    blockRefs.value = {};
    blockMethods.value = {};
    notebook.value = {
      ...notebook.value,
      ...notebookData,
    };
    activePage.value = notebook.value.pages[0]?.id ?? null;
    console.log('Notebook loaded successfully');
  } catch (error) {
    console.error('Error loading notebook:', error);
    alert('Failed to load notebook data. Please try again with a valid file.');
  }
};

// AI Summarizer Dialog
const openDialog = () => {
  console.log('Opening AI Summarizer dialog');
  isDialogOpen.value = true;
};

const handleSummarizeSubmit = async ({ summary }) => {
  isSummarizing.value = true;
  try {
    if (currentPage.value) {
      const newId = getNextBlockId();
      currentPage.value.blocks.push({
        id: newId,
        text: `## AI Summary\n\n${summary}`
      });
      nextTick(() => {
        activeBlock.value = newId;
        const block = findBlockById(newId);
        if (block) {
          currentTextboxText.value = block.text;
        }
      });
    }
    // Remove openSummarizer query parameter
    if (route.query.openSummarizer) {
      const query = { ...route.query };
      delete query.openSummarizer;
      router.replace({ query });
    }
    isDialogOpen.value = false;
  } catch (error) {
    console.error('Error processing summarization:', error);
    alert('Failed to process summarization.');
  } finally {
    isSummarizing.value = false;
  }
};

// Fetch notebook data from API with fallback
const fetchNotebook = async () => {
  isLoading.value = true;
  try {
    const access = localStorage.getItem('access');
    if (!access) throw new Error('No authentication token found');
    const response = await fetch('https://ccs8finalproj-production.up.railway.app/notebook/get/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      }
    });
    const data = await response.json();
    if (response.ok && data.status === 200 && data.notebooks && data.notebooks.length > 0) {
      const apiNotebook = data.notebooks[0]; // Use first notebook
      notebook.value = {
        id: apiNotebook['notebook ID'],
        title: apiNotebook.title,
        pages: apiNotebook.pages.map(page => ({
          id: page['page ID'],
          title: page.title,
          blocks: page.blocks.map(block => ({
            id: block['block ID'],
            text: block.content
          }))
        })),
        userdata: {},
        lastSaved: null
      };
      activePage.value = notebook.value.pages[0]?.id ?? null;
    } else {
      throw new Error('Invalid notebook data');
    }
  } catch (error) {
    console.warn('API fetch failed, using default notebook data:', error);
    notebook.value = {
      id: 1,
      title: "My Markdown Notebook",
      pages: [
        {
          id: 1,
          title: "Getting Started",
          blocks: [
            { id: 1, text: '# Welcome to Your Gravin Notebook\n\nThis is a **markdown-powered** notebook application.' },
            { id: 2, text: 'You can create multiple pages and add various content blocks.\n\n- Create lists\n- Add code snippets\n- Insert images\n- And much more!' }
          ]
        },
        {
          id: 2,
          title: "Markdown Examples",
          blocks: [
            { id: 3, text: '## Markdown Examples\n\n Here are some examples of what you can do with the markdown functionality:' },
            { id: 4, text: '### Code Blocks\n\n```javascript\nfunction helloWorld() {\n  console.log("Hello World!");\n}\n```' },
            { id: 5, text: '### Tables\n\n| Name | Email | Role |\n|------|-------|------|\n| John | john@example.com | Admin |\n| Jane | jane@example.com | Editor |' }
          ]
        }
      ],
      userdata: {},
      lastSaved: null
    };
    activePage.value = notebook.value.pages[0]?.id ?? null;
  } finally {
    isLoading.value = false;
  }
};

// Handle openSummarizer query parameter
watch(() => route.query.openSummarizer, (newValue) => {
  console.log('Route query openSummarizer:', newValue);
  if (newValue === 'true' || newValue === true || newValue === '1') {
    openDialog();
  } else {
    isDialogOpen.value = false;
  }
}, { immediate: true });

// Initialize
onMounted(() => {
  fetchNotebook();
  document.addEventListener('save-notebook', () => {
    saveNotebook();
  });
  document.addEventListener('open-ai-summarizer', () => {
    console.log('Received open-ai-summarizer event from NavBar');
    openDialog();
  });
});

provide('notebook', notebook);
provide('activePage', activePage);
provide('setActivePage', setActivePage);
provide('addPage', addPage);
provide('deletePage', deletePage);
</script>

<template>
  <div class="main-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-[#BD93F9] border-gray-200"></div>
        <p class="text-gray-600 mt-2">Loading notebook...</p>
      </div>
    </div>
    <!-- Mobile Layout -->
    <div v-else-if="isMobile" class="mobile-container">
      <EditorNavBar 
        :title="notebook.title" 
        @update-title="updateNotebookTitle"
        @save-notebook="saveNotebook"
        @load-notebook="loadNotebook"
        class="navbar"
      >
        <template #extra>
          <button
            @click="openDialog"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            aria-label="Open AI Summarizer"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg"
              alt="Summarizer icon"
              class="h-4 w-4"
            >
            AI Summarizer
          </button>
        </template>
      </EditorNavBar>
      <div class="content">
        <div class="main-content">
          <SideBarLeft class="sidebar-left" />
          <div class="page-container" :class="{ 'full-width': !activeBlock }">
            <div class="page-header">
              <h2 v-show="!editPageTitle" @click="editPageTitle = true" class="page-title" aria-label="Page title">
                {{ currentPage.title || 'Untitled Page' }}
              </h2>
              <input 
                v-show="editPageTitle"
                type="text" 
                v-model="currentPage.title" 
                @blur="editPageTitle = false"
                @keyup.enter="editPageTitle = false"
                @change="updatePageTitle(currentPage.id, currentPage.title)"
                class="page-title-input"
                placeholder="Page title"
                aria-label="Edit page title"
              />
            </div>
            <div class="blocks-container">
              <RegularText
                v-for="block in currentBlocks"
                :key="block.id"
                :id="block.id"
                :text="block.text"
                :selected="block.id === activeBlock"
                :render="true"
                @select="setActiveBlock"
                @update="updateText"
                @register-methods="registerMethods"
                class="block"
              />
            </div>
            <div class="flex gap-2">
              <button
                @click="addBlock"
                class="add-block-button flex-1"
                aria-label="Add new block"
              >
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/plus.svg" alt="Add icon" class="icon">
                Add Block
              </button>
              <button
                @click="openDialog"
                class="add-block-button flex-1 bg-purple-600 hover:bg-purple-700"
                aria-label="Import PDF"
              >
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" alt="Import PDF icon" class="icon">
                Import PDF
              </button>
            </div>
          </div>
          <SideBarRight
            v-if="activeBlock"
            ref="sidebarRef"
            v-model="currentTextboxText"
            :id="activeBlock"
            @delete="deleteBlock"
            @update:modelValue="updateText"
            @close="closeRightSidebar"
            class="sidebar-right"
          />
        </div>
      </div>
    </div>
    <!-- Desktop Layout -->
    <div v-else class="desktop-container">
      <EditorNavBar 
        :title="notebook.title" 
        @update-title="updateNotebookTitle"
        @save-notebook="saveNotebook"
        @load-notebook="loadNotebook"
        class="navbar"
      >
        <template #extra>
          <button
            @click="openDialog"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            aria-label="Open AI Summarizer"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg"
              alt="Summarizer icon"
              class="h-4 w-4"
            >
            AI Summarizer
          </button>
        </template>
      </EditorNavBar>
      <div class="main-content">
        <SideBarLeft class="sidebar-left-desktop" />
        <div class="content-area" role="main" aria-label="Editor content">
          <div class="page-container-desktop">
            <div v-if="currentPage" class="page-header-desktop">
              <div class="page-header-inner">
                <h2 v-show="!editPageTitle" @click="editPageTitle = true" class="page-title-desktop" aria-label="Page title">
                  {{ currentPage.title || 'Untitled Page' }}
                </h2>
                <input 
                  v-show="editPageTitle"
                  type="text" 
                  v-model="currentPage.title" 
                  @blur="editPageTitle = false"
                  @keyup.enter="editPageTitle = false"
                  @change="updatePageTitle(currentPage.id, currentPage.title)"
                  class="page-title-input-desktop"
                  placeholder="Page title"
                  aria-label="Edit page title"
                />
              </div>
            </div>
            <div class="blocks-container-desktop">
              <RegularText
                v-for="block in currentBlocks"
                :key="block.id"
                :id="block.id"
                :text="block.text"
                :selected="block.id === activeBlock"
                :render="true"
                @select="setActiveBlock"
                @update="updateText"
                @register-methods="registerMethods"
                class="block-desktop"
              />
            </div>
            <hr class="divider">
            <div class="flex gap-2">
              <button
                @click="addBlock"
                class="add-block-button-desktop flex-1"
                aria-label="Add new block"
              >
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/plus.svg" alt="Add icon" class="icon">
                Add Block
              </button>
              <button
                @click="openDialog"
                class="add-block-button-desktop flex-1 bg-purple-600 hover:bg-purple-700"
                aria-label="Import PDF"
              >
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" alt="Import PDF icon" class="icon">
                Import PDF
              </button>
            </div>
          </div>
        </div>
        <SideBarRight
          ref="sidebarRef"
          v-model="currentTextboxText"
          :id="activeBlock"
          @delete="deleteBlock"
          @update:modelValue="updateText"
          @close="closeRightSidebar"
          class="sidebar-right-desktop"
        />
      </div>
    </div>
    <!-- AI Summarizer Dialog -->
    <AISummarizerDialog
      :is-open="isDialogOpen"
      :is-summarizing="isSummarizing"
      @update:isOpen="isDialogOpen = $event"
      @submit="handleSummarizeSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      editPageTitle: false
    }
  }
}
</script>

<style scoped>
/* CSS Reset */
html, body {
  margin: 0;
  padding: 0;
}

/* Main Container */
.main-container {
  min-height: 100vh;
  min-height: calc(100vh - env(safe-area-inset-top));
  background-color: #f3f4f6;
}

/* Mobile Layout */
.mobile-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: calc(100vh - env(safe-area-inset-top));
  padding-bottom: 4rem;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 75;
}

/* Content */
.content {
  padding: 0.5rem;
  padding-top: 3rem; /* Offset for navbar height */
}

/* Main Content (Mobile) */
.main-content {
  display: flex;
  flex: 1;
}

/* Sidebar Left */
.sidebar-left {
  flex-shrink: 0;
}

/* Page Container */
.page-container {
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  flex: 1;
}

.page-container.full-width {
  margin-left: 50px; /* Offset for thin sidebar */
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

/* Page Title */
.page-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 100%;
}

.page-title:hover {
  background-color: #f9fafb;
}

/* Page Title Input */
.page-title-input {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
  background-color: white;
}

.page-title-input:focus {
  outline: none;
  border-color: #BD93F9;
  box-shadow: 0 0 0 2px #BD93F9;
}

/* Blocks Container */
.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Block */
.block {
  transition: outline 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

/* Add Block Button */
.add-block-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  background-color: #BD93F9;
  color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.15s ease;
}

/* Sidebar Right */
.sidebar-right {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

/* Desktop Layout */
.desktop-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: calc(100vh - env(safe-area-inset-top));
}

.main-content {
  display: flex;
  flex: 1;
  padding-top: 4rem; /* Offset for navbar */
}

.sidebar-left-desktop {
  height: calc(100vh - 4rem);
  position: sticky;
  top: 4rem;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 4rem);
  padding: 1.5rem;
  background-color: #f3f4f6;
}

.page-container-desktop {
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
}

.page-header-desktop {
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.page-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title-desktop {
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2937;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 100%;
}

.page-title-desktop:hover {
  background-color: #f9fafb;
}

.page-title-input-desktop {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2937;
  background-color: white;
}

.page-title-input-desktop:focus {
  outline: none;
  border-color: #BD93F9;
  box-shadow: 0 0 0 2px #BD93F9;
}

.blocks-container-desktop {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-desktop {
  transition: outline 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.divider {
  border-color: #e5e7eb;
  margin: 1.5rem 0;
}

.add-block-button-desktop {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: #BD93F9;
  color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.15s ease;
}

.add-block-button-desktop:hover {
  background-color: #A775F0;
}

.sidebar-right-desktop {
  height: calc(100vh - 4rem);
  position: sticky;
  top: 4rem;
}

/* Icons */
.icon {
  height: 1rem;
  width: 1rem;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-container {
    padding-bottom: 4rem;
  }
}
</style>
```
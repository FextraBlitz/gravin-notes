<script setup>
import { ref, watch, onMounted, nextTick, computed, provide } from 'vue'

import SideBarLeft from '~/components/editor/SideBarLeft.vue';
import SideBarRight from '~/components/editor/SideBarRight.vue';
import RegularText from '~/components/editor/content-types/RegularText.vue';
import EditorNavBar from '~/components/editor/EditorNavBar.vue';

definePageMeta({
  hideDefaultNavbar: true
});

// New data structure: notebook as the main object with pages containing blocks
const notebook = ref({
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
});

// Track which page is currently active
const activePage = ref(1);
const activeBlock = ref(null);
const currentTextboxText = ref('');

// Get the current page based on activePage
const currentPage = computed(() => {
  return notebook.value.pages.find(page => page.id === activePage.value) || notebook.value.pages[0];
});

// Get blocks of the current page
const currentBlocks = computed(() => {
  return currentPage.value?.blocks || [];
});

// Watch for active block changes to update the text
watch(() => activeBlock.value, (newId) => {
  if (newId !== null) {
    const block = findBlockById(newId);
    currentTextboxText.value = block?.text || '';
  } else {
    currentTextboxText.value = '';
  }
});

// Utility to find a block across all pages
const findBlockById = (blockId) => {
  for (const page of notebook.value.pages) {
    const block = page.blocks.find(b => b.id === blockId);
    if (block) return block;
  }
  return null;
};

// Block management
const blockRefs = ref({});
const blockMethods = ref({});

// Get next available ID for a new block
const getNextBlockId = () => {
  // Collect all block IDs across all pages
  const allBlockIds = notebook.value.pages.flatMap(page => 
    page.blocks.map(block => block.id)
  );
  
  return allBlockIds.length > 0 ? Math.max(...allBlockIds) + 1 : 1;
};

// Get next available ID for a new page
const getNextPageId = () => {
  const pageIds = notebook.value.pages.map(page => page.id);
  return pageIds.length > 0 ? Math.max(...pageIds) + 1 : 1;
};

// Register block references and methods
const registerRef = (el, id) => {
  if (el) blockRefs.value[id] = el;
};

const registerMethods = (id, methods) => {
  blockMethods.value[id] = methods;
};

// Add a new block to the current page
const addBlock = () => {
  const newId = getNextBlockId();
  
  if (currentPage.value) {
    currentPage.value.blocks.push({
      id: newId,
      text: ''
    });
    
    // Set this new block as active
    nextTick(() => {
      activeBlock.value = newId;
    });
  }
};

// Add a new page to the notebook
const addPage = () => {
  const newPageId = getNextPageId();
  
  notebook.value.pages.push({
    id: newPageId,
    title: `New Page`,
    blocks: []
  });
  
  // Activate the new page
  activePage.value = newPageId;
};

// Set the active block
const sidebarRef = ref(null);
const setActiveBlock = (id) => {
  activeBlock.value = id;
  
  // Update the current text when selecting a block
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

// Set the active page
const setActivePage = (pageId) => {
  activePage.value = pageId;
  activeBlock.value = null;
  currentTextboxText.value = '';
};

// Delete a block
const deleteBlock = (idToDelete) => {
  // Find which page contains this block
  for (const page of notebook.value.pages) {
    const blockIndex = page.blocks.findIndex(b => b.id === idToDelete);
    
    if (blockIndex !== -1) {
      // Remove the block from this page
      page.blocks.splice(blockIndex, 1);
      
      // Cleanup references and methods
      delete blockRefs.value[idToDelete];
      delete blockMethods.value[idToDelete];
      
      // If the active block was deleted, reset active state
      if (activeBlock.value === idToDelete) {
        activeBlock.value = null;
        currentTextboxText.value = '';
      }
      
      return; // Exit once we've found and deleted the block
    }
  }
  
  console.warn(`Block with ID ${idToDelete} not found`);
};

// Delete a page
const deletePage = (pageId) => {
  const pageIndex = notebook.value.pages.findIndex(p => p.id === pageId);
  
  if (pageIndex !== -1) {
    // Don't delete the last page
    if (notebook.value.pages.length <= 1) {
      alert("Cannot delete the last page.");
      return;
    }
    
    // If deleting the active page, switch to another page
    if (activePage.value === pageId) {
      const newActivePage = notebook.value.pages[pageIndex - 1]?.id || 
                            notebook.value.pages[pageIndex + 1]?.id;
      
      if (newActivePage) {
        activePage.value = newActivePage;
      }
      
      activeBlock.value = null;
      currentTextboxText.value = '';
    }
    
    // Remove all block references for blocks in this page
    notebook.value.pages[pageIndex].blocks.forEach(block => {
      delete blockRefs.value[block.id];
      delete blockMethods.value[block.id];
    });
    
    // Remove the page
    notebook.value.pages.splice(pageIndex, 1);
  } else {
    console.warn(`Page with ID ${pageId} not found`);
  }
};

// Update block text
const updateText = (newText) => {
  if (activeBlock.value !== null) {
    const block = findBlockById(activeBlock.value);
    if (block) {
      block.text = newText;
      currentTextboxText.value = newText; // Keep current text in sync
    }
  }
};

// Update page title
const updatePageTitle = (pageId, newTitle) => {
  const page = notebook.value.pages.find(p => p.id === pageId);
  if (page) {
    page.title = newTitle;
  }
};

// Update notebook title
const updateNotebookTitle = (newTitle) => {
  notebook.value.title = newTitle;
};

// Save the notebook as a JSON file with .gnb extension
const saveNotebook = () => {
  // Update timestamp
  notebook.value.lastSaved = new Date().toISOString();
  
  // Create a clean copy of the notebook data
  const notebookData = JSON.stringify(notebook.value, null, 2);
  
  // Create blob and download link
  const blob = new Blob([notebookData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = `${notebook.value.title.replace(/\s+/g, '_')}.gnb`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Load notebook data from a file
const loadNotebook = (notebookData) => {
  try {
    // Reset all current state
    activeBlock.value = null;
    currentTextboxText.value = '';
    blockRefs.value = {};
    blockMethods.value = {};
    
    // Update notebook data
    notebook.value = {
      ...notebook.value, // Keep the structure
      ...notebookData,   // Override with loaded data
    };
    
    // Set active page to the first page
    activePage.value = notebook.value.pages[0]?.id ?? null;
    
    console.log('Notebook loaded successfully');
  } catch (error) {
    console.error('Error loading notebook:', error);
    alert('Failed to load notebook data. Please try again with a valid file.');
  }
};

// Load notebook data on component mount
onMounted(async () => {
  try {
    const res = await fetch('/api/user/notebook');
    const notebookData = await res.json();

    if (notebookData && Array.isArray(notebookData.pages)) {
      notebook.value = {
        ...notebook.value, // preserve structure
        ...notebookData    // override with fetched data
      };

      activePage.value = notebook.value.pages[0]?.id ?? null;
    } else {
      console.warn("Invalid notebook data. Using default.");
    }
  } catch (e) {
    console.warn('API fetch failed, using default notebook data.');
  }
  
  // Add event listener for notebook save
  document.addEventListener('save-notebook', () => {
    saveNotebook();
  });
});

// Provide values to child components
provide('notebook', notebook);
provide('activePage', activePage);
provide('setActivePage', setActivePage);
provide('addPage', addPage);
provide('deletePage', deletePage);
</script>

<template>
  <div class="min-h-screen bg-amber-50 flex flex-col">
    <!-- Header -->
    <EditorNavBar 
      :title="notebook.title" 
      @update-title="updateNotebookTitle"
      @save-notebook="saveNotebook"
      @load-notebook="loadNotebook"
    />
    
    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <SideBarLeft />
      
      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto p-4 bg-white shadow-sm">
        <div v-if="currentPage" class="mb-4 border-b pb-2">
          <div class="flex items-center justify-between group">
            <h2 class="text-xl font-medium text-gray-800 group-hover:hidden">
              {{ currentPage.title || 'Untitled Page' }}
            </h2>
            <input 
              type="text" 
              v-model="currentPage.title" 
              @change="updatePageTitle(currentPage.id, currentPage.title)"
              class="border border-gray-300 rounded px-2 py-1 text-xl font-medium text-gray-800 hidden group-hover:block w-full"
              placeholder="Page title"
            />
          </div>
        </div>
        
        <!-- Block Content -->
        <div class="space-y-4">
          <RegularText
            v-for="block in currentBlocks"
            :key="block.id"
            :id="block.id"
            :text="block.text"
            :selected="block.id === activeBlock"
            @select="setActiveBlock"
            @update="updateText"
            @register-methods="registerMethods"
          />
        </div>
        
        <!-- Add Block Button -->
        <div
          @click="addBlock"
          class="mt-4 flex items-center justify-center h-12 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          ADD BLOCK
        </div>
      </div>
      
      <!-- Right Sidebar -->
      <SideBarRight
        ref="sidebarRef"
        v-model="currentTextboxText"
        :id="activeBlock"
        @delete="deleteBlock"
        @update:modelValue="updateText"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add transitions and other styling */
.transition-colors {
  transition: background-color 0.2s ease;
}
</style>
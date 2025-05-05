<!-- EditorNavBar.vue -->
<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Untitled Notebook'
  }
});

const emit = defineEmits(['update-title', 'save-notebook', 'load-notebook']);

const isEditing = ref(false);
const editableTitle = ref(props.title);

const startEditing = () => {
  editableTitle.value = props.title;
  isEditing.value = true;
};

const finishEditing = () => {
  isEditing.value = false;
  emit('update-title', editableTitle.value);
};

const saveNotebook = () => {
  emit('save-notebook');
};

const loadNotebook = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check if the file has the correct extension
    if (!file.name.endsWith('.gnb')) {
      alert('Please select a valid .gnb notebook file.');
      event.target.value = ''; // Reset the file input
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const notebookData = JSON.parse(e.target.result);
        // Validate the file has the expected structure
        if (!notebookData.pages || !Array.isArray(notebookData.pages)) {
          throw new Error('Invalid notebook format');
        }
        emit('load-notebook', notebookData);
      } catch (error) {
        alert('Error loading notebook: Invalid format');
        console.error('Error parsing notebook file:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset the file input for future loads
  }
};

// Create a hidden file input reference
const fileInputRef = ref(null);

const triggerFileInput = () => {
  fileInputRef.value.click();
};
</script>

<template>
  <header class="bg-amber-100 shadow-md px-4 py-3 flex items-center justify-between">
    <!-- Logo and Title -->
    <div class="flex items-center">
      <!-- Logo -->
      <div class="h-8 w-8 bg-amber-500 rounded-md flex items-center justify-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      </div>
      
      <!-- Title (can be edited) -->
      <div @click="startEditing" class="cursor-pointer">
        <span v-if="!isEditing" class="text-xl font-semibold text-gray-800">
          {{ title }}
        </span>
        <input
          v-else
          ref="titleInput"
          v-model="editableTitle"
          @blur="finishEditing"
          @keyup.enter="finishEditing"
          class="text-xl font-semibold border-b-2 border-amber-500 bg-transparent focus:outline-none"
          type="text"
        />
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex items-center space-x-2">
      <!-- Load Button -->
      <button 
        @click="triggerFileInput"
        class="px-3 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Load
      </button>
      
      <!-- Hidden file input -->
      <input 
        ref="fileInputRef"
        type="file" 
        accept=".gnb"
        @change="loadNotebook"
        class="hidden"
      />
      
      <!-- Save Button -->
      <button 
        @click="saveNotebook"
        class="px-3 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-white flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Save
      </button>
    </div>
  </header>
</template>
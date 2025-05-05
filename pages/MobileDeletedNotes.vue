<template>
  <div class="mobile-deleted-notes-page">
    <h1 class="deleted-notes-title">Recently Deleted Notes</h1>
    <div class="deleted-notebook-list">
      <!-- Loop through deleted notebooks -->
      <div
        v-for="(notebook, index) in deletedNotebooks"
        :key="index"
        class="deleted-notebook-item"
      >
        <h2 class="deleted-notebook-name">{{ notebook.name }}</h2>
        <div class="deleted-page-list">
          <!-- Loop through pages in each notebook -->
          <div
            v-for="(page, pageIndex) in notebook.pages"
            :key="pageIndex"
            class="deleted-page-item"
            @click="showActionDialog(index, pageIndex)"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg"
              alt="Page"
              class="deleted-page-icon"
            />
            Page {{ pageIndex + 1 }}
          </div>
        </div>
      </div>
    </div>
    <div class="clear-all-container">
      <button class="clear-all-button" @click="clearAllDeletedNotes">
        Clear All
      </button>
    </div>
    <div class="bottom-nav">
      <div class="nav-item" @click="$emit('navigateToHomepage')">
        <img
          src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/home.svg"
          alt="Home"
          class="nav-icon"
        />
        Home
      </div>
      <div class="nav-item" @click="$emit('navigateToSummarizer')">
        <img
          src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cpu.svg"
          alt="AI"
          class="nav-icon"
        />
        AI
      </div>
      <div class="nav-item" @click="$emit('navigateToNotes')">
        <img
          src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg"
          alt="Notes"
          class="nav-icon"
        />
        Notes
      </div>
      <div class="nav-item" @click="$emit('navigateToOptions')">
        <img
          src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/more-horizontal.svg"
          alt="More"
          class="nav-icon"
        />
        More
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Mock data for deleted notebooks (replace with your actual data structure)
const deletedNotebooks = reactive([
  { name: 'Notebook 1', pages: [{}, {}] },
  { name: 'Notebook 2', pages: [{}, {}, {}] },
]);

// State for the action dialog
const showDialog = ref(false);
const selectedNotebookIndex = ref(null);
const selectedPageIndex = ref(null);

const goToHome = () => {
  router.push('/MobileHomepage');
};
const goToAI = () => {
  router.push('/MobileSummarizer');
};
const goToNotes = () => {
  router.push('/MobileNotes');
};
const goToMore = () => {
  router.push('/MobileOptions');
};

// Function to show the action dialog
const showActionDialog = (notebookIndex, pageIndex) => {
  showDialog.value = true;
  selectedNotebookIndex.value = notebookIndex;
  selectedPageIndex.value = pageIndex;
};

// Function to close the action dialog
const closeDialog = () => {
  showDialog.value = false;
  selectedNotebookIndex.value = null;
  selectedPageIndex.value = null;
};

// Function to clear all deleted notes
const clearAllDeletedNotes = () => {
  deletedNotebooks.splice(0, deletedNotebooks.length);
};
</script>

<style scoped>
.mobile-deleted-notes-page 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #f0f0f0;
}

.deleted-notes-title 
{
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.deleted-notebook-list 
{
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.deleted-notebook-item 
{
  padding: 15px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.deleted-notebook-name 
{
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.deleted-page-list 
{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.deleted-page-item 
{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 45%;
  min-width: 80px;
  gap: 5px;
}

.deleted-page-item:hover 
{
  background-color: #d0d0d0;
}

.deleted-page-icon 
{
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.clear-all-container 
{
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.clear-all-button 
{
  padding: 12px 20px;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-all-button:hover {
  background-color: #c82333;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.nav-item 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
  cursor: pointer;
}

.nav-icon 
{
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
  object-fit: contain;
}

/* Styles for the Action Dialog (Modal) */
.dialog-overlay 
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.action-dialog 
{
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dialog-title 
{
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0;
}

.dialog-description 
{
  font-size: 1rem;
  color: #555;
  text-align: center;
}

.dialog-buttons 
{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.dialog-button 
{
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

.restore-button 
{
  background-color: #007bff;
  color: #ffffff;
}

.restore-button:hover 
{
  background-color: #0056b3;
}

.delete-button 
{
  background-color: #dc3545;
  color: #ffffff;
}

.delete-button:hover 
{
  background-color: #c82333;
}

.cancel-button 
{
  background-color: #e0e0e0;
  color: #333;
}

.cancel-button:hover 
{
  background-color: #ccc;
}
</style>

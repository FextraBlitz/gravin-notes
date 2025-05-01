<template>
    <div class="mobile-notes-page">
      <h1 class="notes-title">My Notebooks</h1>
      <div class="notebook-list">
        <div v-for="(notebook, index) in notebooks" :key="index" class="notebook-item">
          <div class="notebook-header">
            <input
              type="text"
              v-model="notebook.name"
              placeholder="Notebook Name"
              class="notebook-name-input"
              @blur="updateNotebookName(index, notebook.name)"
            />
            <button class="rename-button" @click="renameNotebook(index)">
               <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit.svg" alt="Rename" class="rename-icon"/>
            </button>
          </div>
          <div class="page-list">
            <div v-for="(page, pageIndex) in notebook.pages" :key="pageIndex" class="page-item" @click="goToPage(index, pageIndex)">
               <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" alt="Page" class="page-icon"/>
              Page {{ pageIndex + 1 }}
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-nav">
        <div class="nav-item" @click="$emit('navigateToHomepage')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/home.svg" alt="Home" class="nav-icon" />
          Home
        </div>
        <div class="nav-item" @click="$emit('navigateToSummarizer')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cpu.svg" alt="AI" class="nav-icon" />
          AI
        </div>
        <div class="nav-item" @click="$emit('navigateToNotes')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" alt="Notes" class="nav-icon" />
          Notes
        </div>
        <div class="nav-item" @click="$emit('navigateToOptions')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/more-horizontal.svg" alt="More" class="nav-icon" />
          More
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Mock data for notebooks (replace with your actual data structure)
  const notebooks = reactive([
    { name: 'Notebook 1', pages: [{}, {}, {}, {}] },
    { name: 'Notebook 2', pages: [{}, {}, {}, {}, {}, {}, {}] },
    { name: 'Notebook 3', pages: [{}, {}, {}] },
  ]);
  
  const goToHome = () => 
  {
    router.push('/MobileHomepage');
  };
  const goToAI = () => 
  {
    router.push('/MobileSummarizer');
  };
  const goToNotes = () => 
  {
    router.push('/MobileNotes');
  };
  const goToMore = () => 
  {
    router.push('/MobileOptions');
  };
  
  /* Placeholder functions for notebook and page interactions
  const renameNotebook = (index: number) => {
    console.log(`Renaming notebook ${index + 1}`);
    // Implement your logic to allow user to edit the notebook name
  };
  
  const updateNotebookName = (index: number, newName: string) => {
      console.log(`Updated notebook ${index + 1} name to: ${newName}`);
      notebooks[index].name = newName;
  };
  
  const goToPage = (notebookIndex: number, pageIndex: number) => {
    console.log(`Navigating to page ${pageIndex + 1} of notebook ${notebookIndex + 1}`);
    // Implement your logic to navigate to the specific page
    // You might use router.push with a dynamic route
    // Example: router.push(`/notebook/${notebookIndex}/page/${pageIndex}`);
  };*/
  </script>
  
  <style scoped>
  .mobile-notes-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .notes-title 
  {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .notebook-list 
  {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .notebook-item 
  {
    padding: 15px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .notebook-header 
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
  }
  
  .notebook-name-input 
  {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    border: none;
    flex: 1;
    padding: 5px;
    border-bottom: 2px solid #ddd;
  }
  
  .notebook-name-input:focus 
  {
    outline: none;
    border-bottom-color: #007bff;
  }
  
  .rename-button 
  {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .rename-icon 
  {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .page-list 
  {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .page-item 
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
    width: 45%; /* Adjust as needed for layout */
    min-width: 80px;
    gap: 5px;
  }
  
  .page-item:hover 
  {
    background-color: #d0d0d0;
  }
  
  .page-icon
  {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
  
  .bottom-nav 
  {
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
  </style>
  
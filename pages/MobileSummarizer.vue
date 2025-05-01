<template>
    <div class="ai-summarizer-page">
      <h1 class="app-title">GRAVIN Notes</h1>
      <div class="large-box-container">
        <div class="large-box">
          </div>
      </div>
      <div class="input-container">
        <textarea
          v-model="inputContent"
          placeholder="Type something here..."
          class="input-box"
        ></textarea>
        <div class="button-group">
          <button class="upload-button">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/upload.svg" alt="Upload" class="upload-icon"/>
          </button>
          <button class="send-button" @click="sendInput">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/send.svg" alt="Send" class="send-icon"/>
          </button>
        </div>
      </div>
      <div class="bottom-nav">
        <div class="nav-item" @click="$emit('navigateToHomepage')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/home.svg" alt="Home" class="nav-icon"/>
          Home
        </div>
        <div class="nav-item" @click="$emit('navigateToSummarizer')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cpu.svg" alt="AI" class="nav-icon"/>
          AI
        </div>
        <div class="nav-item" @click="goToNotes">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" alt="Notes" class="nav-icon"/>
          Notes
        </div>
        <div class="nav-item" @click="$emit('navigateToOptions')">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/more-horizontal.svg" alt="More" class="nav-icon"/>
          More
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const inputContent = ref('');
  
  const sendInput = () => 
  {
    // Implement your AI summarization logic here
    console.log('Sending input:', inputContent.value);
    // Clear the input after sending (optional)
    inputContent.value = '';
    // You would typically send this to a server and display the response
    // in the large box.
  };
  
  const goToHome = () => 
  {
    router.push('/MobileLandingPage');
  };
  const goToAI = () => 
  {
    router.push('/MobileSummarizer');
  };
  const goToNotes = () => 
  {
    router.push('/notes');
  };
  const goToMore = () => 
  {
    router.push('/MobileOptions');
  };
  </script>
  
  <style scoped>
  .ai-summarizer-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .app-title 
  {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .large-box-container 
  {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    align-items: center; /* Center the prompt text */
  }
  
  .large-box 
  {
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 15px;
    margin-bottom: 10px;
    border: 2px dashed #ccc; /* Added dashed border */
  }
  
  .prompt-text{
    font-size: 1rem;
    color: #555;
    text-align: center;
  }
  
  .input-container 
  {
    display: flex;
    width: 100%;
    max-width: 400px;
    align-items: center;
    gap: 10px;
  }
  
  .input-box 
  {
    flex: 1;
    padding: 15px;
    border-radius: 15px;
    border: 1px solid #ccc;
    font-size: 1.2rem;
    resize: none;
    height: auto; /* Make height auto-adjustable */
    min-height: 50px;  /* Ensure it has a minimum height */
  }
  
  .input-box::placeholder 
  {
    color: #aaa;
  }
  
  .button-group 
  {
    display: flex;
    gap: 10px;
  }
  
  .upload-button,
  .send-button 
  {
    padding: 12px;
    border-radius: 10px;
    border: none;
    background-color: #e0e0e0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .upload-button:hover,
  .send-button:hover 
  {
    background-color: #d0d0d0;
  }
  
  .upload-icon,
  .send-icon 
  {
    width: 24px;
    height: 24px;
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
  
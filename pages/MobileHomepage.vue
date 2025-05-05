<template>
  <div class="mobile-homepage">
    <h1 class="app-title">GRAVIN Notes</h1>
    <p class="i-want-to-text">I want to:</p>
    <div class="button-container">
      <button class="feature-button ai-summarizer-button" @click="$emit('navigateToSummarizer')">
        <div class="icon-container">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cpu.svg" alt="AI Icon" class="ai-icon" />
        </div>
        Use the AI Summarizer
      </button>
      <button class="feature-button view-notes-button" @click="$emit('navigateToLogin')">
        <div class="icon-container">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg" alt="Notes Icon" class="notes-icon" />
        </div>
        View my notes
      </button>
    </div>
    <div class="bottom-nav">
      <div class="nav-item" @click="$emit('navigateToLandingPage')">
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
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => 
{
  router.push('/MobileLandingPage'); // Adjust the route
};
const goToMyNotes = () => 
{
  router.push('/MobileLogin'); // Adjust the route
};

const goToAI = () => 
{
  router.push('/MobileSummarizer');
};

const goToMore = () => 
{
  router.push('/MobileOptions');
};
</script>

<style scoped>
.mobile-homepage 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #f0f0f0; /* Light background */
}

.app-title 
{
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.i-want-to-text 
{
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
}

.button-container 
{
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; /* max width */
  gap: 20px;
}

.feature-button 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px; /* Increased height */
  background-color: #e0e0e0; /* Light gray buttons */
  border-radius: 15px;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  padding: 10px;
  text-align: center;
}

.feature-button:hover 
{
  background-color: #d0d0d0; /* Slightly darker on hover */
}

.icon-container 
{
  width: 50px; /* Increased icon size */
  height: 50px;
  margin-bottom: 10px;
  /* You can style the svg directly or wrap it in a container */
}

.ai-icon,
.notes-icon 
{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.bottom-nav 
{
  position: fixed; /* Stick to bottom */
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
}
</style>


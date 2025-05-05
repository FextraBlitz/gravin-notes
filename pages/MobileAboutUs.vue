<template>
    <div class="mobile-about-us-page">
      <div class="logo-container">
        <img src="/assets/icons/image1.png" alt="Gravin Notes Logo" class="h-30 w-30 object-contain ml-2" />
      </div>
      <div class="about-content">
        <p class="version-info">Version Alpha Build 1.0</p>
        <p class="find-us">Find out more about us here!</p>
        <a href="https://gravinnotes.com" class="website-link">gravinnotes.com</a>
        <div class="social-links">
          <div class="social-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/facebook.svg" alt="Facebook" class="social-icon" />
            Facebook
          </div>
          <div class="social-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/twitter.svg" alt="Twitter" class="social-icon" />
            Twitter
          </div>
          <div class="social-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/instagram.svg" alt="Instagram" class="social-icon" />
            Instagram
          </div>
          <div class="social-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/linkedin.svg" alt="LinkedIn" class="social-icon" />
            LinkedIn
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
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
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
    router.push('/');
  };
  </script>
  
  <style scoped>
  .mobile-about-us-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .logo-container 
  {
    width: 100%;
    max-width: 400px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center; /* Center the logo placeholder */
  }
  
  .logo-image 
  {
  width: 800px; /* Adjust the size of the logo */
  height: auto;
  object-fit: contain;
  }
  
  .about-content 
  {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    text-align: center;
  }
  
  .version-info 
  {
    font-size: 1rem;
    color: #555;
  }
  
  .find-us 
  {
    font-size: 1.2rem;
    color: #333;
    font-weight: bold;
  }
  
  .website-link 
  {
    font-size: 1.2rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .website-link:hover 
  {
    text-decoration: underline;
  }
  
  .social-links 
  {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  
  .social-item 
  {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1rem;
    color: #333;
  }
  
  .social-icon 
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
  
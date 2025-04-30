<template>
    <div class="mobile-options-page">
      <div class="logo-container">
        <div class="logo-placeholder">
            <img src="/assets/icons/image1.png" alt="Gravin Notes Logo" class="h-30 w-30 object-contain ml-7" />
          </div>
      </div>
      <div class="options-list">
        <div class="option-item" @click="goToManageNotes">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/edit.svg" alt="Manage Notes" class="option-icon"/>
          Manage Notes
        </div>
        <div class="option-item" @click="goToRecentlyDeleted">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg" alt="Recently Deleted Notes" class="option-icon"/>
          Recently Deleted Notes
        </div>
        <div class="option-item" @click="goToManageAccount">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/user.svg" alt="Manage your account" class="option-icon"/>
          Manage your account
        </div>
        <div class="option-item" @click="goToDeleteAccount">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/user-x.svg" alt="Delete account" class="option-icon"/>
          Delete account
        </div>
        <div class="option-item" @click="goToAbout">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/info.svg" alt="About" class="option-icon"/>
          About
        </div>
        <div class="option-item" @click="goToFAQ">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/help-circle.svg" alt="FAQ" class="option-icon"/>
          FAQ
        </div>
        <div class="option-item" @click="goToSettings">
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/settings.svg" alt="Settings" class="option-icon"/>
          Settings
        </div>
      </div>
      <div class="contact-us">
        <p>Contact us on:</p>
        <div class="contact-options">
          <div class="contact-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/mail.svg" alt="Email" class="contact-icon"/>
            contact@GravinNotes.com
          </div>
          <div class="contact-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/facebook.svg" alt="Facebook" class="contact-icon"/>
            Facebook
          </div>
          <div class="contact-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/twitter.svg" alt="Twitter" class="contact-icon"/>
            Twitter
          </div>
          <div class="contact-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/instagram.svg" alt="Instagram" class="contact-icon"/>
            Instagram
          </div>
          <div class="contact-item">
            <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/linkedin.svg" alt="LinkedIn" class="contact-icon"/>
            LinkedIn
          </div>
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
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToManageNotes = () => 
  {
    router.push('/manage-notes'); //  Adjust the route
  };
  const goToRecentlyDeleted = () => 
  {
    router.push('/recently-deleted'); //  Adjust the route
  };
  const goToManageAccount = () => 
  {
    router.push('/manage-account'); //  Adjust the route
  };
  const goToDeleteAccount = () => 
  {
    router.push('/delete-account'); //  Adjust the route
  };
  const goToAbout = () => 
  {
    router.push('/about'); //  Adjust the route
  };
  const goToFAQ = () => 
  {
    router.push('/faq'); //  Adjust the route
  };
  const goToSettings = () => 
  {
    router.push('/settings'); //  Adjust the route
  };
  
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
    router.push('/notes');
  };
  const goToMore = () => 
  {
    router.push('/MobileOptions');
  };
  </script>
  
  <style scoped>
  .mobile-options-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
    overflow-y: auto;
  }
  
  .logo-container 
  {
    width: 100%;
    max-width: 400px;
    margin-bottom: 30px;
  }

  .logo-placeholder 
  {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  
  .logo-image 
  {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  }
  
  .options-list 
  {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .option-item 
  {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 15px;
    font-size: 1.2rem;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  
  .option-item:hover 
  {
    background-color: #f0f0f0;
  }
  
  .option-icon 
  {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .contact-us 
  {
    width: 100%;
    max-width: 400px;
    margin-top: 30px;
  }
  
  .contact-us p 
  {
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
  }
  
  .contact-options 
  {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .contact-item 
  {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1rem;
    color: #333;
  }
  
  .contact-icon 
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
  
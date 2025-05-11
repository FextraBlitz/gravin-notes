<template>
    <div class="mobile-delete-account-page">
      <div class="logo-container">
        <img src="/assets/icons/image1.png" alt="Gravin Notes Logo" class="h-30 w-30 object-contain ml-2" />
      </div>
      <div class="confirmation-section">
        <h2 class="confirmation-title">
          Are you sure you want to delete your account?
        </h2>
        <p class="confirmation-warning">(Your notes will be deleted!)</p>
      </div>
      <div class="button-section">
        <button class="yes-button" @click="$emit('navigateToLandingPage')">Yes</button>
        <button class="no-button" @click="$emit('navigateToAccount')">No</button>
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
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const handleYes = () => 
  {
    // Implement your account deletion logic here
    console.log('Deleting account...');
  
    // Simulate a short delay (e.g., for an API call)
    setTimeout(() => {
      // Redirect to the landing page
      router.push('/MobileLandingPage');
    }, 1000); // 1-second delay
  };
  
  const handleNo = () => 
  {
    // Redirect back to the profile/account page
    router.push('/MobileAccount'); //  Make sure this matches your actual route name
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
    router.push('/MobileNotes');
  };
  const goToMore = () => 
  {
    router.push('/MobileOptions');
  };
  </script>
  
  <style scoped>
  .mobile-delete-account-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* Push content to top and bottom */
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .logo-container 
  {
    width: 100%;
    max-width: 400px;
    margin-top: 20px; /* Add margin to the top */
    margin-bottom: 20px; /* Add margin below the logo placeholder */
    display: flex;
    justify-content: center; /* Center the logo placeholder */
  }
  
  .logo-image 
  {
  width: 500px; /* Adjust the size of the logo */
  height: autopx;
  object-fit: contain;
  }
  
  .confirmation-section 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .confirmation-title 
  {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .confirmation-warning 
  {
    font-size: 1rem;
    color: #dc3545;
  }
  
  .button-section 
  {
    display: flex;
    gap: 20px;
    margin-bottom: 150px; /* Push to the bottom */
  }
  
  .yes-button,
  .no-button 
  {
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    width: 150px;
  }
  
  .yes-button 
  {
    background-color: #dc3545;
    color: #ffffff;
  }
  
  .yes-button:hover 
  {
    background-color: #c82333;
  }
  
  .no-button 
  {
    background-color: #e0e0e0;
    color: #333;
  }
  
  .no-button:hover 
  {
    background-color: #ccc;
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
  
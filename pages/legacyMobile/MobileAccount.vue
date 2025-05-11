<template>
    <div class="mobile-account-page">
      <div class="header-section">
        <div class="circle-design"></div>
        <div class="profile-info">
          <div class="profile-picture-placeholder">
            </div>
          <div class="camera-icon">
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/camera.svg"
              alt="Camera"
              class="camera-icon-img"
            />
          </div>
        </div>
      </div>
      <div class="form-section">
        <div class="input-group">
          <label for="email">Email address</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" />
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/mail.svg"
            alt="Email"
            class="input-icon"
          />
        </div>
        <div class="change-password-section">
          <h2 class="change-password-title">Change Password</h2>
          <div class="input-group">
            <label for="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              v-model="currentPassword"
              placeholder="Enter your current password"
            />
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/lock.svg"
              alt="Password"
              class="input-icon"
            />
             <button class="password-toggle-button" @click="toggleCurrentPasswordVisibility">
              <img :src="currentPasswordVisible ? 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye-off.svg' : 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye.svg'" :alt="currentPasswordVisible ? 'Hide Password' : 'Show Password'" class="password-toggle-icon" />
            </button>
          </div>
          <div class="input-group">
            <label for="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              v-model="newPassword"
              placeholder="Enter your new password"
            />
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/lock.svg"
              alt="Password"
              class="input-icon"
            />
            <button class="password-toggle-button" @click="toggleNewPasswordVisibility">
              <img :src="newPasswordVisible ? 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye-off.svg' : 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye.svg'" :alt="newPasswordVisible ? 'Hide Password' : 'Show Password'" class="password-toggle-icon" />
            </button>
          </div>
        </div>
        <div class="input-group">
          <label for="display-name">Display Name</label>
          <input
            type="text"
            id="display-name"
            v-model="displayName"
            placeholder="Enter your display name"
          />
        </div>
      </div>
      <div class="delete-account-section">
        <a href="#" class="delete-account-link" @click="$emit('navigateToDeleteAccount')">
          Delete your account?
        </a>
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // State variables for form inputs
  const email = ref('');
  const currentPassword = ref('');
  const newPassword = ref('');
  const displayName = ref('');
  const currentPasswordVisible = ref(false);
  const newPasswordVisible = ref(false);
  
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
  
  const goToDeleteAccount = () => 
  {
    //  Replace '/delete-account' with the actual route to your delete account page
    router.push('/MobileDeleteAccount');
  };
  
  const toggleCurrentPasswordVisibility = () => 
  {
    currentPasswordVisible.value = !currentPasswordVisible.value;
  };
  
  const toggleNewPasswordVisibility = () => 
  {
    newPasswordVisible.value = !newPasswordVisible.value;
  };
  </script>
  
  <style scoped>
  .mobile-account-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .header-section 
  {
    width: 100%;
    max-width: 400px;
    height: 200px;
    background-color: #ddd;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
  }
  
  .profile-info 
  {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-picture-placeholder 
  {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #ccc;
  }
  
  .camera-icon 
  {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -15px;
    margin-left: 70px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .camera-icon-img 
  {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
  
  .form-section 
  {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
  }
  
  .input-group label 
  {
    font-size: 1rem;
    color: #333;
  }
  
  .input-group input 
  {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1.2rem;
    padding-left: 40px;
  }
  
  .input-group input:focus
  {
      outline: none;
      border-color: #007bff;
  }
  
  .input-icon 
  {
    position: absolute;
    left: 10px;
    top: 70%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .change-password-section 
  {
    margin-top: 10px;
  }
  
  .change-password-title 
  {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
  
  .delete-account-section 
  {
    margin-top: 30px;
    text-align: center;
  }
  
  .delete-account-link 
  {
    font-size: 1rem;
    color: #dc3545;
    text-decoration: none;
  }
  
  .delete-account-link:hover 
  {
    text-decoration: underline;
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
  
  .password-input-wrapper 
  {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .password-input-wrapper input 
  {
    flex: 1;
    padding-right: 40px;
    padding-left: 40px;
  }
  
  .password-toggle-button 
  {
    position: absolute;
    right: 10px;
    top: 70%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  
  .password-toggle-icon 
  {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  </style>
  
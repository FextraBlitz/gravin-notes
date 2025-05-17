<template>
    <div class="mobile-signup-page">
      <div class="signup-card">
        <h1 class="signup-title">Create Account</h1>
        <p class="signup-description">
          Sign up to start using GRAVIN Notes.
        </p>
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="name" placeholder="Enter your username"/>
        </div>
        <div class="input-group">
          <label for="email">Email address</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email"/>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="password" v-model="password" placeholder="Enter your password"/>
            <button class="password-toggle-button" @click="togglePasswordVisibility">
              <img :src="passwordVisible ? 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye-off.svg' : 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye.svg'" :alt="passwordVisible ? 'Hide Password' : 'Show Password'" class="password-toggle-icon" />
            </button>
          </div>
        </div>
        <button @click="createAccount" class="create-account-button">Create Account</button>
        <div class="login-prompt">
          Already have an account?
          <NuxtLink to="/DesktopLogin" class="login-link">Sign up here</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const passwordVisible = ref(false);
  
  const createAccount = async() => 
  {
    try {
    const response = await fetch("https://ccs8finalproj-production.up.railway.app/accounts/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value, 
        email: email.value
      })
    });

    const data = await response.json();
    if ('user' in data) {
      alert("Created successfully!");
      localStorage.setItem('access', data.access);
      router.push('/'); 
    } else {
      alert("Account not created: " + data.message);
    }
  } catch (error) {
    alert("An error occurred while creating an account.");
  }
  };
  
  const togglePasswordVisibility = () => 
  {
    passwordVisible.value = !passwordVisible.value;
  };
  </script>
  
  <style scoped>
  .mobile-signup-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .signup-card 
  {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .signup-title 
  {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  
  .signup-description 
  {
    font-size: 1rem;
    color: #555;
    text-align: center;
  }
  
  .input-group 
  {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
  }
  
  .password-toggle-button 
  {
    position: absolute;
    right: 10px;
    top: 50%;
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
  
  .create-account-button 
  {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-radius: 10px;
    border: none;
    background-color: #007bff;
    font-size: 1.2rem;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
  }
  
  .create-account-button:hover 
  {
    background-color: #0056b3;
  }
  
  .login-prompt 
  {
    font-size: 1rem;
    color: #555;
    text-align: center;
  }
  
  .login-link 
  {
    color: #007bff;
    cursor: pointer;
  }
  </style>
  
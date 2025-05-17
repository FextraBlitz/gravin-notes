<template>
    <div>
    <div class="mobile-login-page">
      <div class="login-card">
        <h1 class="login-title">Sign In</h1>
        <p class="login-description">
          Log in by entering your Username and password.
        </p>
        <div class="input-group">
          <label for="Username">Username</label>
          <input type="text" id="Username" v-model="email" placeholder="Enter your Username" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="password" v-model="password" placeholder="Enter your password" />
            <button class="password-toggle-button" @click="togglePasswordVisibility">
              <img :src="passwordVisible ? 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye-off.svg' : 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/eye.svg'" :alt="passwordVisible ? 'Hide Password' : 'Show Password'" class="password-toggle-icon" />
            </button>
          </div>
          <a href="#" class="forgot-password-link">Forgot password?</a>
        </div>
        <!-- <NuxtLink to="/" @click="login" class="login-button">Log In</NuxtLink> -->
        <button @click="login" class="login-button">Log In</button>

        <div class="remember-me">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember me</label>
        </div>
        <div class="signup-prompt">
          Don't have an account?
          <NuxtLink to="/DesktopSignup" class="signup-link">Sign up here</NuxtLink>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import NavBar from '~/components/NavBar.vue';
  
  defineEmits(['navigateToHomepage']);
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const passwordVisible = ref(false);
  
  const login = async () => {
  try {
    const response = await fetch("https://ccs8finalproj-production.up.railway.app/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: Username.value,
        password: password.value
      })
    });

    const data = await response.json();
    if ('access' in data) {
      alert("Login successful!");
      localStorage.setItem('access', data.access);
      router.push('/'); 
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    alert("An error occurred while logging in.");
  }
};

  const goToSignup = () => {
    router.push('/signup'); // Navigate to the signup page
  };
  
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  
  // Log when the component is mounted
  onMounted(() => {
    console.log('DesktopLogin component loaded');
  });
  </script>
  
  <style scoped>
  .mobile-login-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .login-card 
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
  
  .login-title 
  {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  
  .login-description 
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
    position: relative; /* Make this a positioning context */
    display: flex;
    align-items: center;
  }
  
  .password-input-wrapper input 
  {
    flex: 1; /* Ensure the input takes up available space */
    padding-right: 40px; /* Make space for the button */
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
    display: flex;  /* Use flexbox for centering */
    align-items: center;
    justify-content: center;
    width: 24px; /* Ensure a minimum size for the button */
    height: 24px;
  }
  
  .password-toggle-icon 
  {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  
  .forgot-password-link 
  {
    font-size: 0.9rem;
    color: #007bff;
    text-align: right;
  }
  
  .login-button 
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
  
  .login-button:hover 
  {
    background-color: #0056b3;
  }
  
  .remember-me 
  {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .or-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #aaa;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .divider-text 
  {
    padding: 0 10px;
  }
  
  .or-divider::before,
  .or-divider::after 
  {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }
  
  
  .google-login-button 
  {
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    font-size: 1.2rem;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .google-icon
  {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .signup-prompt 
  {
    font-size: 1rem;
    color: #555;
    text-align: center;
  }
  
  .signup-link 
  {
    color: #000000;
    cursor: pointer;
  }
  </style>
  
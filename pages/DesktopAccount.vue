<template>
    <div class="account-page">
      <main class="main-content">
        <h1 class="page-title">Manage Your Account</h1>
        <div class="main-container">
          <div class="left-section">
            <div class="avatar-placeholder">
              </div>
            <button class="edit-avatar-button">Edit Avatar</button>
            <button class="change-password-button">Change password</button>
            <button class="logout-button">Logout</button>
          </div>
          <div class="right-section">
            <div class="form-group">
              <label for="display-name">Display Name</label>
              <input type="text" id="display-name" v-model="displayName" placeholder="Enter your display name" />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" v-model="email" placeholder="Enter your email address" />
            </div>
            <div class="form-group">
              <label for="contact-number">Contact Number</label>
              <input type="text" id="contact-number" v-model="contactNumber" placeholder="Enter your contact number" />
            </div>
            <div class="form-group">
              <label for="school">School / University (If applicable)</label>
              <input type="text" id="school" v-model="school" placeholder="Enter your school/university" />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" v-model="address" placeholder="Enter your address" />
            </div>
          </div>
        </div>
      </main>
      <footer class="footer">
        <p class="footer-links">
          <a href="/DesktopAboutUs.html">About Us</a> | 
          <a href="/DesktopFAQ.html">FAQ</a> |
          <a href="/DesktopSitemap">Site Map</a>
        </p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // State variables for the input fields
  const displayName = ref('');
  const email = ref('');
  const contactNumber = ref('');
  const school = ref('');
  const address = ref('');
  
  // Function for logout
  const handleLogout = () => {
    console.log('Logging out...');
    //  Add your logout logic here (e.g., clearing authentication tokens, etc.)
    router.push('/index'); // Redirect to the home page after logout
  };
  
  </script>
  
  <style scoped>
  .page-title 
  {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  margin-left: 18%;
  }

  .account-page 
  {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
  .header 
  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f0;
    width: 100%;
    box-sizing: border-box;
  }
  
  .logo-placeholder 
  {
    width: 100px;
    height: 50px;
    background-color: #3b82f6;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .logo 
  {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
  
  .nav-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    margin-left: 20px;
  }
  
  .nav-link {
    color: #333;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .nav-link:hover {
    color: #007bff;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .page-title {
    font-size: 2rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: left;
  }
  
  .main-container {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .left-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 30%;
  }
  
  .avatar-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #e0e0e0;
    border: 2px dashed #ccc;
  }
  
  .edit-avatar-button {
    padding: 12px 20px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    text-align: center;
  }
  
  .edit-avatar-button:hover {
    background-color: #0056b3;
  }
  
  .change-password-button {
    padding: 12px 20px;
    background-color: #e0e0e0;
    color: #333;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    text-align: center;
  }
  
  .change-password-button:hover {
    background-color: #ccc;
  }
  
  .logout-button {
    padding: 12px 20px;
    background-color: #dc3545;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    text-align: center;
  }
  
  .logout-button:hover {
    background-color: #c82333;
  }
  
  .right-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-size: 1rem;
    color: #333;
  }
  
  .form-group input {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1.2rem;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #007bff;
  }
  
  .footer {
    margin-top: auto;
    background-color: #f9f9f9;
    padding: 25px;
    text-align: center;
    font-size: 0.9rem;
    color: #555;
    width: 100%;
    box-sizing: border-box;
  }
  
  .footer-links {
    display: inline-block;
  }
  
  .footer-links a {
    color: #007bff;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      text-align: center;
    }
  
    .nav-list {
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }
  
    .nav-item {
      margin-left: 0;
      margin-top: 10px;
    }
  
    .main-container {
      flex-direction: column;
      gap: 30px;
    }
  
    .left-section {
      width: 100%;
      align-items: center;
    }
  
    .right-section {
      width: 100%;
    }
  
    .footer {
      padding: 20px;
    }
  }
  </style>
  
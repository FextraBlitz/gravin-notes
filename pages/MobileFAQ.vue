<template>
    <div class="mobile-faq-page">
      <h1 class="faq-title">Frequently Asked Questions</h1>
      <div class="question-list">
        <div class="question-item">
          <h2 class="question-number">1.</h2>
          <div class="question-content">
            <h3 class="question">What does this site do?</h3>
            <p class="answer">It summarizes PDFs using AI.</p>
          </div>
        </div>
        <div class="question-item">
          <h2 class="question-number">2.</h2>
          <div class="question-content">
            <h3 class="question">Is my file safe?</h3>
            <p class="answer">Yes, files are private and deleted after use if you have no account.</p>
          </div>
        </div>
        <div class="question-item">
          <h2 class="question-number">3.</h2>
          <div class="question-content">
            <h3 class="question">Do I need an account?</h3>
            <p class="answer">No, but signing up gives more features.</p>
          </div>
        </div>
        <div class="question-item">
          <h2 class="question-number">4.</h2>
          <div class="question-content">
            <h3 class="question">Can I download the summary?</h3>
            <p class="answer">Yes, as text or PDF.</p>
          </div>
        </div>
        <div class="question-item">
          <h2 class="question-number">5.</h2>
          <div class="question-content">
            <h3 class="question">Are there limits?</h3>
            <p class="answer">Free accounts have size/page limits. Pro gets more.</p>
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
    router.push('/MobileOptions');
  };
  </script>
  
  <style scoped>
  .mobile-faq-page 
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .faq-title 
  {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .question-list 
  {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .question-item 
  {
    display: flex;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 10px;
  }
  
  .question-number 
  {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000000;
    margin-right: 10px;
    min-width: 30px; /* Add min-width to create space for number */
    text-align: left; /* Ensure number is aligned left */
  }
  
  .question-content 
  {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1; /* Allows the content to take up remaining space */
  }
  
  .question 
  {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0;
  }
  
  .answer 
  {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
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
  
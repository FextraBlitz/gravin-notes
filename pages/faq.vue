<template>
  <section class="faq-page">
    <h1 class="faq-title">Frequently Asked Questions</h1>
    <div class="question-list">
      <article v-for="(item, index) in faqItems" :key="index" class="question-item">
        <h2 class="question-number">{{ index + 1 }}.</h2>
        <div class="question-content">
          <h3 class="question">{{ item.question }}</h3>
          <p class="answer">{{ item.answer }}</p>
        </div>
      </article>
    </div>
    
  </section>
</template>

<script setup>
import { useRouter, useRoute } from '#app';
import { inject } from 'vue';

// Inject store for navigation tracking
const store = inject('store');
const router = useRouter();
const route = useRoute();

// FAQ data
const faqItems = [
  {
    question: 'What does this site do?',
    answer: 'It’s a simple notes app with an AI-powered summarizer and online saves for account holders.',
  },
  {
    question: 'Is my file safe?',
    answer: 'Yes, files are private and deleted after use if you don’t have an account.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No, but signing up unlocks additional features.',
  },
  {
    question: 'Can I read a file?',
    answer: 'Yes, as text or PDF.',
  },
  {
    question: 'Are there limits?',
    answer: 'Free accounts have no limits. Pro accounts get AI summarizer privileges and online saves.',
  },
];

// Icon paths
const homeIcon = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/home.svg';
const homeIconActive = '/assets/icons/home-purple.svg'; // Add a purple version in your assets
const aiIcon = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cpu.svg';
const aiIconActive = '/assets/icons/cpu-purple.svg';
const notesIcon = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/file-text.svg';
const notesIconActive = '/assets/icons/file-text-purple.svg';
const moreIcon = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/more-horizontal.svg';

// Navigation functions
const goToHome = () => {
  store.setLastVisitedPage(route.path);
  router.push('/');
};
const goToAI = () => {
  store.setLastVisitedPage(route.path);
  router.push('/ai-summarizer');
};
const goToNotes = () => {
  store.setLastVisitedPage(route.path);
  router.push('/editor');
};
const goToMore = () => {
  store.setLastVisitedPage(route.path);
  router.push('/options'); // Adjust to your actual route
};
</script>

<style scoped>
/* Material Design & Dracula Alucard Light Theme */
.faq-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: 'Inter', 'Roboto', system-ui, sans-serif;
}

.faq-title {
  font-size: 28px;
  font-weight: 600;
  color: #333333;
  letter-spacing: 0.5px;
  line-height: 1.3;
  margin-bottom: 32px;
  text-align: center;
}

.question-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-item {
  display: flex;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 12px;
  transition: transform 200ms ease, background-color 200ms ease;
}

.question-item:hover {
  transform: scale(1.02);
  background-color: #f8f0fe;
}

.question-number {
  font-size: 18px;
  font-weight: 600;
  color: #bd93f9;
  min-width: 30px;
  text-align: left;
}

.question-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.question {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
  letter-spacing: 0.5px;
  line-height: 1.3;
  margin: 0;
}

.answer {
  font-size: 16px;
  color: #666666;
  line-height: 1.5;
  margin: 0;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666666;
  font-size: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: color 200ms ease;
}

.nav-item.active {
  color: #bd93f9;
}

.nav-item:hover {
  color: #9580ff;
}

.nav-item:focus-visible {
  outline: 2px solid #9580ff;
  outline-offset: 2px;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(189, 147, 249, 0.3); /* #bd93f9 at 30% opacity */
  border-radius: 8px;
  transform: scale(0);
  opacity: 0;
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}

.nav-item:active::before {
  transform: scale(1);
  opacity: 1;
  transition: transform 150ms ease-out, opacity 150ms ease-out;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

@media (min-width: 768px) {
  .faq-page {
    padding: 32px;
  }

  .question-list {
    max-width: 800px;
  }

  .bottom-nav {
    position: static;
    max-width: 800px;
    margin: 32px auto 0;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
```vue
<script setup>
import { ref, computed, onMounted, onUnmounted, watch, provide } from 'vue';
import { useRoute, useRouter } from '#app';
import NavBar from './components/NavBar.vue';
import MobileBottomNav from './components/MobileBottomNav.vue';

// Router setup
const route = useRoute();
const router = useRouter();

// Mobile detection logic
const isMobile = ref(false);
if (typeof window === 'undefined') {
  isMobile.value = false; // Default to desktop during SSR
}

function updateDeviceType() {
  isMobile.value = window.innerWidth <= 768;
}

// User state
const user = ref(null);
const isAuthenticated = ref(false);
const isLoading = ref(true);

// Navigation state
const lastVisitedPage = ref('/');

// Computed properties
const isLoggedIn = computed(() => isAuthenticated.value && !!user.value);
const userName = computed(() => user.value?.username || '');
const userEmail = computed(() => user.value?.email || '');

// Store actions
const storeActions = {
  setLastVisitedPage(path) {
    if (!['/login', '/signup'].includes(path)) {
      lastVisitedPage.value = path;
    }
  },

  async authenticateUser({ email, password, rememberMe }) {
    try {
      const response = await fetch("https://ccs8finalproj-production.up.railway.app/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: email, // 'email' param is actually username
          password
        })
      });

      const data = await response.json();
      if ('access' in data) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        user.value = {
          username: data.user.username,
          email: data.user.email,
          contact: data.user.contact || '',
          address: data.user.address || '',
          school: data.user.school || ''
        };
        isAuthenticated.value = true;
        if (rememberMe) {
          console.log('Storing credentials for rememberMe');
        }
        return lastVisitedPage.value || '/';
      }
      throw new Error(data.message || 'Authentication failed');
    } catch (err) {
      throw new Error(err.message || 'Authentication failed');
    }
  },

  async registerUser({ name, email, password }) {
    try {
      const response = await fetch("https://ccs8finalproj-production.up.railway.app/accounts/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: name,
          email,
          password
        })
      });

      const data = await response.json();
      if ('user' in data) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        user.value = {
          username: data.user.username,
          email: data.user.email,
          contact: data.user.contact || '',
          address: data.user.address || '',
          school: data.user.school || ''
        };
        isAuthenticated.value = true;
        return lastVisitedPage.value || '/';
      }
      throw new Error(data.message || 'Registration failed');
    } catch (err) {
      throw new Error(err.message || 'Registration failed');
    }
  },

  async fetchCurrentUser() {
    isLoading.value = true;
    try {
      const access = localStorage.getItem('access');
      const userData = localStorage.getItem('user');
      if (access && userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.username && parsedUser.email) {
          if (!user.value) {
            user.value = {
              username: parsedUser.username,
              email: parsedUser.email,
              contact: parsedUser.contact || '',
              address: parsedUser.address || '',
              school: parsedUser.school || ''
            };
          }
          isAuthenticated.value = true;
        } else {
          throw new Error('Invalid user data');
        }
      } else {
        throw new Error('No auth data found');
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      user.value = null;
      isAuthenticated.value = false;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
    } finally {
      isLoading.value = false;
    }
  },

  async updateUser(userData) {
    try {
      const access = localStorage.getItem('access');
      if (!access) throw new Error('No authentication token found');
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        user.value = {
          username: data.user.username,
          email: data.user.email,
          contact: data.user.contact || '',
          address: data.user.address || '',
          school: data.user.school || ''
        };
        return data.user;
      }
      throw new Error(data.message || 'Failed to update profile');
    } catch (err) {
      console.error('Error updating user:', err);
      throw new Error(err.message || 'Failed to update profile');
    }
  },

  logout() {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    router.push('/');
  }
};

// Handle navigation after authentication success
const handleAuthSuccess = (redirectPath) => {
  console.log(`Authentication successful, redirecting to: ${redirectPath}`);
  router.push(redirectPath);
};

// Initialize user state and mobile detection on mount
onMounted(() => {
  console.log('App mounted');
  updateDeviceType();
  window.addEventListener('resize', updateDeviceType);
  
  storeActions.fetchCurrentUser().then(() => {
    console.log('User fetch completed');
    if (!lastVisitedPage.value && !['/login', '/signup'].includes(route.fullPath)) {
      storeActions.setLastVisitedPage(route.fullPath);
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceType);
});

// Watch for route changes
watch(
  () => route.fullPath,
  (newPath) => {
    if (!['/login', '/signup'].includes(newPath)) {
      storeActions.setLastVisitedPage(newPath);
    }
  }
);

// Provide dependencies
provide('isMobile', isMobile);
provide('store', {
  user,
  isAuthenticated,
  isLoading,
  lastVisitedPage,
  isLoggedIn,
  userName,
  userEmail,
  ...storeActions,
});
defineExpose({ handleAuthSuccess });
</script>

<template>
  <UApp class="color-black app-container">
    <NavBar v-if="!route.meta.hideDefaultNavbar" />
    <main>
      <NuxtPage />
    </main>
    <MobileBottomNav v-if="!route.meta.hideDefaultNavbar && isMobile" />
  </UApp>
</template>

<style>
html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  background-color: white;
  color: #1f2937;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

a.router-link-active::after {
  background-color: transparent;
}
</style>
```
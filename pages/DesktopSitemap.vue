<template>
  <div class="site-map-page">
    <main class="main-content">
      <h1 class="site-map-title">GRAVIN Notes Site Map</h1>
      <div class="content-container">
        <div class="site-map-links">
          <div class="site-map-section">
            <h2 class="site-map-section-title">About Us</h2>
            <ul class="site-map-links-list">
              <li><a href="/DesktopAboutUs.html">Group Profile</a></li>
              <li><a href="/DesktopAboutUs.html">About GRAVIN Notes</a></li>
            </ul>
          </div>
          <div class="site-map-section">
            <h2 class="site-map-section-title">Notes</h2>
            <ul class="site-map-links-list">
              <li><NuxtLink to="/your-notes">Your Notes</NuxtLink></li>
            </ul>
          </div>
          <div class="site-map-section">
            <h2 class="site-map-section-title">AI Summarizer</h2>
            <ul class="site-map-links-list">
              <li><NuxtLink to="/upload-pdf">Upload a PDF</NuxtLink></li>
              <li><NuxtLink to="/notebooks">Notebooks</NuxtLink></li>
            </ul>
          </div>
          <div class="site-map-section">
            <h2 class="site-map-section-title">Account</h2>
            <ul class="site-map-links-list">
              <li><NuxtLink to="/DesktopAccount">Manage Your Account</NuxtLink></li>
              <li><NuxtLink to="/DesktopSignup">Create an Account</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="image-placeholder">
          <img src="/assets/icons/globe.png" alt="Site Map Image" class="image">
        </div>
      </div>
    </main>
    <footer class="footer">
      <p class="footer-links">
        <a href="DesktopAboutUs.html">About Us</a> |
        <a href="DesktopFAQ.html">FAQ</a> |
        <NuxtLink to="/DesktopSitemap">Site Map</NuxtLink>
      </p>
    </footer>
  </div>
</template>

<script setup>
// No additional logic is required for this static page
</script>

<style scoped>
.site-map-page 
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

.nav-list 
{
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item 
{
  margin-left: 20px;
}

.nav-link 
{
  color: #333;
  text-decoration: none;
  font-size: 1rem;
}

.nav-link:hover 
{
  color: #007bff;
}

.main-content 
{
  flex: 1;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.site-map-title 
{
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.content-container 
{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.site-map-links 
{
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
}

.site-map-section 
{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.site-map-section-title 
{
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
}

.site-map-links-list 
{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.site-map-links-list li a {
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
}

.site-map-links-list li a:hover 
{
  text-decoration: underline;
}

.image-placeholder 
{
  width: 600px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden; /* Ensures the image does not overflow the container */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 100%; /* Default: Makes the image fill the placeholder width */
  height: 100%; /* Default: Makes the image fill the placeholder height */
  object-fit: cover; /* Ensures the image covers the container without distortion */
  margin-right: 100px;
}

.footer 
{
  margin-top: auto;
  background-color: #f9f9f9;
  padding: 25px;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  width: 100%;
  box-sizing: border-box;
}

.footer-links 
{
  display: inline-block;
}

.footer-links a 
{
  color: #000000;
  text-decoration: none;
  margin: 0 10px;
}

.footer-links a:hover 
{
  text-decoration: underline;
}

@media (max-width: 768px) 
{
  .header 
  {
    flex-direction: column;
    text-align: center;
  }

  .nav-list 
  {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .nav-item 
  {
    margin-left: 0;
    margin-top: 10px;
  }

  .content-container 
  {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .site-map-links 
  {
    width: 100%;
  }

  .image-placeholder 
  {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .footer 
  {
    padding: 20px;
  }
}
</style>

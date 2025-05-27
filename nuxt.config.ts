// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  pages: true,
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  // hooks: {
  //   'pages:extend'(pages) {
  //     console.log(pages);
  //   },
  // },
  runtimeConfig: {
    public: {
      // Other public vars...
      xaiApiKey: process.env.XAI_API_KEY || ''
    }
  },
});


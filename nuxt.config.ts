// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 9999,
  },

  modules: [
    '@unocss/nuxt',
  ],
  devtools: {
    enabled: true,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
})

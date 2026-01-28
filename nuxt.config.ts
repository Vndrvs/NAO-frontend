import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  eslint: {
        config: {
            stylistic: {
                semi: true,
                quotes: "double",
                commaDangle: "always-multiline",
                indent: "tab",
            },
        },
    },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    'nuxt-headlessui',
    '@pinia/nuxt',
  ],
  headlessui: {
    prefix: 'H'
  },
  colorMode: {
    classSuffix: ''
  },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
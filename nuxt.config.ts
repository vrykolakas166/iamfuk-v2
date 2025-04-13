import Noir from "./themes/default";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@vueuse/motion/nuxt",
    "@primevue/nuxt-module",
  ],
  runtimeConfig: {
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    config: {
      darkMode: "class",
    },
  },
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: ".dark",
        },
      },
      ripple: true,
    },
  },
  icon: {
    provider: "iconify",
    serverBundle: {
      collections: ["eva", "mdi"],
    },
  },
  app: {
    head: {
      title: "iamfuk",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Thrive at the intersection of analyzing source, finding solution, and building desktop application and website. My passion lies in clean code, best suitable solution and developing maintainable, scalable application.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/iamfuk.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
});

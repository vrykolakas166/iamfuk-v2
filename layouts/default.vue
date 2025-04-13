<template>
  <div class="min-h-screen flex flex-col transition-colors duration-500">
    <!-- Animated Background -->
    <div class="fixed inset-0 z-0">
      <div class="floating-dots"></div>
    </div>

    <!-- Header with Glass Effect -->
    <header
      class="sticky md:mx-auto md:w-[80vw] md:top-3 md:rounded-lg z-50 backdrop-blur-md"
      :class="{
        'shadow-md dark:bg-zinc-900/50 dark:shadow-zinc-800/30': !mobileMenuOpen,
      }"
    >
      <div class="max-w-7xl md:max-w-[80vw] mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Animated Logo -->
          <NuxtLink
            to="/"
            class="text-2xl font-bold bg-clip-text transition-all duration-300 cursor-pointer font-heading tracking-tight flex gap-0 hover:gap-2"
          >
            <span>i</span>
            <span>am</span>
            <span>fuk</span>
          </NuxtLink>

          <!-- Hamburger Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg transition-colors duration-300 hover:scale-105"
          >
            <div class="w-6 h-5 flex flex-col justify-between">
              <span
                class="w-full h-0.5 bg-zinc-950 dark:bg-zinc-50 transition-all duration-300"
                :class="{
                  'rotate-45 translate-y-[9px] hover:translate-x-0':
                    mobileMenuOpen,
                }"
              ></span>
              <span
                class="w-full h-0.5 bg-zinc-950 dark:bg-zinc-50 transition-all duration-300"
                :class="{ 'opacity-0': mobileMenuOpen }"
              ></span>
              <span
                class="w-full h-0.5 bg-zinc-950 dark:bg-zinc-50 transition-all duration-300"
                :class="{
                  '-rotate-45 -translate-y-[9px]': mobileMenuOpen,
                }"
              ></span>
            </div>
          </button>

          <!-- Navigation -->
          <nav
            :class="{
              'hidden': !mobileMenuOpen,
              'bg-white dark:bg-neutral-800': mobileMenuOpen
            }"
            class="fixed top-[68px] md:shadow-none shadow-lg md:static inset-x-0 p-4 md:p-0 backdrop-blur-md md:backdrop-blur-none md:block"
          >
            <ul
              class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8"
            >
              <li
                v-for="(item, index) in ['Projects', 'Games', 'About', 'Access']"
                :key="index"
              >
                <NuxtLink
                  :to="`/${item.toLowerCase()}`"
                  class="nav-link relative block dark:hover:text-amber-400 hover:text-amber-500 transition-colors duration-300"
                  @click="mobileMenuOpen = false"
                >
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content with Page Transitions -->
    <main
      class="flex-grow md:mx-auto top-10 max-w-7xl md:w-[80vw] relative z-10"
    >
      <slot></slot>
    </main>

    <footer
      class="relative mt-20 md:mx-auto md:w-[80vw] md:bottom-3 md:rounded-lg md:shadow-md dark:bg-zinc-900/50 dark:shadow-zinc-800/30 z-10 py-6"
    >
      <div class="max-w-7xl md:max-w-[80vw] mx-auto px-4">
        <div class="flex flex-row items-center justify-between">
          <!-- Theme Toggle -->
          <p class="animate-pulse-subtle text-xs">
            &copy; 2025 iamfuk. All rights reserved.
          </p>
          <div class="flex items-center space-x-4">
            <!-- social link -->
            <NuxtLink
              to="https://www.instagram.com/vrykolakas16/"
              target="_blank"
              class="cursor-pointer relative flex justify-center items-center p-2 hover:scale-125 transition-all duration-300"
            >
              <Icon
                name="mdi:instagram"
                class="theme-icon absolute inset-0 transition-transform duration-500 transform flex justify-center items-center text-xl"
              ></Icon>
            </NuxtLink>
            <NuxtLink
              to="https://www.linkedin.com/in/iamfuk/"
              target="_blank"
              class="cursor-pointer relative flex justify-center items-center p-2 hover:scale-125 transition-all duration-300"
            >
              <Icon
                name="mdi:linkedin"
                class="theme-icon absolute inset-0 transition-transform duration-500 transform flex justify-center items-center text-xl"
              ></Icon>
            </NuxtLink>
            <NuxtLink
              to="https://www.github.com/vrykolakas166/"
              target="_blank"
              class="cursor-pointer relative flex justify-center items-center p-2 hover:scale-125 transition-all duration-300"
            >
              <Icon
                name="mdi:github"
                class="theme-icon absolute inset-0 transition-transform duration-500 transform flex justify-center items-center text-xl"
              ></Icon>
            </NuxtLink>
            <!-- theme toggle -->
            <button
              @click="toggleDarkMode()"
              class="relative flex justify-center items-center p-2 hover:scale-125 transition-colors duration-300"
            >
              <!-- Moon Icon -->
              <Icon
                name="eva:moon-fill"
                class="theme-icon absolute inset-0 transition-transform duration-500 transform flex justify-center items-center text-xl text-white"
                :class="
                  mode === 'dark' ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                "
              ></Icon>

              <!-- Sun Icon -->
              <Icon
                name="eva:sun-fill"
                class="theme-icon absolute inset-0 transition-transform duration-500 transform flex justify-center items-center text-xl"
                :class="
                  mode === 'light'
                    ? 'rotate-0 scale-100'
                    : '-rotate-180 scale-0'
                "
              ></Icon>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const mobileMenuOpen = ref(false);
const mode = ref("light");

function applyTheme(theme) {
  // Tailwind's dark mode
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Persist to localStorage
  localStorage.setItem("theme", theme);
  mode.value = theme;
}

function toggleDarkMode() {
  const newTheme = mode.value === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);
});

// Close mobile menu when window is resized to desktop view
if (process.client) {
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobileMenuOpen.value = false;
    }
  });
}
</script>

<style scoped>
/* Add these utility classes */
.font-heading {
  font-family: var(--font-heading);
}

.font-body {
  font-family: var(--font-body);
}

.font-accent {
  font-family: var(--font-accent);
}

/* Navigation Link Animations */
.nav-link::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--p-amber-200), var(--p-amber-500));
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right;
}

.nav-link:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

/* Mobile menu animation */
nav {
  transition: all 0.3s ease-in-out;
}

@media (max-width: 767px) {
  .nav-link::before {
    display: none;
  }
} /* Mobile menu animation */
nav {
  transition: all 0.3s ease-in-out;
}

/* Floating Dots Animation */
.floating-dots {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vmax; /* Large enough to cover viewport */
  height: 100vmax;
  transform: translate(-50%, -50%); /* Center precisely */
  inset: 0;
  background-image: radial-gradient(
    circle at center,
    #3b82f620 1px,
    transparent 1px
  );
  background-size: 3rem 3rem;
  animation: floatingDotsAnimation 60s linear infinite alternate;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

@keyframes floatingDotsAnimation {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(-50vw) rotate(360deg);
  }
}

/* Subtle Pulse Animation */
@keyframes subtle-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-subtle {
  animation: subtle-pulse 3s ease-in-out infinite;
}

/* Page Transition */
::v-deep(.page-enter-active),
::v-deep(.page-leave-active) {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

::v-deep(.page-enter-from),
::v-deep(.page-leave-to) {
  opacity: 0;
  transform: translateY(20px);
}

/* Theme transition */
.theme-icon {
  transform-origin: center;
}
</style>

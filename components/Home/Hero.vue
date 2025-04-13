<template>
  <Motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-[80vh] flex items-center justify-center">
        <div class="text-center">
          <Motion
            tag="h1"
            :initial="{ y: 20, opacity: 0 }"
            :enter="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8 }"
            class="text-6xl md:text-8xl font-bold mb-6 select-none"
          >
            <JobTitle />
          </Motion>

          <Motion
            tag="p"
            :initial="{ y: 20, opacity: 0 }"
            :enter="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
            class="text-lg mb-8 select-none"
          >
            Crafting elegant digital experiences
          </Motion>

          <Motion
            class="relative"
            :initial="{ y: 20, opacity: 0 }"
            :enter="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
          >
            <div class="relative inline-block mt-4">
              <HomeTypingCat class="mt-6"/>
            </div>
          </Motion>
        </div>
      </div>
    </div>
  </Motion>
</template>

<script setup>
import JobTitle from "./JobTitle.vue";
</script>

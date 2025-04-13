<template>
  <Motion
    tag="div"
    :initial="{ y: 20, opacity: 0 }"
    :enter="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.5, delay: index * 0.1 }"
    class="card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
  >
    <img
      src="https://th.bing.com/th/id/OIP.B8BaeERx9jBaFTVcaxb5TAHaEo?rs=1&pid=ImgDetMain"
      :alt="project.title"
      class="w-full h-48 object-cover"
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">
        {{ project.title }}
      </h3>
      <p class="text-gray-400 mb-4">{{ project.description }}</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in project.techtags.split(',')"
          :key="tech.trim()"
          class="px-3 py-1 bg-zinc-800 rounded-full text-sm text-gray-300"
        >
          {{ tech.trim() }}
        </span>
      </div>
    </div>
  </Motion>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style>
.card {
  @apply bg-neutral-300/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/80 dark:border-white/5 transition-colors duration-300;
}
</style>

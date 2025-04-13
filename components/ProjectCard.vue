<template>
  <Motion
    tag="div"
    :initial="{ y: 20, opacity: 0 }"
    :enter="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.5, delay: index * 0.1 }"
    class="hover:scale-105 transition-transform duration-300"
  >
    <Card>
      <template #header>
        <img
          src="https://th.bing.com/th/id/OIP.B8BaeERx9jBaFTVcaxb5TAHaEo?rs=1&pid=ImgDetMain"
          :alt="project.title"
          class="w-full h-48 object-cover"
        />
      </template>
      <template #title>
        <h3 class="text-xl font-semibold mb-2">
          {{ project.title }}
        </h3>
      </template>
      <template #content>
        <p class="text-gray-400 mb-4">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2">
          <Chip v-for="tech in project.techtags" :key="tech.name.trim()">
            <div v-html="tech.icon"></div>
            <span class="text-sm font-medium">{{ tech.name.trim() }}</span>
          </Chip>
        </div>
      </template>
    </Card>
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

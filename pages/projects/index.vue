<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Motion
        tag="h2"
        :initial="{ y: 20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.5 }"
        class="text-4xl font-bold mb-12 text-center"
      >
        Featured projects
      </Motion>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id || index"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = ref([
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    image: "/images/project1.jpg",
    techtags: "Vue, Nuxt, Tailwind CSS",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    image: "/images/project2.jpg",
    techtags: "React, Next.js, CSS",
  },
  // Add more projects as needed
]);
</script>

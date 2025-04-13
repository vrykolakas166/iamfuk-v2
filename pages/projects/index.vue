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
    techtags: [
      { icon: "html5", name: "HTML5" },
      { icon: "css3", name: "CSS3" },
      { icon: "javascript", name: "JavaScript" },
      { icon: "vuejs", name: "Vue.js" },
      { icon: "nuxt", name: "Nuxt.js" },
      { icon: "tailwindcss", name: "Tailwind CSS" },
      { icon: "github", name: "GitHub" },
      { icon: "git", name: "Git" },
      { icon: "npm", name: "NPM" },
      { icon: "vite", name: "Vite" },
    ],
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    image: "/images/project2.jpg",
    techtags: [
      { icon: "webpack", name: "Webpack" },
      { icon: "typescript", name: "TypeScript" },
      { icon: "python", name: "Python" },
      { icon: "flask", name: "Flask" },
      { icon: "django", name: "Django" },
      { icon: "mongodb", name: "MongoDB" },
      { icon: "mysql", name: "MySQL" },
      { icon: "postgresql", name: "PostgreSQL" },
      { icon: "sqlite", name: "SQLite" },
      { icon: "firebase", name: "Firebase" },
      { icon: "aws", name: "AWS" },
      { icon: "azure", name: "Azure" },
      { icon: "docker", name: "Docker" },
      { icon: "kubernetes", name: "Kubernetes" },
      { icon: "nginx", name: "Nginx" },
      { icon: "apache", name: "Apache" },
      { icon: "linux", name: "Linux" },
    ],
  },
  // Add more projects as needed
]);
</script>

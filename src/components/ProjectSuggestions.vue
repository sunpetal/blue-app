<script setup>
import { ref } from "vue";

// Mock data for AI-suggested projects
const projectSuggestions = ref([
  {
    id: 1,
    name: "Green Energy Initiative",
    description: "Collaborate on sustainable energy solutions for the future.",
    category: "Environment",
    link: "/projects/green-energy",
  },
  {
    id: 2,
    name: "AI-Powered Healthcare",
    description:
      "Explore AI applications to improve patient care and diagnostics.",
    category: "Technology",
    link: "/projects/ai-healthcare",
  },
  {
    id: 3,
    name: "Community Art Collaboration",
    description: "Join a creative project focused on empowering local artists.",
    category: "Arts",
    link: "/projects/community-art",
  },
]);
</script>

<template>
  <div>
    <!-- Title -->
    <h2 class="mb-2 text-xl font-semibold text-launch-black">
      Project Suggestions
    </h2>
    <p class="mb-4 text-sm text-dark-gray">
      Based on your interests, here are some projects you might want to explore.
    </p>

    <!-- Suggested Projects List -->
    <div class="space-y-4">
      <div
        v-for="project in projectSuggestions"
        :key="project.id"
        class="p-4 transition rounded-lg shadow bg-almost-white hover:shadow-lg"
      >
        <!-- Project Details -->
        <h3 class="text-lg font-medium text-launch-black">
          {{ project.name }}
        </h3>
        <p class="text-sm text-dark-gray">{{ project.description }}</p>
        <p class="mt-1 text-xs text-medium-gray">
          <strong>Category:</strong> {{ project.category }}
        </p>

        <!-- Link to Project -->
        <a
          :href="project.link"
          class="inline-block mt-2 text-sm text-launch-blue hover:underline"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</template>

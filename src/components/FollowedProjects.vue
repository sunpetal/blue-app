<script setup>
import { ref } from "vue";
import SlideInPanel from "./SlideInPanel.vue";

// Mock project data
const followedProjects = ref([
  {
    id: 1,
    name: "Project Alpha",
    status: "In Progress",
    description: "A detailed description of Project Alpha.",
  },
  {
    id: 2,
    name: "Project Beta",
    status: "Pending Approval",
    description: "A detailed description of Project Beta.",
  },
  {
    id: 3,
    name: "Project Gamma",
    status: "Completed",
    description: "A detailed description of Project Gamma.",
  },
]);

// State for selected project and slide-in panel visibility
const selectedProject = ref(null);
const isPanelVisible = ref(false);

// Open the slide-in panel with the selected project
const openPanel = (project) => {
  selectedProject.value = project;
  isPanelVisible.value = true;
};

// Close the slide-in panel
const closePanel = () => {
  selectedProject.value = null;
  isPanelVisible.value = false;
};
</script>

<template>
  <div class="relative">
    <!-- Title and Subtitle -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-launch-black">Followed Projects</h1>
      <p class="text-sm text-dark-gray">
        Here you can view the latest status of the projects you follow and drill
        down into their details without leaving this page.
      </p>
    </div>

    <!-- Project Tiles -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in followedProjects"
        :key="project.id"
        class="p-4 rounded-lg shadow cursor-pointer bg-almost-white hover:shadow-lg"
        @click="openPanel(project)"
      >
        <h3 class="text-lg font-semibold text-launch-black">
          {{ project.name }}
        </h3>
        <p class="text-sm text-dark-gray">Status: {{ project.status }}</p>
      </div>
    </div>

    <!-- Opaque Background Overlay -->
    <div
      v-if="isPanelVisible"
      class="fixed inset-0 z-40 bg-black bg-opacity-50"
      @click="closePanel"
    ></div>

    <!-- Slide-In Panel -->
    <SlideInPanel
      :project="selectedProject"
      :is-visible="isPanelVisible"
      @close="closePanel"
    />
  </div>
</template>

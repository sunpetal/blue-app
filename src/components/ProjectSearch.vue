<script setup>
import { ref } from "vue";

// State for search query and results
const searchQuery = ref("");
const searchResults = ref([]);
const isLoading = ref(false);

// Mock function to simulate AI-assisted search
const searchProjects = async () => {
  if (!searchQuery.value.trim()) return; // Do nothing for empty queries

  isLoading.value = true;

  // Simulating a delay for AI-assisted search
  setTimeout(() => {
    searchResults.value = [
      {
        id: 1,
        name: "AI-Driven Smart Cities",
        description:
          "Explore AI applications for sustainable urban development.",
        category: "Technology",
        link: "/projects/ai-smart-cities",
      },
      {
        id: 2,
        name: "Renewable Energy Solutions",
        description:
          "Innovate in the field of solar, wind, and hydropower technologies.",
        category: "Environment",
        link: "/projects/renewable-energy",
      },
    ];
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
  <div>
    <!-- Title -->
    <h2 class="mb-2 text-xl font-semibold text-launch-black">Project Search</h2>
    <p class="mb-4 text-sm text-dark-gray">
      Search for new project ideas powered by AI. Enter a keyword to begin.
    </p>

    <!-- Search Input -->
    <div class="flex items-center mb-6 space-x-2">
      <input
        v-model="searchQuery"
        @keyup.enter="searchProjects"
        class="flex-grow p-3 text-sm bg-white border rounded-lg shadow-sm text-launch-black focus:ring-launch-blue focus:border-launch-blue"
        type="text"
        placeholder="Enter a keyword, e.g., 'AI', 'Sustainability', 'Health'"
      />
      <button
        @click="searchProjects"
        class="px-4 py-2 text-white rounded-lg bg-launch-blue hover:bg-dark-blue focus:ring focus:ring-launch-blue"
      >
        Search
      </button>
    </div>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-sm text-center text-medium-gray">
      Searching for projects...
    </div>

    <!-- Search Results -->
    <div v-if="!isLoading && searchResults.length > 0" class="space-y-4">
      <div
        v-for="result in searchResults"
        :key="result.id"
        class="p-4 transition rounded-lg shadow bg-almost-white hover:shadow-lg"
      >
        <!-- Result Details -->
        <h3 class="text-lg font-medium text-launch-black">{{ result.name }}</h3>
        <p class="text-sm text-dark-gray">{{ result.description }}</p>
        <p class="mt-1 text-xs text-medium-gray">
          <strong>Category:</strong> {{ result.category }}
        </p>

        <!-- Link to Project -->
        <a
          :href="result.link"
          class="inline-block mt-2 text-sm text-launch-blue hover:underline"
        >
          Learn More
        </a>
      </div>
    </div>

    <!-- No Results Found -->
    <div
      v-if="!isLoading && searchResults.length === 0 && searchQuery.trim()"
      class="text-center text-medium-gray"
    >
      No results found for "{{ searchQuery }}".
    </div>
  </div>
</template>

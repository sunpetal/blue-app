<script setup>
import { computed } from "vue";
import data from "../assets/data.json";

const props = defineProps({
  sortOption: {
    type: String,
    default: "Most Popular",
  },
  filters: {
    type: Array,
    default: () => [],
  },
});

const products = data.products;

// Computed property to sort and filter products
const displayedProducts = computed(() => {
  let filtered = products;

  // Apply filters
  if (props.filters.length > 0) {
    const filterValues = props.filters.map((f) => f.value);
    filtered = filtered.filter((product) => {
      return (
        filterValues.includes(product.category) ||
        filterValues.includes(product.status)
      );
    });
  }

  // Apply sorting
  switch (props.sortOption) {
    case "Newest":
      filtered = filtered
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "Oldest":
      filtered = filtered
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "Status":
      filtered = filtered
        .slice()
        .sort((a, b) => a.status.localeCompare(b.status));
      break;
    // Add more sorting cases if needed
    default:
      // Default sorting (e.g., by name)
      filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return filtered;
});
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold text-launch-black">Projects</h2>
    <p class="mt-2 text-sm text-dark-gray">
      Explore our project portfolio with detailed descriptions and statuses.
    </p>

    <!-- Project Cards Grid -->
    <div
      class="grid grid-cols-1 mt-6 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="relative flex flex-col p-4 bg-white border rounded-lg shadow-md group hover:shadow-lg border-light-gray"
      >
        <div
          class="overflow-hidden rounded-lg bg-light-gray aspect-w-4 aspect-h-3"
        >
          <img
            :src="product.imageSrc"
            :alt="product.imageAlt"
            class="object-cover object-center"
          />
          <div
            class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-opacity-50 opacity-0 bg-launch-black group-hover:opacity-100"
          >
            <button
              class="px-4 py-2 font-medium bg-white bg-opacity-75 rounded text-launch-black"
            >
              View Project
            </button>
          </div>
        </div>
        <div class="flex-1 mt-4">
          <h3 class="text-lg font-semibold text-launch-black">
            {{ product.name }}
          </h3>
          <p class="mt-1 text-sm text-dark-gray">{{ product.description }}</p>
        </div>
        <div class="flex justify-between mt-4 text-sm text-medium-gray">
          <span>{{ product.category }}</span>
          <span>{{ product.status }}</span>
        </div>
      </div>
    </div>

    <!-- No Projects Found -->
    <div
      v-if="displayedProducts.length === 0"
      class="mt-6 text-center text-medium-gray"
    >
      No projects match the selected filters.
    </div>
  </div>
</template>

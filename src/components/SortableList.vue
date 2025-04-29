<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";

// Import data from data.json
import data from "../assets/data.json";

const sortOptions = data.sortOptions;
const filters = [
  { label: "Vue3", value: "Vue3" },
  { label: "React", value: "React" },
  { label: "Vite", value: "Vite" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Completed", value: "Completed" },
];

// Reactive variables
const selectedSortOption = ref(
  sortOptions.find((option) => option.current).name,
);
const activeFilters = ref([]);

// Emit events to parent component
const emit = defineEmits(["update:sortOption", "update:filters"]);

// Handle sort option change
function selectSortOption(option) {
  selectedSortOption.value = option.name;
  emit("update:sortOption", selectedSortOption.value);
}

// Handle filter toggling
function toggleFilter(filter) {
  const index = activeFilters.value.findIndex((f) => f.value === filter.value);
  if (index >= 0) {
    activeFilters.value.splice(index, 1);
  } else {
    activeFilters.value.push(filter);
  }
  emit("update:filters", activeFilters.value);
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow">
    <div>
      <!-- Sortable List Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-launch-black">
          Sort & Filter Projects
        </h1>
      </div>
      <p class="mt-2 text-sm text-dark-gray">
        Organize and filter projects by framework, status, or category.
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
      <!-- Sort Menu -->
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex items-center text-sm font-medium text-dark-gray group hover:text-launch-black"
          >
            Sort: {{ selectedSortOption }}
            <ChevronDownIcon
              class="w-5 h-5 ml-2 text-medium-gray group-hover:text-dark-gray"
            />
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 z-10 w-40 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem
                v-for="option in sortOptions"
                :key="option.name"
                v-slot="{ active }"
              >
                <button
                  @click="selectSortOption(option)"
                  :class="[
                    option.name === selectedSortOption
                      ? 'font-medium text-launch-black'
                      : 'text-dark-gray',
                    active ? 'bg-light-gray' : '',
                    'block px-4 py-2 text-sm w-full text-left',
                  ]"
                >
                  {{ option.name }}
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm font-medium text-dark-gray">Filters:</span>
        <div
          v-for="filter in filters"
          :key="filter.value"
          class="inline-flex items-center px-3 py-1.5 rounded-full cursor-pointer"
          :class="[
            activeFilters.some((f) => f.value === filter.value)
              ? 'bg-launch-blue text-white'
              : 'bg-light-gray text-dark-gray',
          ]"
          @click="toggleFilter(filter)"
        >
          {{ filter.label }}
        </div>
      </div>
    </div>
  </div>
</template>

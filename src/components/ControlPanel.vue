<script setup>
import { ref } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";

// Import the composable
import { useWidgets } from "../composables/useWidgets";

const { widgets } = useWidgets(); // Use the shared widgets state

// Manage panel collapse/expand state
const isExpanded = ref(false); // Collapsed by default
const togglePanel = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div
    class="fixed bottom-6 right-6"
    :class="isExpanded ? 'w-64' : 'w-10'"
    style="z-index: 50"
  >
    <!-- Control Panel Header -->
    <div
      class="flex items-center justify-end p-2 rounded-full shadow-lg cursor-pointer bg-light-gray"
      :class="isExpanded ? 'rounded-lg' : 'rounded-full'"
      @click="togglePanel"
    >
      <div
        v-if="isExpanded"
        class="mr-auto text-sm font-medium text-launch-black"
      >
        Control Panel
      </div>
      <ChevronDownIcon
        v-if="!isExpanded"
        class="w-6 h-6 transition-transform duration-300 text-dark-gray"
      />
      <ChevronUpIcon
        v-else
        class="w-6 h-6 transition-transform duration-300 text-dark-gray"
      />
    </div>

    <!-- Control Panel Content -->
    <div
      v-show="isExpanded"
      class="p-4 mt-2 bg-white rounded-lg shadow-lg"
      :style="{
        opacity: isExpanded ? 1 : 0,
        transform: isExpanded ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }"
    >
      <ul class="space-y-2">
        <li
          v-for="widget in widgets"
          :key="widget.id"
          class="flex items-center justify-between"
        >
          <label
            :for="`widget-${widget.id}`"
            class="text-sm font-medium cursor-pointer text-dark-gray"
          >
            {{ widget.name }}
          </label>
          <input
            :id="`widget-${widget.id}`"
            type="checkbox"
            v-model="widget.visible"
            class="w-4 h-4 rounded cursor-pointer text-launch-blue border-medium-gray focus:ring-launch-blue"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

// Reactive style for panel visibility
const panelStyle = ref("translate-x-full");

// Watch the `isVisible` prop and update the panel style
watch(
  () => props.isVisible,
  (newVal) => {
    panelStyle.value = newVal ? "translate-x-0" : "translate-x-full";
  },
);

// Close the panel
const closePanel = () => {
  emit("close");
};
</script>

<template>
  <div
    class="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-md transition-transform duration-300 ease-in-out bg-white border-l-4 border-launch-blue shadow-lg"
    :class="panelStyle"
    style="margin-top: 4rem; height: calc(100vh - 4rem)"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-light-gray border-b">
      <h2 class="text-lg font-semibold text-launch-black">
        {{ project?.name || "Project Details" }}
      </h2>
      <button
        class="text-dark-gray hover:text-launch-black focus:outline-none"
        @click="closePanel"
      >
        <span class="sr-only">Close panel</span>
        &times;
      </button>
    </div>

    <!-- Project Details -->
    <div class="flex-grow p-4 overflow-y-auto">
      <p class="text-sm text-medium-gray">
        <strong>Status:</strong> {{ project?.status || "N/A" }}
      </p>
      <p class="mt-2 text-dark-gray">
        {{ project?.description || "No description available." }}
      </p>
    </div>
  </div>
</template>

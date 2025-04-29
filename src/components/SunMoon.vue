<script setup lang="ts">
import { useTheme } from "../services/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme" class="p-2">
    <template v-if="theme === 'dark'">
      <!-- When in dark mode, show the sun icon to indicate switching to light mode -->
      <SunIcon class="w-6 h-6" />
    </template>
    <template v-else>
      <!-- When in light mode, show the moon icon to indicate switching to dark mode -->
      <MoonIcon class="w-6 h-6" />
    </template>
  </button>
</template>

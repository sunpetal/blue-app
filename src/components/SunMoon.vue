<script setup lang="ts">
import { useTheme } from "../services/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme" class="p-2 cursor-pointer">
    <MoonIcon v-if="theme === 'dark'" class="w-6 h-6" />
    <SunIcon v-else class="w-6 h-6" />
  </button>
</template>

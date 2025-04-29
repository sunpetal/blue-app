<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <component :is="Component" class="router-content" />
  </router-view>
</template>

<style>
.router-content {
  margin-top: 4rem; /* Height of navbar */
  height: calc(100vh - 4rem);
  overflow-y: auto;
}
</style>

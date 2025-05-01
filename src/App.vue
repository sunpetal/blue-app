<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <NavBar />
    <main class="flex-1 mt-16">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          class="h-[calc(100vh-4rem)] overflow-y-auto"
        />
      </router-view>
    </main>
    <Footer />
  </div>
</template>

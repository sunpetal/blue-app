<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
</script>

<template>
  <div
    class="flex flex-col items-center min-w-screen min-h-screen justify-center"
  >
    <div class="flex space-x-8 border items-center justify-center">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <div class="space-x-8 border text-center justify-center">
      <HelloWorld msg="Vite + Vue" />
    </div>
  </div>
</template>

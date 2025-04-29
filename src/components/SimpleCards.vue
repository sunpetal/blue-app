<script setup>
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import data from "../assets/data.json";

// Access projects data
const projects = data.projects;

// Map bgColor to valid TailwindCSS classes
const mapBgColor = (color) => {
  const colorMap = {
    "bg-pink-600": "bg-dark-pink",
    "bg-purple-600": "bg-dark-purple",
    "bg-yellow-500": "bg-dark-yellow",
    "bg-green-500": "bg-launch-blue",
  };
  return colorMap[color] || "bg-light-gray";
};
</script>

<template>
  <div class="mb-12">
    <h2 class="mb-4 text-lg font-semibold text-launch-black">
      Project Overview
    </h2>
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li
        v-for="project in projects"
        :key="project.name"
        class="flex col-span-1 bg-white border rounded-lg shadow-md border-light-gray"
      >
        <div
          :class="[
            'flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white rounded-l-lg',
            mapBgColor(project.bgColor),
          ]"
        >
          {{ project.initials }}
        </div>
        <div
          class="flex items-center justify-between flex-1 rounded-r-lg bg-almost-white"
        >
          <div class="px-4 py-2">
            <a
              :href="project.href"
              class="block font-medium text-launch-black hover:text-launch-blue"
            >
              {{ project.name }}
            </a>
            <p class="text-sm text-dark-gray">{{ project.members }} Members</p>
          </div>
          <div class="pr-4">
            <button
              type="button"
              class="inline-flex items-center justify-center w-8 h-8 text-medium-gray hover:text-dark-gray focus:outline-none focus:ring-2 focus:ring-launch-blue focus:ring-offset-2"
            >
              <EllipsisVerticalIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

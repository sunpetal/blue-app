<script setup>
import { ref, computed } from "vue";
import { ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";

// Import the data from data.json
import data from "../assets/data.json"; // Adjust the path if necessary

// Extract the contributions data
const discussions = ref(data.contributions);

// Reactive variable for search query
const searchQuery = ref("");

// Computed property to filter discussions based on search query
const filteredDiscussions = computed(() =>
  discussions.value.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);
</script>

<template>
  <div>
    <!-- Title -->
    <h1 class="mb-4 text-2xl font-bold text-launch-black">Contributions</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search contributions..."
        class="w-full p-3 text-sm border rounded-md shadow-sm bg-almost-white text-launch-black placeholder-medium-gray border-light-gray focus:ring-launch-blue focus:border-launch-blue"
      />
    </div>

    <!-- Discussion List -->
    <ul role="list" class="divide-y divide-light-gray">
      <li
        v-for="discussion in filteredDiscussions"
        :key="discussion.id"
        class="flex flex-wrap items-center justify-between py-5 gap-x-6 gap-y-4 sm:flex-nowrap"
      >
        <!-- Discussion Details -->
        <div>
          <p class="text-sm font-semibold text-launch-black">
            <a :href="discussion.href" class="hover:underline">
              {{ discussion.title }}
            </a>
          </p>
          <div class="flex items-center mt-1 text-xs text-medium-gray gap-x-2">
            <p>
              <a :href="discussion.author.href" class="hover:underline">
                {{ discussion.author.name }}
              </a>
            </p>
            <svg viewBox="0 0 2 2" class="w-0.5 h-0.5 fill-current">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p>
              <time :datetime="discussion.dateTime">{{ discussion.date }}</time>
            </p>
          </div>
        </div>

        <!-- Commenters and Status -->
        <dl
          class="flex flex-col items-start flex-none w-full gap-x-8 gap-y-4 sm:w-auto sm:flex-row sm:items-center"
        >
          <div class="flex -space-x-1">
            <dt class="sr-only">Commenters</dt>
            <dd v-for="commenter in discussion.commenters" :key="commenter.id">
              <img
                class="w-6 h-6 rounded-full bg-light-gray ring-2 ring-white"
                :src="commenter.imageUrl"
                :alt="commenter.name"
              />
            </dd>
          </div>
          <div class="flex items-center gap-x-2">
            <dt>
              <span class="sr-only">Total comments</span>
              <CheckCircleIcon
                v-if="discussion.status === 'resolved'"
                class="w-5 h-5 text-medium-gray"
                aria-hidden="true"
              />
              <ChatBubbleLeftIcon
                v-else
                class="w-5 h-5 text-medium-gray"
                aria-hidden="true"
              />
            </dt>
            <dd class="text-sm text-dark-gray">
              {{ discussion.totalComments }}
            </dd>
          </div>
        </dl>
      </li>
    </ul>

    <!-- No Results Found -->
    <div
      v-if="filteredDiscussions.length === 0 && searchQuery.trim()"
      class="mt-6 text-center text-medium-gray"
    >
      No contributions found for "{{ searchQuery }}".
    </div>
  </div>
</template>

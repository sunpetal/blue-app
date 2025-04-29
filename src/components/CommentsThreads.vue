<script setup>
import { ref } from "vue";

// Mock data for comments and threads
const commentsThreads = ref([
  {
    id: 1,
    author: "John Doe",
    content: "We need to finalize the wireframes before the deadline.",
    timestamp: "2024-11-20 10:30 AM",
    threadLink: "/threads/wireframes",
  },
  {
    id: 2,
    author: "Jane Smith",
    content:
      "Can someone clarify the requirements for the authentication flow?",
    timestamp: "2024-11-19 02:15 PM",
    threadLink: "/threads/authentication-flow",
  },
  {
    id: 3,
    author: "Alice Johnson",
    content: "The Q4 performance report draft is ready for review.",
    timestamp: "2024-11-18 09:00 AM",
    threadLink: "/threads/performance-report",
  },
]);
</script>

<template>
  <div>
    <!-- Title -->
    <h2 class="mb-2 text-xl font-semibold text-launch-black">
      Comments and Threads
    </h2>
    <p class="mb-4 text-sm text-dark-gray">
      Review recent comments and open threads for easy collaboration. Click on a
      thread to join the discussion.
    </p>

    <!-- Comments List -->
    <div class="space-y-4">
      <div
        v-for="comment in commentsThreads"
        :key="comment.id"
        class="p-4 transition rounded-lg shadow bg-almost-white hover:shadow-lg"
      >
        <!-- Comment Details -->
        <p class="text-sm text-medium-gray">
          <strong class="text-launch-black">{{ comment.author }}</strong>
          commented:
        </p>
        <p class="text-dark-gray">{{ comment.content }}</p>
        <p class="mt-1 text-xs text-medium-gray">{{ comment.timestamp }}</p>

        <!-- Link to Thread -->
        <a
          :href="comment.threadLink"
          class="inline-block mt-2 text-sm text-launch-blue hover:underline"
        >
          View Thread
        </a>
      </div>
    </div>
  </div>
</template>

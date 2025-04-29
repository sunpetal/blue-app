<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  getBoardCards,
  getBoardLists,
  getBoardMembers,
  type TrelloCard,
  type TrelloList,
  type TrelloMember,
} from "../services/trello";

// State
const authenticated = ref(false);
const loading = ref(false);
const cards = ref<TrelloCard[]>([]);
const lists = ref<TrelloList[]>([]);
const allMembers = ref<TrelloMember[]>([]);
const searchBadges = ref<string[]>([]);
const currentSearchInput = ref("");
const selectedStatuses = ref<string[]>([]);
const selectedLabels = ref<string[]>([]);
const selectedMembers = ref<string[]>([]);
const boardId = ref("rW0gJRuy");
const token = ref("");
const lastUpdated = ref<string>("");
const showStatusDropdown = ref(false);
const showLabelDropdown = ref(false);
const showMemberDropdown = ref(false);

// Colors for labels
const labelColors: Record<string, string> = {
  green: "#61bd4f",
  yellow: "#f2d600",
  orange: "#ff9f1a",
  red: "#eb5a46",
  purple: "#c377e0",
  blue: "#0079bf",
  sky: "#00c2e0",
  lime: "#51e898",
  pink: "#ff78cb",
  black: "#344563",
};

// Computed properties
const uniqueLabels = computed(() => {
  const labels = new Set<string>();
  cards.value.forEach((card) => {
    card.labels.forEach((label) => {
      labels.add(label.name || label.color);
    });
  });
  return Array.from(labels);
});

const uniqueMembers = computed(() => {
  return allMembers.value;
});

const filteredCards = computed(() => {
  return cards.value.filter((card) => {
    const matchesSearch =
      searchBadges.value.length === 0 ||
      searchBadges.value.some(
        (term) =>
          card.name.toLowerCase().includes(term.toLowerCase()) ||
          card.desc?.toLowerCase().includes(term.toLowerCase()),
      );

    const matchesStatus =
      selectedStatuses.value.length === 0 ||
      selectedStatuses.value.includes(card.idList);

    const matchesLabel =
      selectedLabels.value.length === 0 ||
      card.labels.some((label) =>
        selectedLabels.value.includes(label.name || label.color),
      );

    const matchesMember =
      selectedMembers.value.length === 0 ||
      (card.idMembers &&
        card.idMembers.some((id) => selectedMembers.value.includes(id))) ||
      (card.members &&
        card.members.some((member) =>
          selectedMembers.value.includes(member.id),
        ));

    return matchesSearch && matchesStatus && matchesLabel && matchesMember;
  });
});

const getListName = (listId: string) => {
  return lists.value.find((list) => list.id === listId)?.name || "Unknown";
};

// Search methods
const addSearchBadge = () => {
  if (
    currentSearchInput.value.trim() &&
    !searchBadges.value.includes(currentSearchInput.value.trim())
  ) {
    searchBadges.value.push(currentSearchInput.value.trim());
    currentSearchInput.value = "";
  }
};

const removeSearchBadge = (badge: string) => {
  searchBadges.value = searchBadges.value.filter((b) => b !== badge);
};

// Filter management
const toggleStatusFilter = (listId: string) => {
  const index = selectedStatuses.value.indexOf(listId);
  if (index === -1) {
    selectedStatuses.value.push(listId);
  } else {
    selectedStatuses.value.splice(index, 1);
  }
};

const toggleLabelFilter = (label: string) => {
  const index = selectedLabels.value.indexOf(label);
  if (index === -1) {
    selectedLabels.value.push(label);
  } else {
    selectedLabels.value.splice(index, 1);
  }
};

const toggleMemberFilter = (memberId: string) => {
  const index = selectedMembers.value.indexOf(memberId);
  if (index === -1) {
    selectedMembers.value.push(memberId);
  } else {
    selectedMembers.value.splice(index, 1);
  }
};

const removeStatusFilter = (listId: string) => {
  selectedStatuses.value = selectedStatuses.value.filter((id) => id !== listId);
};

const removeLabelFilter = (label: string) => {
  selectedLabels.value = selectedLabels.value.filter((l) => l !== label);
};

const removeMemberFilter = (memberId: string) => {
  selectedMembers.value = selectedMembers.value.filter((id) => id !== memberId);
};

const clearAllFilters = () => {
  searchBadges.value = [];
  currentSearchInput.value = "";
  selectedStatuses.value = [];
  selectedLabels.value = [];
  selectedMembers.value = [];
};

// Data loading
const loadBoardData = async () => {
  try {
    loading.value = true;
    const [listsResponse, cardsResponse, membersResponse] = await Promise.all([
      getBoardLists(boardId.value, token.value),
      getBoardCards(boardId.value, token.value),
      getBoardMembers(boardId.value, token.value),
    ]);
    lists.value = listsResponse;
    cards.value = cardsResponse;
    allMembers.value = membersResponse;
    lastUpdated.value = new Date().toLocaleString();
  } catch (error) {
    console.error("Error loading board data:", error);
    alert("Failed to load board data");
  } finally {
    loading.value = false;
  }
};

const refreshData = async () => {
  await loadBoardData();
};

const authenticateWithTrello = () => {
  const userToken = prompt("Enter your Trello token:");
  if (userToken) {
    token.value = userToken;
    authenticated.value = true;
    localStorage.setItem("trello_token", userToken);
    loadBoardData();
  }
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".status-dropdown")) {
    showStatusDropdown.value = false;
  }
  if (!target.closest(".label-dropdown")) {
    showLabelDropdown.value = false;
  }
  if (!target.closest(".member-dropdown")) {
    showMemberDropdown.value = false;
  }
};

// Check for existing token on mount
onMounted(() => {
  const storedToken = localStorage.getItem("trello_token");
  if (storedToken) {
    token.value = storedToken;
    authenticated.value = true;
    loadBoardData();
  }
  document.addEventListener("click", handleClickOutside);
});

// Cleanup
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="mx-auto p-4 font-sans">
    <h1 class="mb-4 text-2xl font-bold text-gray-800">Trello Cards</h1>

    <!-- Authentication -->
    <div v-if="!authenticated" class="rounded-lg bg-gray-50 p-8 text-center">
      <button
        @click="authenticateWithTrello"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
      >
        Connect to Trello
      </button>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Refresh and Search -->
      <div
        class="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-end"
      >
        <!-- Refresh Button -->
        <div class="flex items-center gap-2">
          <button
            @click="refreshData"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          <span v-if="lastUpdated" class="text-sm text-gray-500">
            Last updated: {{ lastUpdated }}
          </span>
        </div>

        <!-- Search Input -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Search Cards</label
          >
          <div class="relative">
            <input
              v-model="currentSearchInput"
              @keyup.enter="addSearchBadge"
              placeholder="Type and press Enter to add filter..."
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              v-if="currentSearchInput"
              @click="addSearchBadge"
              class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Unified Filters Bar -->
      <div
        v-if="
          searchBadges.length ||
          selectedStatuses.length ||
          selectedLabels.length ||
          selectedMembers.length
        "
        class="mb-6 bg-gray-50 p-4 rounded-lg"
      >
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-sm font-medium text-gray-700">Filters:</span>

          <!-- Search Badges -->
          <div
            v-for="(badge, index) in searchBadges"
            :key="`search-${index}`"
            class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
          >
            <span>Search: "{{ badge }}"</span>
            <button
              @click="removeSearchBadge(badge)"
              class="ml-1 text-blue-600 hover:text-blue-800"
            >
              &times;
            </button>
          </div>

          <!-- Status Filters -->
          <div
            v-for="statusId in selectedStatuses"
            :key="`status-${statusId}`"
            class="flex items-center bg-white rounded-full px-3 py-1 text-sm shadow-xs border"
          >
            <span>Status: {{ getListName(statusId) }}</span>
            <button
              @click="removeStatusFilter(statusId)"
              class="ml-1 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <!-- Label Filters -->
          <div
            v-for="label in selectedLabels"
            :key="`label-${label}`"
            class="flex items-center bg-white rounded-full px-3 py-1 text-sm shadow-xs border"
            :style="{ borderLeftColor: labelColors[label] || '#ddd' }"
          >
            <span>Label: {{ label }}</span>
            <button
              @click="removeLabelFilter(label)"
              class="ml-1 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <!-- Member Filters -->
          <div
            v-for="memberId in selectedMembers"
            :key="`member-${memberId}`"
            class="flex items-center bg-white rounded-full px-3 py-1 text-sm shadow-xs border"
          >
            <div class="flex items-center gap-1">
              <div
                v-if="allMembers.find((m) => m.id === memberId)?.avatarUrl"
                class="w-4 h-4 rounded-full overflow-hidden"
              >
                <img
                  :src="
                    allMembers.find((m) => m.id === memberId)?.avatarUrl +
                    '/30.png'
                  "
                  :alt="allMembers.find((m) => m.id === memberId)?.fullName"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600"
              >
                {{
                  allMembers.find((m) => m.id === memberId)?.initials ||
                  (
                    allMembers.find((m) => m.id === memberId)?.fullName || ""
                  ).substring(0, 2)
                }}
              </div>
              <span
                >Member:
                {{
                  allMembers.find((m) => m.id === memberId)?.fullName ||
                  "Unknown"
                }}</span
              >
            </div>
            <button
              @click="removeMemberFilter(memberId)"
              class="ml-1 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <!-- Clear All Button -->
          <button
            @click="clearAllFilters"
            class="ml-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Filter Dropdowns -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Status Dropdown -->
        <div class="status-dropdown relative">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Filter by Status</label
          >
          <button
            @click.stop="showStatusDropdown = !showStatusDropdown"
            class="w-full p-2 border border-gray-300 rounded-md text-left flex justify-between items-center"
          >
            <span>{{
              selectedStatuses.length
                ? `${selectedStatuses.length} selected`
                : "Select statuses..."
            }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            v-if="showStatusDropdown"
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <div
              v-for="list in lists"
              :key="list.id"
              @click.stop="toggleStatusFilter(list.id)"
              class="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              :class="{ 'bg-blue-50': selectedStatuses.includes(list.id) }"
            >
              <div class="flex items-center">
                <span class="block truncate">{{ list.name }}</span>
                <span
                  v-if="selectedStatuses.includes(list.id)"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Label Dropdown -->
        <div class="label-dropdown relative">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Filter by Label</label
          >
          <button
            @click.stop="showLabelDropdown = !showLabelDropdown"
            class="w-full p-2 border border-gray-300 rounded-md text-left flex justify-between items-center"
          >
            <span>{{
              selectedLabels.length
                ? `${selectedLabels.length} selected`
                : "Select labels..."
            }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            v-if="showLabelDropdown"
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <div
              v-for="label in uniqueLabels"
              :key="label"
              @click.stop="toggleLabelFilter(label)"
              class="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              :class="{ 'bg-blue-50': selectedLabels.includes(label) }"
            >
              <div class="flex items-center">
                <span class="block truncate">{{ label }}</span>
                <span
                  v-if="selectedLabels.includes(label)"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Member Dropdown -->
        <div class="member-dropdown relative">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Filter by Member</label
          >
          <button
            @click.stop="showMemberDropdown = !showMemberDropdown"
            class="w-full p-2 border border-gray-300 rounded-md text-left flex justify-between items-center"
          >
            <span>{{
              selectedMembers.length
                ? `${selectedMembers.length} selected`
                : "Select members..."
            }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            v-if="showMemberDropdown"
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <div
              v-for="member in uniqueMembers"
              :key="member.id"
              @click.stop="toggleMemberFilter(member.id)"
              class="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              :class="{ 'bg-blue-50': selectedMembers.includes(member.id) }"
            >
              <div class="flex items-center gap-2">
                <div
                  v-if="member.avatarUrl"
                  class="w-6 h-6 rounded-full overflow-hidden"
                >
                  <img
                    :src="member.avatarUrl + '/30.png'"
                    :alt="member.fullName"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600"
                >
                  {{
                    member.initials || (member.fullName || "").substring(0, 2)
                  }}
                </div>
                <span class="block truncate">{{ member.fullName }}</span>
                <span
                  v-if="selectedMembers.includes(member.id)"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center p-8">
        <div
          class="inline-block w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-2"
        ></div>
        <p class="text-gray-600">Loading cards...</p>
      </div>

      <!-- Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="card in filteredCards"
          :key="card.id"
          class="bg-white rounded-lg shadow-sm p-4 border-l-4 hover:shadow-md transition-all duration-200"
          :style="{
            borderLeftColor: card.labels[0]
              ? labelColors[card.labels[0].color] || '#ddd'
              : '#ddd',
          }"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-medium text-gray-800">{{ card.name }}</h3>
              <p
                v-if="card.desc"
                class="text-gray-600 text-sm mt-1 line-clamp-3"
              >
                {{ card.desc }}
              </p>
            </div>
            <a
              :href="card.url"
              target="_blank"
              class="text-blue-600 hover:underline text-sm whitespace-nowrap"
              title="Open in Trello"
            >
              ↗
            </a>
          </div>

          <!-- Labels -->
          <div v-if="card.labels.length" class="mt-2 flex flex-wrap gap-1">
            <span
              v-for="label in card.labels"
              :key="label.id"
              class="text-xs px-2 py-1 rounded-full"
              :style="{
                backgroundColor: `${labelColors[label.color]}20`,
                color: labelColors[label.color],
                border: `1px solid ${labelColors[label.color]}`,
              }"
              :title="label.name || label.color"
            >
              {{ label.name || label.color }}
            </span>
          </div>

          <!-- Members -->
          <div
            v-if="card.members && card.members.length"
            class="mt-3 flex flex-wrap gap-2 items-center"
          >
            <div
              v-for="member in card.members"
              :key="member.id"
              class="flex items-center"
              :title="member.fullName"
            >
              <div
                v-if="member.avatarUrl"
                class="w-6 h-6 rounded-full overflow-hidden"
              >
                <img
                  :src="member.avatarUrl + '/30.png'"
                  :alt="member.fullName"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600"
              >
                {{ member.initials || (member.fullName || "").substring(0, 2) }}
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="mt-3">
            <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {{ getListName(card.idList) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && filteredCards.length === 0"
        class="text-center text-gray-500 py-8 bg-gray-50 rounded-lg"
      >
        <p v-if="cards.length === 0">No cards found in this board.</p>
        <p v-else>No cards match your filters.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>

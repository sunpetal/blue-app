<script setup>
import { ref, computed } from "vue";
import {
  format,
  parseISO,
  startOfMonth,
  addMonths,
  subMonths,
  isSameDay,
  isAfter,
} from "date-fns";
import MonthCalendar from "./MonthCalendar.vue";
import AddEventModal from "./AddEventModal.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

// Import events from data.json
import data from "../assets/data.json";
const events = data.events;

const today = new Date();
const currentMonth = ref(startOfMonth(today));
const nextMonth = ref(addMonths(currentMonth.value, 1));
const selectedDate = ref(format(today, "yyyy-MM-dd"));
const isModalOpen = ref(false);
const selectedEvent = ref(null);
const usedColors = new Set();

// Theme colors
const colors = [
  "#0072BC", // launch-blue from your theme
  "#22C55E", // green-500
  "#EAB308", // yellow-500
  "#DB2777", // pink-600
  "#9333EA", // purple-600
];

// Function to assign colors to events
function assignUniqueColor() {
  for (const color of colors) {
    if (!usedColors.has(color)) {
      usedColors.add(color);
      return color;
    }
  }
  // Reset used colors if all colors are taken
  usedColors.clear();
  return assignUniqueColor();
}

// Initialize meetings with colors and initials
events.forEach((event) => {
  event.initial = event.name.charAt(0).toUpperCase();
  event.bgColor = assignUniqueColor();
});

function goToPreviousMonth() {
  currentMonth.value = subMonths(currentMonth.value, 1);
  nextMonth.value = addMonths(currentMonth.value, 1);
}

function goToNextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1);
  nextMonth.value = addMonths(currentMonth.value, 1);
}

function selectDate(date) {
  selectedDate.value = date;
}

function editEvent(event) {
  selectedEvent.value = event;
  openModal();
}

const formattedSelectedDate = computed(() =>
  format(parseISO(selectedDate.value), "MMMM d, yyyy"),
);

function formatDate(datetime) {
  return format(parseISO(datetime), "MMMM d, yyyy");
}

function formatDateTime(datetime) {
  return format(parseISO(datetime), "h:mm a");
}

const filteredEvents = computed(() => {
  return events.filter((event) =>
    isSameDay(parseISO(event.startDatetime), parseISO(selectedDate.value)),
  );
});

const upcomingEvents = computed(() => {
  const result = events
    .filter((event) => isAfter(parseISO(event.startDatetime), today))
    .sort((a, b) => parseISO(a.startDatetime) - parseISO(b.startDatetime))
    .slice(0, 3);

  return result;
});

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedEvent.value = null;
}

function handleEventSubmit(eventData) {
  console.log("Event Data Submitted:", eventData);
  closeModal();
}
</script>

<template>
  <div class="flex flex-col md:mx-6">
    <div class="flex items-end">
      <p class="text-xl font-semibold text-launch-black sm:text-2xl">
        Stellar Schedule...
      </p>
      <p
        class="mt-2 ml-4 text-4xl font-semibold tracking-tight text-launch-blue sm:text-5xl"
      >
        Event Galaxy
      </p>
    </div>
    <div
      class="flex flex-col px-6 py-6 my-6 bg-white border shadow-md border-light-gray rounded-xl md:flex-row md:divide-x md:divide-light-gray"
    >
      <!-- Calendars Side -->
      <div class="md:w-2/3 md:flex md:pr-8">
        <div class="w-full md:flex">
          <div class="md:flex-1 md:pr-4">
            <div class="relative">
              <div class="flex items-center justify-center">
                <button
                  @click="goToPreviousMonth"
                  type="button"
                  class="flex items-center justify-center p-1.5 text-medium-gray hover:text-dark-gray"
                >
                  <span class="sr-only">Previous months</span>
                  <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                </button>
                <h2
                  class="flex-auto text-sm font-semibold text-center text-launch-black"
                >
                  {{ format(currentMonth, "MMMM yyyy") }}
                </h2>
              </div>
              <MonthCalendar
                :month="currentMonth"
                :selected-date="selectedDate"
                @select-date="selectDate"
                :events="events"
              />
            </div>
          </div>
          <div class="md:flex-1 md:pl-4">
            <div class="relative">
              <div class="flex items-center justify-center">
                <h2
                  class="flex-auto text-sm font-semibold text-center text-launch-black"
                >
                  {{ format(nextMonth, "MMMM yyyy") }}
                </h2>
                <button
                  @click="goToNextMonth"
                  type="button"
                  class="flex items-center justify-center p-1.5 text-medium-gray hover:text-dark-gray"
                >
                  <span class="sr-only">Next months</span>
                  <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <MonthCalendar
                :month="nextMonth"
                :selected-date="selectedDate"
                @select-date="selectDate"
                :events="events"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Events Side -->
      <section class="mt-12 md:w-1/3 md:mt-0 md:pl-8">
        <h2 class="text-base font-semibold text-launch-black">
          Schedule for
          <time :datetime="selectedDate">{{ formattedSelectedDate }}</time>
        </h2>
        <ol class="mt-4 space-y-1 text-sm text-dark-gray">
          <li
            v-for="event in filteredEvents"
            :key="event.id"
            class="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-light-gray hover:bg-light-gray"
          >
            <div
              :style="{ backgroundColor: event.bgColor }"
              class="flex items-center justify-center flex-none w-10 h-10 text-lg font-semibold text-white rounded-full"
            >
              {{ event.initial }}
            </div>
            <div class="flex-auto">
              <p class="font-semibold text-launch-black">{{ event.name }}</p>
              <p class="mt-0.5">
                <time :datetime="event.startDatetime">{{ event.start }}</time>
                -
                <time :datetime="event.endDatetime">{{ event.end }}</time>
              </p>
              <p class="text-sm text-dark-gray">
                {{ formatDate(event.startDatetime) }}
              </p>
            </div>
            <Menu
              as="div"
              class="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
            >
              <MenuButton
                class="-m-2 flex items-center rounded-full p-1.5 text-medium-gray hover:text-dark-gray"
              >
                <EllipsisVerticalIcon class="w-6 h-6" aria-hidden="true" />
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="editEvent(event)"
                        :class="[
                          active
                            ? 'bg-light-gray text-launch-black'
                            : 'text-dark-gray',
                          'block w-full text-left px-4 py-2 text-sm',
                        ]"
                      >
                        Edit
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active
                            ? 'bg-light-gray text-launch-black'
                            : 'text-dark-gray',
                          'block w-full text-left px-4 py-2 text-sm',
                        ]"
                      >
                        Remove
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </li>
          <li v-if="filteredEvents.length === 0" class="text-dark-gray">
            No events for this day.
          </li>
        </ol>

        <h2 class="mt-8 text-base font-semibold text-launch-black">
          Upcoming Events
        </h2>
        <ol class="mt-4 space-y-1 text-sm text-dark-gray">
          <li
            v-for="event in upcomingEvents"
            :key="event.id"
            class="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-light-gray hover:bg-light-gray"
          >
            <div
              :style="{ backgroundColor: event.bgColor }"
              class="flex items-center justify-center flex-none w-10 h-10 text-lg font-semibold text-white rounded-full"
            >
              {{ event.initial }}
            </div>
            <div class="flex-auto">
              <p class="font-semibold text-launch-black">{{ event.name }}</p>
              <p class="mt-0.5">
                <time :datetime="event.startDatetime">{{
                  formatDateTime(event.startDatetime)
                }}</time>
                -
                <time :datetime="event.endDatetime">{{
                  formatDateTime(event.endDatetime)
                }}</time>
              </p>
              <p class="text-sm text-dark-gray">
                {{ formatDate(event.startDatetime) }}
              </p>
            </div>
            <Menu
              as="div"
              class="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
            >
              <MenuButton
                class="-m-2 flex items-center rounded-full p-1.5 text-medium-gray hover:text-dark-gray"
              >
                <EllipsisVerticalIcon class="w-6 h-6" aria-hidden="true" />
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="editEvent(event)"
                        :class="[
                          active
                            ? 'bg-light-gray text-launch-black'
                            : 'text-dark-gray',
                          'block w-full text-left px-4 py-2 text-sm',
                        ]"
                      >
                        Edit
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active
                            ? 'bg-light-gray text-launch-black'
                            : 'text-dark-gray',
                          'block w-full text-left px-4 py-2 text-sm',
                        ]"
                      >
                        Remove
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </li>
          <li v-if="upcomingEvents.length === 0" class="text-dark-gray">
            No upcoming events.
          </li>
        </ol>

        <button
          type="button"
          class="w-full px-3 py-2 mt-8 text-sm font-semibold text-white rounded-md shadow bg-launch-blue hover:bg-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-launch-blue"
          @click="openModal"
        >
          Add event
        </button>

        <AddEventModal
          :isOpen="isModalOpen"
          :eventData="selectedEvent"
          @close="closeModal"
          @submit="handleEventSubmit"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  isSameDay,
} from "date-fns";

// Props
const props = defineProps({
  month: {
    type: Date,
    required: true,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  events: {
    type: Array,
    required: true,
  },
});

// Emits
const emit = defineEmits(["select-date"]);

// Reactive State
const displayedMonth = ref(props.month);

// Watch for prop changes to update displayedMonth
watch(
  () => props.month,
  (newMonth) => {
    displayedMonth.value = newMonth;
  },
);

// Week Days Labels
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

// Computed: Days in Calendar
const calendarDays = computed(() => {
  const start = startOfWeek(displayedMonth.value, { weekStartsOn: 0 });
  const end = endOfWeek(
    new Date(
      displayedMonth.value.getFullYear(),
      displayedMonth.value.getMonth() + 1,
      0,
    ),
    { weekStartsOn: 0 },
  );
  return eachDayOfInterval({ start, end }).map((date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return {
      date: dateString,
      dayNumber: format(date, "d"),
      isCurrentMonth: isSameMonth(date, displayedMonth.value),
      isToday: isToday(date),
      isSelected: props.selectedDate === dateString,
      hasEvent: hasEventOnDate(dateString),
      eventColor: getEventColor(dateString),
    };
  });
});

// Method to Select a Date
function selectDate(date) {
  emit("select-date", date);
}

// Function to Check if a Date Has an Event
function hasEventOnDate(dateString) {
  return props.events.some((event) =>
    isSameDay(parseISO(event.startDatetime), parseISO(dateString)),
  );
}

// Function to Get Event Color for a Date
function getEventColor(dateString) {
  const event = props.events.find((event) =>
    isSameDay(parseISO(event.startDatetime), parseISO(dateString)),
  );
  return event ? event.bgColor : null;
}
</script>

<template>
  <div>
    <!-- Week Days -->
    <div class="grid grid-cols-7 mt-4 text-xs text-center text-dark-gray">
      <div v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>
    <!-- Days -->
    <div class="grid grid-cols-7 mt-2 text-sm">
      <div
        v-for="(day, dayIdx) in calendarDays"
        :key="day.date"
        :class="[
          { 'border-t border-light-gray': dayIdx >= 7 },
          'py-2 relative',
        ]"
      >
        <button
          @click="selectDate(day.date)"
          type="button"
          :class="[
            day.isSelected && 'text-white',
            !day.isSelected && day.isToday && 'text-launch-blue',
            !day.isSelected &&
              !day.isToday &&
              day.isCurrentMonth &&
              'text-launch-black',
            !day.isSelected &&
              !day.isToday &&
              !day.isCurrentMonth &&
              'text-medium-gray',
            day.isSelected && day.isToday && 'bg-launch-blue',
            day.isSelected && !day.isToday && 'bg-dark-gray',
            !day.isSelected && 'hover:bg-light-gray',
            (day.isSelected || day.isToday) && 'font-semibold',
            'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
          ]"
        >
          <time :datetime="day.date">{{ day.dayNumber }}</time>
        </button>
        <!-- Event Indicator with Matching Color -->
        <span
          v-if="day.hasEvent"
          :style="{ backgroundColor: day.eventColor }"
          class="absolute top-0 right-0 w-2 h-2 m-1 rounded-full"
        ></span>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="w-4/5 px-40 m-auto mt-12">
    <div class="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
      <button
        type="button"
        class="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span class="sr-only">Previous month</span>
        <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span class="sr-only">Next month</span>
        <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
      </button>
      <section
        v-for="(month, monthIdx) in months"
        :key="monthIdx"
        :class="[
          monthIdx === months.length - 1 && 'hidden md:block',
          'text-center',
        ]"
      >
        <h2 class="text-sm font-semibold text-gray-900">{{ month.name }}</h2>
        <div class="grid grid-cols-7 mt-6 text-gray-500 text-xs/6">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div
          class="grid grid-cols-7 gap-px mt-2 text-sm bg-gray-200 rounded-lg shadow isolate ring-1 ring-gray-200"
        >
          <button
            v-for="(day, dayIdx) in month.days"
            :key="day.date"
            type="button"
            :class="[
              day.isCurrentMonth
                ? 'bg-white text-gray-900'
                : 'bg-gray-50 text-gray-400',
              dayIdx === 0 && 'rounded-tl-lg',
              dayIdx === 6 && 'rounded-tr-lg',
              dayIdx === month.days.length - 7 && 'rounded-bl-lg',
              dayIdx === month.days.length - 1 && 'rounded-br-lg',
              'relative py-1.5 hover:bg-gray-100 focus:z-10',
            ]"
          >
            <time
              :datetime="day.date"
              :class="[
                day.isToday && 'bg-[#0072BC] font-semibold text-white',
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
              ]"
              >{{ day.date.split("-").pop().replace(/^0/, "") }}</time
            >
          </button>
        </div>
      </section>
    </div>
    <section class="mt-12">
      <h2 class="text-base font-semibold text-gray-900">Upcoming events</h2>
      <ol class="mt-2 text-gray-500 divide-y divide-gray-200 text-sm/6">
        <li class="py-4 sm:flex">
          <time datetime="2022-01-17" class="flex-none w-28">Wed, Sept 18</time>
          <p class="flex-auto mt-2 sm:mt-0">Nothing on today’s schedule</p>
        </li>
        <li class="py-4 sm:flex">
          <time datetime="2022-01-19" class="flex-none w-28">Thu, Oct 03</time>
          <p class="flex-auto mt-2 font-semibold text-gray-900 sm:mt-0">
            Standup VUE3/Vite Application
          </p>
          <p class="flex-none sm:ml-6">
            <time datetime="2022-01-13T14:30">2:30 PM</time> -
            <time datetime="2022-01-13T16:30">4:30 PM</time>
          </p>
        </li>
        <li class="py-4 sm:flex">
          <time datetime="2022-01-20" class="flex-none w-28">Fri, Oct 25</time>
          <p class="flex-auto mt-2 font-semibold text-gray-900 sm:mt-0">
            Meeting to Docker Containers
          </p>
          <p class="flex-none sm:ml-6">All day</p>
        </li>
        <li class="py-4 sm:flex">
          <time datetime="2022-01-18" class="flex-none w-28">Mon, Oct 28</time>
          <p class="flex-auto mt-2 font-semibold text-gray-900 sm:mt-0">
            Work with Devops for Pipeline
          </p>
          <p class="flex-none sm:ml-6">
            <time datetime="2022-01-17T10:00">10:00 AM</time> -
            <time datetime="2022-01-17T10:15">10:15 AM</time>
          </p>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const months = [
  {
    name: "October",
    days: [
      { date: "2023-09-30" },
      { date: "2024-10-01", isCurrentMonth: true },
      { date: "2024-10-02", isCurrentMonth: true },
      { date: "2024-10-03", isCurrentMonth: true },
      { date: "2024-10-04", isCurrentMonth: true },
      { date: "2024-10-05", isCurrentMonth: true },
      { date: "2024-10-06", isCurrentMonth: true },
      { date: "2024-10-07", isCurrentMonth: true },
      { date: "2024-10-08", isCurrentMonth: true },
      { date: "2024-10-09", isCurrentMonth: true },
      { date: "2024-10-10", isCurrentMonth: true },
      { date: "2024-10-11", isCurrentMonth: true },
      { date: "2024-10-12", isCurrentMonth: true },
      { date: "2024-10-13", isCurrentMonth: true },
      { date: "2024-10-14", isCurrentMonth: true },
      { date: "2024-10-15", isCurrentMonth: true },
      { date: "2024-10-16", isCurrentMonth: true },
      { date: "2024-10-17", isCurrentMonth: true },
      { date: "2024-10-18", isCurrentMonth: true },
      { date: "2024-10-19", isCurrentMonth: true },
      { date: "2024-10-20", isCurrentMonth: true },
      { date: "2024-10-21", isCurrentMonth: true },
      { date: "2024-10-22", isCurrentMonth: true },
      { date: "2024-10-23", isCurrentMonth: true },
      { date: "2024-10-24", isCurrentMonth: true },
      { date: "2024-10-25", isCurrentMonth: true },
      { date: "2024-10-26", isCurrentMonth: true },
      { date: "2024-10-27", isCurrentMonth: true },
      { date: "2024-10-28", isCurrentMonth: true },
      { date: "2024-10-29", isCurrentMonth: true, isToday: true },
      { date: "2024-10-30", isCurrentMonth: true },
      { date: "2024-10-31", isCurrentMonth: true },
      { date: "2024-11-01" },
      { date: "2024-11-02" },
      { date: "2024-11-03" },
      { date: "2024-11-04" },
      { date: "2024-11-05" },
      { date: "2024-11-06" },
      { date: "2024-11-07" },
      { date: "2024-11-08" },
      { date: "2024-11-09" },
      { date: "2024-11-10" },
    ],
  },
  {
    name: "November",
    days: [
      { date: "2024-10-28" },
      { date: "2024-10-29" },
      { date: "2024-10-30" },
      { date: "2024-10-31" },
      { date: "2024-11-01", isCurrentMonth: true },
      { date: "2024-11-02", isCurrentMonth: true },
      { date: "2024-11-03", isCurrentMonth: true },
      { date: "2024-11-04", isCurrentMonth: true },
      { date: "2024-11-05", isCurrentMonth: true },
      { date: "2024-11-06", isCurrentMonth: true },
      { date: "2024-11-07", isCurrentMonth: true },
      { date: "2024-11-08", isCurrentMonth: true },
      { date: "2024-11-09", isCurrentMonth: true },
      { date: "2024-11-10", isCurrentMonth: true },
      { date: "2024-11-11", isCurrentMonth: true },
      { date: "2024-11-12", isCurrentMonth: true },
      { date: "2024-11-13", isCurrentMonth: true },
      { date: "2024-11-14", isCurrentMonth: true },
      { date: "2024-11-15", isCurrentMonth: true },
      { date: "2024-11-16", isCurrentMonth: true },
      { date: "2024-11-17", isCurrentMonth: true },
      { date: "2024-11-18", isCurrentMonth: true },
      { date: "2024-11-19", isCurrentMonth: true },
      { date: "2024-11-20", isCurrentMonth: true },
      { date: "2024-11-21", isCurrentMonth: true },
      { date: "2024-11-22", isCurrentMonth: true },
      { date: "2024-11-23", isCurrentMonth: true },
      { date: "2024-11-24", isCurrentMonth: true },
      { date: "2024-11-25", isCurrentMonth: true },
      { date: "2024-11-26", isCurrentMonth: true },
      { date: "2024-11-27", isCurrentMonth: true },
      { date: "2024-11-28", isCurrentMonth: true },
      { date: "2024-03-01" },
      { date: "2024-03-02" },
      { date: "2024-03-03" },
      { date: "2024-03-04" },
      { date: "2024-03-05" },
      { date: "2024-03-06" },
      { date: "2024-03-07" },
      { date: "2024-03-08" },
      { date: "2024-03-09" },
      { date: "2024-03-10" },
    ],
  },
];
</script>

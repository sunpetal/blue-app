<script setup>
import data from "../assets/data.json";

const bentoCards = data.bentoCards;
</script>

<template>
  <div class="pb-6 bg-transparent">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
      <!-- Header Section -->
      <h2 class="text-base font-semibold text-launch-blue">
        No more duplicate effort...
      </h2>
      <p
        class="mt-4 text-4xl font-semibold tracking-tight text-launch-black sm:text-5xl"
      >
        All Our Project Ideas in One Place
      </p>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-3">
        <!-- Bento Cards -->
        <div v-for="(card, index) in bentoCards" :key="index" class="relative">
          <div
            class="absolute bg-white rounded-lg inset-px"
            :class="{
              'lg:rounded-bl-2xl': index === 0,
              'max-lg:rounded-b-2xl lg:rounded-br-2xl':
                index === bentoCards.length - 1,
            }"
          ></div>
          <div
            class="relative flex flex-col h-full overflow-hidden border rounded-lg shadow-md border-light-gray"
            :class="{
              'lg:rounded-bl-2xl': index === 0,
              'max-lg:rounded-b-2xl lg:rounded-br-2xl':
                index === bentoCards.length - 1,
            }"
          >
            <img
              :class="[
                'object-cover h-80 w-full',
                index === 0 ? 'object-left' : 'object-center',
              ]"
              :src="card.imageSrc"
              :alt="card.imageAlt"
            />
            <div class="p-6">
              <h3 class="text-sm font-semibold text-launch-blue">
                {{ card.title }}
              </h3>
              <p
                class="mt-2 text-lg font-medium tracking-tight text-launch-black"
              >
                {{ card.headline }}
              </p>
              <p class="mt-2 text-sm text-dark-gray">
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

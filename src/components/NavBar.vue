<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { PlusIcon } from "@heroicons/vue/20/solid";
import SunMoon from "./SunMoon.vue";
import PalmTree from "../assets/PalmTree.vue";
import me from "../assets/me.jpeg";

const route = useRoute();
const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Trello", path: "/trello" },
  { name: "Planning", path: "/planning" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
  { name: "Client", path: "/client" },
  { name: "Login", path: "/login" },
];
</script>

<template>
  <Disclosure
    as="nav"
    class="fixed top-0 w-full bg-white shadow dark:bg-gray-900 dark:shadow-gray-800 z-50"
    v-slot="{ open }"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <!-- Nav tabs -->
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#50A9E4]"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex shrink-0 items-center">
            <PalmTree class="h-8 w-8 text-[#50A9E4]" />
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.path"
              :class="[
                route.path === item.path
                  ? 'border-[#50A9E4] text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Search bar -->
        <div class="flex-1 items-center justify-center px-2 md:hidden lg:flex">
          <div class="grid w-full max-w-lg grid-cols-1">
            <input
              type="search"
              name="search"
              class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#2E8ECE] dark:bg-gray-800 dark:text-white dark:outline-gray-700 dark:placeholder:text-gray-500 dark:focus:outline-[#6EC0FF] sm:text-sm/6"
              placeholder="Search"
            />
            <MagnifyingGlassIcon
              class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
          </div>
        </div>

        <!-- Profile + actions -->
        <div class="flex items-center">
          <div class="shrink-0 md:hidden lg:flex">
            <router-link
              to="/login"
              class="relative inline-flex items-center gap-x-1.5 rounded-md bg-[#B45309] p-2 text-sm font-semibold text-white shadow-sm hover:bg-[#92400E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#92400E] dark:bg-[#B45309] dark:hover:bg-[#D97706]"
            >
              <PlusIcon class="-ml-0.5 size-5" aria-hidden="true" />
              New Job
            </router-link>
          </div>
          <div class="hidden md:ml-4 md:flex md:shrink-0 md:items-center">
            <div
              class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 dark:bg-gray-900 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50A9E4] focus:ring-offset-2"
            >
              <SunMoon class="size-6" aria-hidden="true" />
            </div>
            <button
              type="button"
              class="relative ml-3 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 dark:bg-gray-900 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50A9E4] focus:ring-offset-2"
            >
              <span class="absolute -inset-1.5" />
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#50A9E4] focus:ring-offset-2 dark:bg-gray-800"
                >
                  <span class="absolute -inset-1.5" />
                  <img
                    :src="me"
                    class="size-8 rounded-full object-cover"
                    alt="Profile photo"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
                >
                  <!-- Menu items remain unchanged -->
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <!--Mobile Panel-->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigationItems"
          :key="item.name"
          as="router-link"
          :to="item.path"
          :class="[
            route.path === item.path
              ? 'border-[#50A9E4] bg-[#E6F3FC] text-[#2E8ECE] dark:bg-gray-800 dark:text-[#6EC0FF]'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6',
          ]"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-4 sm:px-6">
          <div class="shrink-0">
            <div class="shrink-0">
              <img
                :src="me"
                class="size-10 rounded-full object-cover"
                alt="Profile photo"
              />
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800 dark:text-white">
              Tom Cook
            </div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              tom@example.com
            </div>
          </div>
          <button
            type="button"
            class="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 dark:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50A9E4] focus:ring-offset-2"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="size-6" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="router-link"
            to="/profile"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 sm:px-6"
          >
            Your Profile
          </DisclosureButton>
          <DisclosureButton
            as="router-link"
            to="/settings"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 sm:px-6"
          >
            Settings
          </DisclosureButton>
          <DisclosureButton
            as="router-link"
            to="/logout"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 sm:px-6"
          >
            Sign out
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

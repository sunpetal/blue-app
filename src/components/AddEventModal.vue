<script setup>
import { ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: Boolean,
  eventData: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["close", "submit"]);

const formData = ref({
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  allDay: false,
});

watch(
  () => props.eventData,
  (newEventData) => {
    if (newEventData) {
      formData.value = {
        name: newEventData.name,
        date: newEventData.startDatetime.split("T")[0],
        startTime: newEventData.allDay
          ? ""
          : newEventData.startDatetime.split("T")[1],
        endTime: newEventData.allDay
          ? ""
          : newEventData.endDatetime.split("T")[1],
        location: newEventData.location || "",
        allDay: newEventData.allDay || false,
      };
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

function close() {
  emit("close");
  resetForm();
}

function resetForm() {
  formData.value = {
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    allDay: false,
  };
}

function submitForm() {
  emit("submit", formData.value);
  close();
}
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-opacity-75 bg-dark-gray"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <DialogTitle
                as="h3"
                class="text-base font-semibold text-center text-launch-black"
              >
                {{ eventData ? "Edit Event" : "Add New Event" }}
              </DialogTitle>
              <form class="mt-4 space-y-4" @submit.prevent="submitForm">
                <!-- Name Field -->
                <div>
                  <label
                    for="event-name"
                    class="block text-sm font-medium text-dark-gray"
                    >Event Name</label
                  >
                  <input
                    type="text"
                    id="event-name"
                    v-model="formData.name"
                    class="block w-full mt-1 rounded-md shadow-sm border-light-gray focus:border-launch-blue focus:ring-launch-blue sm:text-sm"
                    placeholder="Event Name"
                  />
                </div>

                <!-- Date Field -->
                <div>
                  <label
                    for="event-date"
                    class="block text-sm font-medium text-dark-gray"
                    >Date</label
                  >
                  <input
                    type="date"
                    id="event-date"
                    v-model="formData.date"
                    class="block w-full mt-1 rounded-md shadow-sm border-light-gray focus:border-launch-blue focus:ring-launch-blue sm:text-sm"
                  />
                </div>

                <!-- Time Fields -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="start-time"
                      class="block text-sm font-medium text-dark-gray"
                      >Start Time</label
                    >
                    <input
                      type="time"
                      id="start-time"
                      v-model="formData.startTime"
                      :disabled="formData.allDay"
                      class="block w-full mt-1 rounded-md shadow-sm border-light-gray focus:border-launch-blue focus:ring-launch-blue sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      for="end-time"
                      class="block text-sm font-medium text-dark-gray"
                      >End Time</label
                    >
                    <input
                      type="time"
                      id="end-time"
                      v-model="formData.endTime"
                      :disabled="formData.allDay"
                      class="block w-full mt-1 rounded-md shadow-sm border-light-gray focus:border-launch-blue focus:ring-launch-blue sm:text-sm"
                    />
                  </div>
                </div>

                <!-- All Day Checkbox -->
                <div class="flex items-center">
                  <input
                    id="all-day"
                    type="checkbox"
                    v-model="formData.allDay"
                    class="w-4 h-4 rounded text-launch-blue border-light-gray focus:ring-launch-blue"
                  />
                  <label
                    for="all-day"
                    class="block ml-2 text-sm text-launch-black"
                    >All Day</label
                  >
                </div>

                <!-- Location Field -->
                <div>
                  <label
                    for="location"
                    class="block text-sm font-medium text-dark-gray"
                    >Location</label
                  >
                  <input
                    type="text"
                    id="location"
                    v-model="formData.location"
                    class="block w-full mt-1 rounded-md shadow-sm border-light-gray focus:border-launch-blue focus:ring-launch-blue sm:text-sm"
                    placeholder="Location"
                  />
                </div>

                <!-- Cancel and Submit Buttons -->
                <div class="flex justify-end mt-5 space-x-4 sm:mt-6">
                  <button
                    type="button"
                    class="px-3 py-2 text-sm font-semibold bg-white rounded-md shadow-sm text-launch-black ring-1 ring-inset ring-light-gray hover:bg-light-gray"
                    @click="close"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-launch-blue hover:bg-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-launch-blue"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

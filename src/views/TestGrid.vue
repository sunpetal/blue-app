<script lang="ts" setup>
import BoxOne from "../components/BoxOne.vue";
import BoxTwo from "../components/BoxTwo.vue";
import BoxThree from "../components/BoxThree.vue";
import BoxFour from "../components/BoxFour.vue";
import BoxFive from "../components/BoxFive.vue";
import BoxSix from "../components/BoxSix.vue";
import BoxSeven from "../components/BoxSeven.vue";
import BoxEight from "../components/BoxEight.vue";
</script>

<template>
  <div
    class="p-4 border-black border relative grid gap-[17px] sm:grid-cols-2 xl:grid-cols-[repeat(15,minmax(0,1fr))] mx-auto lg:max-w-7xl"
  >
    <!--CONTAINER ONE-->
    <div class="border-black border-2 p-2 relative xl:col-span-5">
      <BoxOne />
    </div>
    <!--CONTAINER TWO-->
    <div class="border-black border-2 p-2 relative xl:col-span-5">
      <BoxTwo />
    </div>
    <!--CONTAINER THREE-->
    <div
      class="relative border-black border-2 p-2 sm:col-span-2 md:col-span-1 xl:col-span-5"
    >
      <BoxThree />
    </div>
    <!--CONTAINER FOUR-->
    <div
      class="relative border-black border-2 p-2 sm:col-span-2 md:col-span-1 xl:col-span-6"
    >
      <BoxFour />
    </div>
    <!--CONTAINER FIVE-->
    <div class="relative border-black border-2 p-2 sm:col-span-2 xl:col-span-9">
      <BoxFive />
    </div>
    <!--CONTAINER SIX-->
    <div class="relative border-black border-2 p-2 sm:col-span-2 xl:col-span-9">
      <BoxSix />
    </div>
    <!--CONTAINER SEVEN-->
    <div
      class="relative border-black border-2 p-2 sm:col-span-2 md:col-span-1 xl:col-span-6"
    >
      <BoxSeven />
    </div>
    <!--CONTAINER EIGHT-->
    <div
      class="relative border-black border-2 p-2 sm:col-span-2 md:col-span-1 xl:col-span-15"
    >
      <BoxEight />
    </div>
  </div>
</template>

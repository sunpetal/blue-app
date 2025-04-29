<template>
  <div class="h-full bg-white">
    <div class="m-auto h-full p-6 lg:p-8">
      <div class="grid h-full grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
        <!-- First Large Card (Performance) -->
        <div class="flex h-full p-px lg:col-span-4">
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
          >
            <div class="flex-1">
              <img
                class="h-full w-full object-cover object-left"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-performance.png"
                alt="Performance"
              />
            </div>
            <div class="p-10 pt-4">
              <h3 class="text-sm/4 font-semibold text-indigo-600">
                Performance
              </h3>
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950">
                Lightning-fast builds
              </p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                gravida justo et nulla efficitur, maximus egestas sem
                pellentesque.
              </p>
            </div>
          </div>
        </div>

        <!-- First Small Card (Releases) -->
        <div class="flex h-full p-px lg:col-span-2">
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 lg:rounded-tr-[2rem]"
          >
            <div class="flex-1">
              <img
                class="h-full w-full object-cover object-right"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-releases.png"
                alt="Releases"
              />
            </div>
            <div class="p-10 pt-4">
              <h3 class="text-sm/4 font-semibold text-indigo-600">Releases</h3>
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950">
                Push to deploy
              </p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600">
                Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus
                massa, laoreet dapibus ex elit vitae odio.
              </p>
            </div>
          </div>
        </div>

        <!-- Second Small Card (Speed) -->
        <div class="flex h-full p-px lg:col-span-2">
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 lg:rounded-bl-[2rem]"
          >
            <div class="flex-1">
              <img
                class="h-full w-full object-cover"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-speed.png"
                alt="Speed"
              />
            </div>
            <div class="p-10 pt-4">
              <h3 class="text-sm/4 font-semibold text-indigo-600">Speed</h3>
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950">
                Built for power users
              </p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600">
                Sed congue eros non finibus molestie. Vestibulum euismod augue.
              </p>
            </div>
          </div>
        </div>

        <!-- Second Large Card (Integrations) -->
        <div class="flex h-full p-px lg:col-span-4">
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]"
          >
            <div class="flex-1">
              <img
                class="h-full w-full object-cover"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png"
                alt="Integrations"
              />
            </div>
            <div class="p-10 pt-4">
              <h3 class="text-sm/4 font-semibold text-indigo-600">
                Integrations
              </h3>
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950">
                Connect your favorite tools
              </p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600">
                Maecenas at augue sed elit dictum vulputate, in nisi aliquam
                maximus arcu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

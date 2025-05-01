<template>
  <div class="h-full bg-white dark:bg-gray-900">
    <div class="m-auto h-full p-6 lg:p-8">
      <div class="grid h-full grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
        <!-- First Large Card (Performance) -->
        <div
          class="flex h-full p-px lg:col-span-4 transition-all duration-300 hover:scale-[99%]"
        >
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] hover:ring-[#50A9E4]/30 dark:hover:ring-[#6EC0FF]/30"
          >
            <div class="flex-1 bg-gray-100 dark:bg-gray-700 relative">
              <img
                class="h-full w-full object-cover object-left dark:hidden"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-performance.png"
                alt="Performance dashboard showing metrics"
              />
              <img
                class="hidden h-full w-full object-cover object-left dark:block"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-releases.png"
                alt="Performance metrics in dark mode"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-800/50"
              ></div>
            </div>
            <div class="p-10 pt-4">
              <h3
                class="text-sm/4 font-semibold text-[#50A9E4] dark:text-[#6EC0FF]"
              >
                Performance
              </h3>
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white"
              >
                Lightning-fast builds
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                gravida justo et nulla efficitur, maximus egestas sem
                pellentesque.
              </p>
            </div>
          </div>
        </div>

        <!-- First Small Card (Releases) -->
        <div
          class="flex h-full p-px lg:col-span-2 transition-all duration-300 hover:scale-[99%]"
        >
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 lg:rounded-tr-[2rem] hover:ring-[#50A9E4]/30 dark:hover:ring-[#6EC0FF]/30"
          >
            <div class="flex-1 bg-gray-100 dark:bg-gray-700 relative">
              <img
                class="h-full w-full object-cover object-right dark:hidden"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-releases.png"
                alt="Release management interface"
              />
              <img
                class="hidden h-full w-full object-cover object-right dark:block"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-integrations.png"
                alt="Release management in dark mode"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-800/50"
              ></div>
            </div>
            <div class="p-10 pt-4">
              <h3
                class="text-sm/4 font-semibold text-[#50A9E4] dark:text-[#6EC0FF]"
              >
                Releases
              </h3>
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white"
              >
                Push to deploy
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400"
              >
                Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus
                massa, laoreet dapibus ex elit vitae odio.
              </p>
            </div>
          </div>
        </div>

        <!-- Second Small Card (Speed) -->
        <div
          class="flex h-full p-px lg:col-span-2 transition-all duration-300 hover:scale-[99%]"
        >
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 lg:rounded-bl-[2rem] hover:ring-[#50A9E4]/30 dark:hover:ring-[#6EC0FF]/30"
          >
            <div class="flex-1 bg-gray-100 dark:bg-gray-700 relative">
              <img
                class="h-full w-full object-cover dark:hidden"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-speed.png"
                alt="Speed optimization dashboard"
              />
              <img
                class="hidden h-full w-full object-cover dark:block"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-security.png"
                alt="Speed metrics in dark mode"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-800/50"
              ></div>
            </div>
            <div class="p-10 pt-4">
              <h3
                class="text-sm/4 font-semibold text-[#50A9E4] dark:text-[#6EC0FF]"
              >
                Speed
              </h3>
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white"
              >
                Built for power users
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400"
              >
                Sed congue eros non finibus molestie. Vestibulum euismod augue.
              </p>
            </div>
          </div>
        </div>

        <!-- Second Large Card (Integrations) -->
        <div
          class="flex h-full p-px lg:col-span-4 transition-all duration-300 hover:scale-[99%]"
        >
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] hover:ring-[#50A9E4]/30 dark:hover:ring-[#6EC0FF]/30"
          >
            <div class="flex-1 bg-gray-100 dark:bg-gray-700 relative">
              <img
                class="h-full w-full object-cover dark:hidden"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png"
                alt="Integration connections dashboard"
              />
              <img
                class="hidden h-full w-full object-cover dark:block"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-performace.png"
                alt="Integrations in dark mode"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-800/50"
              ></div>
            </div>
            <div class="p-10 pt-4">
              <h3
                class="text-sm/4 font-semibold text-[#50A9E4] dark:text-[#6EC0FF]"
              >
                Integrations
              </h3>
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white"
              >
                Connect your favorite tools
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400"
              >
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

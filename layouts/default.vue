<script setup lang="ts">
const route = useRoute()
const host = process.server
  ? useRequestHeaders().host
  : window.location.host

useHead({
  link: [
    { rel: 'canonical', href: `https://${host}${route.path}` },
  ],
})
</script>

<template>
  <div>
    <header class="header bg-white/80 backdrop-blur  px-4 shadow-md">
      <nav role="navigation" class="w-full  lg:w-200 mx-auto h-16 f-b-c  ">
        <NuxtLink to="/">
          <img src="/logo.svg" alt="logo" class="wh-7 lg:wh-8">
        </NuxtLink>
        <div class="space-x-2 lg:space-x-6">
          <NuxtLink
            v-for="(list, key) in feedsInfo" :key="key" :to="`/${key}`"
            class="px-2 lg:px-4 py-2  rounded-md font-semibold  no-underline  hover:(text-gray-950 bg-gray-100 )"
            :class="$route.path.startsWith(`/${key}`) ? 'text-nx bg-gray-100 shadow-inner' : 'text-gray-700'"
          >
            {{ list.title }}
          </NuxtLink>
        </div>
        <a href="https://github.com/nuxt/hackernews" target="_blank" rel="noopener banner">
          <Github class="wh-7 lg:wh-8" />
        </a>
      </nav>
    </header>
    <slot role="main" />
  </div>
</template>

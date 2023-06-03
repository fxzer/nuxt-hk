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
    <Header />
    <slot role="main" />
  </div>
</template>

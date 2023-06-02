<script setup lang="ts">
definePageMeta({
  middleware: (from) => {
    console.log('[ from ]-4', from)
    if (from.path === '/')
      return navigateTo(`/${validFeeds[0]}/1`)
  },
})
</script>

<template>
  <div>Index</div>
</template>

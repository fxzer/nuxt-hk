<script setup lang="ts">
definePageMeta({
  middleware: from => from.path === '/' ? navigateTo(`/${validFeeds[0]}/1`) : from.path,
})
</script>

<template>
  <div>Index</div>
</template>

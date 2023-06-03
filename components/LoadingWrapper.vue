<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div
    v-if="loading"
    class="py-10"
  >
    <LoadSpinner />
  </div>
  <slot v-else />
</template>

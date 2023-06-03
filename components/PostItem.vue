<script setup lang="ts">
import { host, isAbsolute, timeAgo } from '~/composables/utils'

defineProps<{
  item: any
}>()
</script>

<template>
  <li class="py-5 f-s-c">
    <span class="w-20 text-center text-2xl font-semibold inline-block  text-gray-700">{{ item.points }}</span>
    <div class=" space-y-1">
      <span class=" hover:text-nx">
        <template v-if="isAbsolute(item.url)">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
          >{{ item.title }}</a>
          <span class="host"> ({{ host(item.url) }})</span>
        </template>
        <template v-else>
          <NuxtLink :to="`/item/${item.id}`">{{ item.title }}</NuxtLink>
        </template>
      </span>
      <br>
      <span class="text-sm text-slate-500 f-s-c space-x-5">
        <span
          v-if="item.type !== 'job'"
          class=" hover:text-nx"
        >
          by
          <NuxtLink :to="`/user/${item.user}`">{{ item.user }}</NuxtLink>
        </span>
        <span class="time">
          {{ timeAgo(item.time) }} ago
        </span>
        <span
          v-if="item.type !== 'job'"
          class=" hover:text-nx"
        >
          <NuxtLink :to="`/item/${item.id}`">{{ item.comments_count }} comments</NuxtLink>
        </span>
      </span>
    </div>
  </li>
</template>

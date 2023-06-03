<script setup lang="ts">
import { timeAgo } from '~/composables/utils'

defineProps({
  comment: {
    type: Object,
    required: true,
  },
})

const open = ref(true)

function pluralize(n: number) {
  return n + (n === 1 ? ' reply' : ' replies')
}
</script>

<template>
  <li v-if="comment && comment.user" class="py-8 ">
    <div>
      <NuxtLink class=" underline text-pink-400" :to="`/user/${comment.user}`">
        {{ comment.user }}
      </NuxtLink>
      <span class="text-gray-600 ml-4">{{ timeAgo(comment.time) }} ago</span>
    </div>
    <div v-if="comment.content" class="">
      {{ comment.content }}
    </div>
    <div v-if="comment.comments && comment.comments.length" :class="{ open }" class="mt-3">
      <div @click="open = !open">
        <div v-if="open" class="f-s-c  py-2">
          <CareBottom class="wh-5" />
        </div>
        <div v-else class="f-s-c bg-emerald-50 py-2 space-x-2">
          <CareRight class="wh-5" />
          <span class="text-zinc-600">{{ pluralize(comment.comments.length) }} collapsed</span>
        </div>
      </div>
    </div>
    <ul v-show="open" class="ml-6 -translate-y-4">
      <PostComment
        v-for="childComment in comment.comments" :key="childComment.id" :comment="childComment"
        class=" border-t border-slate-200"
      />
    </ul>
  </li>
</template>

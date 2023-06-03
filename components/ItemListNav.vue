<script setup lang="ts">
const props = defineProps<{
  feed: string
  page: number
  maxPage: number
}>()

const router = useRouter()
const hasMore = computed(() => props.page < props.maxPage)

function prevHandler() {
  if (props.page <= 1)
    return
  router.push(`/${props.feed}/${props.page - 1}`)
}
function nextHandler() {
  if (!hasMore.value)
    return
  router.push(`/${props.feed}/${props.page + 1}`)
}
function isEnable(flag: boolean) {
  return flag ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
}
</script>

<template>
  <div class="f-c-c py-4">
    <NuxtLink class="f-c-c hover:text-nx" :class="isEnable(page > 1)" @click="prevHandler">
      <ArrowLeft class="wh-4" />prev
    </NuxtLink>
    <span class="px-10">{{ page }} / {{ maxPage }}</span>
    <NuxtLink
      class="f-c-c hover:text-nx"
      :class="isEnable(hasMore)"
      @click="nextHandler"
    >
      more <ArrowRight class="wh-4" />
    </NuxtLink>
  </div>
</template>

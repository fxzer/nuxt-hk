<script setup lang="ts">
definePageMeta({
  middleware: 'feed',
})

const route = useRoute()
const router = useRouter()
const page = computed(() => +route.params.page || 1)
const feed = computed(() => route.params.feed as keyof typeof feedsInfo)
const isValidFeed = computed(() => !!feedsInfo[feed.value])

const pageNo = computed(() => Number(page.value) || 1)
const displayedPage = ref(pageNo.value)

useHead({
  title: feedsInfo[feed.value]?.title,
})

const state = useStore()

if (isValidFeed.value)
  await fetchFeed({ page: pageNo.value, feed: feed.value })

const items = computed(() => getFeed(state.value, { page: pageNo.value, feed: feed.value }) || [])
const loading = computed(() => items.value.length === 0)

const maxPage = computed(() => {
  return +(feedsInfo[feed.value]?.pages) || 0
})

function pageChanged(to: number) {
  if (!isValidFeed.value)
    return

  if (to <= 0 || to > maxPage.value) {
    router.replace(`/${feed.value}/1`)
    return
  }

  // Prefetch next page
  fetchFeed({
    feed: feed.value,
    page: page.value + 1,
  }).catch(() => {})

  displayedPage.value = to
}

onMounted(() => pageChanged(page.value))
watch(page, to => pageChanged(to))
</script>

<template>
  <div class="bg-gray-50 py-4 min-h-screen">
    <div class="px-4 lg:w-200 mx-auto bg-white sd-6-1">
      <ItemListNav
        :feed="feed"
        :page="page"
        :max-page="maxPage"
        class="border-b border-slate-100"
      />

      <div
        :key="displayedPage"
      >
        <LoadSpinner v-if="loading" />
        <template v-else>
          <ul class="divide-y-1 divide-slate-100">
            <PostItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </ul>
          <ItemListNav
            :feed="feed"
            :page="page"
            :max-page="maxPage"
            class="border-t border-slate-100"
          />
        </template>
      </div>
    </div>
  </div>
</template>

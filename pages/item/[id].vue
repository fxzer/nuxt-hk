<script setup lang="ts">
const route = useRoute()
const id = computed(() => +route.params.id)

const [resultItem, resultComments] = await Promise.all([fetchItem(id.value), fetchComments(id.value)])
const { data: item } = toRefs(resultItem)
const { data: comments, loading: commentsLoading } = toRefs(resultComments)

useHead({
  title: item.value?.title,
})
</script>

<template>
  <div class=" lg:w-200 mx-auto bg-white  my-4">
    <div
      v-if="!item?.url"
      class="item-view-header"
    >
      <h1 class="text-4xl text-red-500 text-center">
        Page not found
      </h1>
    </div>
    <template v-else>
      <div class="mb-4 sd-6-1  p-6 ">
        <template v-if="isAbsolute(item.url)">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
          ><h1 class="inline  text-2xl font-semibold" v-text="item.title" /><span class="text-gray-600 hover:text-nx"> ({{ host(item.url) }})</span></a>
        </template>
        <template v-else>
          <h1 class="text-2xl font-semibold" v-text="item.title" />
        </template>
        <p class="mt-2 space-x-5 text-gray-600">
          <span> {{ item.points }} points</span>
          <span>
            by <NuxtLink :to="`/user/${item.user}`">
              {{ item.user }}
            </NuxtLink>
          </span>
          <span> {{ timeAgo(+item.time) }} ago</span>
        </p>
      </div>
      <div class="sd-6-1  p-6">
        <LoadingWrapper :loading="commentsLoading">
          <p class="">
            {{ comments ? `${comments.length} comments` : 'No comments yet.' }}
          </p>
          <ul class=" divide-y-1 divide-amber-200">
            <PostComment
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
            />
          </ul>
        </LoadingWrapper>
      </div>
    </template>
  </div>
</template>

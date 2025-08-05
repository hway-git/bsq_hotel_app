<script setup lang="ts">
import type { Article } from '@/api/modules/articleApi'

const {
  data: article,
  loading,
  send,
  onError,
} = useRequest((id: string) => apis.article.getDetail(id), {
  immediate: false,
})

onError((err) => {
  console.error('获取文章列表失败:', err)
})

onLoad((option) => {
  console.log('onLoad option:', option)
  if (option?.id) {
    send(option.id)
  }
})
</script>

<template>
  <view class="min-h-screen bg-white dark:bg-[var(--wot-dark-background)]">
    <!-- 加载中 -->
    <wd-loading v-if="loading" class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

    <!-- 文章详情 -->
    <view v-if="article as Article" class="p-4">
      <!-- 文章标题 -->
      <view class="mb-4 text-[clamp(18px,5vw,22px)] text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        {{ article.title }}
      </view>

      <!-- 文章标签 -->
      <view class="mb-4 flex flex-wrap gap-2">
        <text
          v-for="tag in article.tags"
          :key="tag"
          class="rounded-full bg-blue-100 px-2 py-0.5 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-300"
        >
          {{ tag }}
        </text>
      </view>

      <!-- 文章封面 -->
      <view v-if="article.cover" class="mb-4 overflow-hidden rounded-3 shadow-sm">
        <image :src="article.cover" class="h-48 w-full object-cover" mode="aspectFill" />
      </view>

      <!-- 文章内容 -->
      <rich-text
        class="prose prose-blue dark:prose-invert prose-sm sm:prose-base max-w-none"
        :nodes="article.content"
      />

      <!-- 文章时间 -->
      <view class="mt-6 flex flex-wrap justify-between gap-2 text-sm text-gray-400">
        <text>发布时间: {{ article.created_at }}</text>
        <text>更新时间: {{ article.updated_at }}</text>
      </view>
    </view>

    <!-- 空数据 -->
    <view v-else class="p-10 text-center">
      <wd-status-tip image="content" tip="暂无内容" />
    </view>
  </view>
</template>

<route lang="json">
{
  "name": "article-detail",
  "style": {
    "navigationBarTitleText": "文章详情"
  }
}
</route>

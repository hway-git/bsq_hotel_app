<script setup lang="ts">
import { ref } from 'vue'
import type { Article } from '@/api/modules/articleApi'

const router = useRouter()

// 搜索关键词
const searchKeyword = ref('')

const {
  data: articles,
  // page,
  isLastPage,
  loading,
  // loadMore,
  // refresh,
  onSuccess,
  onError,
} = usePagination((page, pageSize) => apis.article.getList({
  page_num: page,
  page_size: pageSize,
  params: {
    title: searchKeyword.value,
  },
}), {
  initialPage: 1,
  initialPageSize: 10,
  immediate: true,
})

onSuccess((res) => {
  console.log('获取文章列表成功:', res)
})

onError((err) => {
  console.error('获取文章列表失败:', err)
})

/**
 * 搜索文章（带防抖）
 */
// const searchArticles = useDebounceFn(() => {
//   page.value = 1
//   refresh()
// }, 500)

/**
 * 跳转到详情页
 * @param id 文章ID
 */
function goToDetail(id: number) {
  router.push({ name: 'article-detail', params: { id: String(id) } })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 dark:bg-[var(--wot-dark-background)]">
    <!-- 文章列表 -->
    <view class="p-3">
      <view class="grid grid-cols-2 gap-3">
        <view
          v-for="article in (articles as Article[])"
          :key="article.id"
          class="overflow-hidden rounded-2 bg-white shadow-sm dark:bg-[var(--wot-dark-background2)]"
          @click="goToDetail(article.id)"
        >
          <!-- 文章封面 -->
          <view class="relative h-32 overflow-hidden">
            <image
              :src="article.cover || 'https://via.placeholder.com/300x200?text=No+Image'"
              class="h-full w-full object-cover"
              mode="aspectFill"
            />
            <!-- 标签 -->
            <view class="absolute right-1 top-1 flex gap-1">
              <text
                v-for="tag in article.tags.slice(0, 2)"
                :key="tag"
                class="rounded bg-blue-500 px-1.5 py-0.5 text-xs text-white"
              >
                {{ tag }}
              </text>
            </view>
          </view>
          <!-- 文章内容 -->
          <view class="p-2">
            <view class="line-clamp-2 text-sm text-gray-800 font-semibold dark:text-[var(--wot-dark-color)]">
              {{ article.title }}
            </view>
          </view>
        </view>
      </view>

      <!-- 加载中 -->
      <wd-loading v-if="loading" class="mt-4" />

      <!-- 没有更多数据 -->
      <view v-else-if="isLastPage && articles.length > 0" class="py-4 text-center text-sm text-gray-500">
        没有更多数据了
      </view>

      <!-- 空数据 -->
      <view v-else-if="articles.length === 0" class="py-10 text-center">
        <wd-status-tip image="content" tip="暂无内容" />
      </view>
    </view>
  </view>
</template>

<route lang="json">
{
  "name": "article",
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "绿洲"
  }
}
</route>

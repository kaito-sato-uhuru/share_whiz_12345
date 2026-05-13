<script setup>
import { onMounted, watch, computed} from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '../stores/postStore';
import Header from './Header.vue'
import SideBar from './Side.vue'
import PostList from './PostList.vue'


const route = useRoute()
const postStore = usePostStore();

// URLのクエリパラメータから検索キーワードを取得
const searchQuery = computed(() => route.query.q || '')

// 検索を実行する関数
const performSearch = async (query) => {
  try {
    await postStore.postSearch(query);
  } catch (error) {
    console.error('検索に失敗しました:', error)
  } finally {
  }
}

// URLのクエリが変更されたら検索を実行
watch(() => route.query.q, (newQuery) => {
  performSearch(newQuery)
})

onMounted(async () => {
  // 初期検索の実行
  if (searchQuery.value) {
    await postStore.postSearch(searchQuery.value);
  }
})
</script>

<template>
  <div class="layout-container">
    <!-- サイドバー -->
    <SideBar />

    <!-- メインコンテンツ -->
    <div class="main-content">
      <!-- ヘッダー -->
      <Header
        title="検索結果"
      />

      <!-- メモ一覧 -->
      <div class="memos-scroll-area">
        <div class="memos-container">
          <!-- 検索状態の表示 -->
          <div class="memos-header">
            <h2 class="memos-title">
              "{{ searchQuery }}" の検索結果
            </h2>
            <p class="search-count">
              {{ postStore.searchResults.length }}件の投稿が見つかりました
            </p>
          </div>
          <!-- 検索結果の表示 -->
          <PostList
            :posts="postStore.searchResults"
          />

          <!-- 検索結果が0件の場合 -->
          <div
            v-if="postStore.searchResults.length === 0"
            class="no-results"
          >
            検索結果が見つかりませんでした
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.memos-header {
  margin-bottom: 1.5rem;
}

.search-count {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.loading-state {
  text-align: center;
  padding: 2rem 0;
  color: #6b7280;
}

.no-results {
  text-align: center;
  padding: 2rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
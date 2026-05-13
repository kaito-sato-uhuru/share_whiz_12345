<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'
import SideBar from './Side.vue'
import Header from './Header.vue'
import PostList from './PostList.vue'

const postStore = usePostStore()

onMounted(async () => {
  await postStore.fetchPosts()
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
        title="ダッシュボード"
      />

      <!-- メモ一覧 -->
      <div class="memos-scroll-area">
        <div class="memos-container">
          <div class="memos-header">
            <h2 class="memos-title">投稿されたメモ</h2>
          </div>
          <PostList :posts="postStore.posts" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

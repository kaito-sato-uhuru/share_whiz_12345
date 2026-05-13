<script setup>
import { defineProps } from 'vue'

// propsの定義
const props = defineProps({
  posts: Array
})

// 時間を「xx日前」に変換する関数
const calculateTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return `${diffDays}日前`
}

</script>

<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post-card">
      <div class="post-content">
        <div class="post-details">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-body">{{ post.body }}</p>
          <div v-if="post.image_url" class="image-container">
            <div class="image-wrapper">
              <img
                :src="post.image_url"
                :alt="post.title"
                class="post-image"
              />
            </div>
          </div>
          <div class="post-meta">
            <div class="post-info">
              <span class="time-ago">{{ calculateTimeAgo(post.created_at) }}</span>
            </div>
          </div>
        </div>
        <div class="post-actions">
          <button class="star-button">
            ☆
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.image-container {
  /* 画像部分の表示領域を 100x100 に固定 */
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-left: 20px;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.post-image {
  /* 画像をコンテナいっぱいに表示 */
  width: 100%;
  height: 100%;
  object-fit: cover; /* 画像のアスペクト比を保ちつつ埋める */
}
</style>
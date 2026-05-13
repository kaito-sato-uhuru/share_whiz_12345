<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: {
    type: String
  }
});

const searchKeyword = ref('');

// フォーム送信時の処理
const handleSubmit = (e) => {
  e.preventDefault();

  // 検索キーワードが空でない場合のみ処理を実行
  if (searchKeyword.value.trim()) {
    // 直接URLを変更して検索を実行
    router.push({
      path: '/search',
      query: { q: searchKeyword.value }
    });
  }
};
</script>

<template>
  <header class="header">
    <div class="header-top">
      <h1 class="header-title">{{ title }}</h1>
      <div class="header-actions">
        <form @submit="handleSubmit" class="search-container">
          <input
            v-model="searchKeyword"
            placeholder="タイトルで検索"
            class="search-input"
            type="search"
            aria-label="検索"
          />
          <button
            type="submit"
            class="search-button"
          >
            検索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 検索フォームのスタイル更新 */
.search-container {
  position: relative;
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1f2937;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  background-color: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* 検索ボタンのスタイル */
.search-button {
  padding: 0.75rem 1.5rem;
  background-color: #4f83f2;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.search-button:hover {
  background-color: #3b82f6;
  transform: translateY(-1px);
}

.search-button:active {
  transform: translateY(0);
}

</style>

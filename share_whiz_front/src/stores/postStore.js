import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const posts = ref([]);
  const searchResults = ref([]);

    // 全ての投稿を取得
  async function fetchPosts() {
    try {
      const response = await api.get('/posts')
      posts.value = response.data
    } catch (error) {
      console.error('投稿の取得に失敗しました:', error)
    }
  }

  // 投稿を作成
  async function createPost(postData) {
    try {
      const response = await api.post('/posts', postData)
      posts.value.push(response.data)
    } catch (error) {
      console.error('投稿の作成に失敗しました:', error)
    }
  }

  // 検索
  async function postSearch(query) {
    if (!query) return;
    try {
      const response = await api.get('/search', {
        params: { q: query },
      });
      searchResults.value = response.data; // 検索結果を保存
    } catch (error) {
      console.error('検索に失敗しました:', error);
    }
  }
  return { posts, fetchPosts , createPost, postSearch, searchResults}
})
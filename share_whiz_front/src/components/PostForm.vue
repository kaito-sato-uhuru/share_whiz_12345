<script setup>
import { ref } from 'vue';
import { usePostStore } from '../stores/postStore';

const post = ref({
  title: '',
  body: '',
  image: null
})

const postStore = usePostStore();
const emit = defineEmits(['close-modal'])

const handleImageUpload = (event) => {
  post.value.image = event.target.files[0];
};

const submitPost = async () => {
  try {
    // テキストデータとファイルデータの両方を送るためFormDataを使用しmultipart/form-data型のリクエストを行う
    const formData = new FormData();
    formData.append('title', post.value.title);
    formData.append('body', post.value.body);
    if (post.value.image) {
      formData.append('image', post.value.image);
    }

    await postStore.createPost(formData);
  } catch (error) {
    console.error('投稿処理に失敗しました:', error);
    alert('投稿処理に失敗しました');
  } finally {
    // モーダルを閉じるイベントをエミット
    emit('close-modal')
  }
};
</script>

<template>
  <div class="post-form-card">
    <div class="post-form-content">
      <form>
        <div class="form-group">
          <label for="title" class="form-label">タイトル:</label>
          <input
            id="title"
            v-model="post.title"
            placeholder="タイトルを入力"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="body" class="form-label">内容:</label>
          <textarea
            id="body"
            v-model="post.body"
            placeholder="内容を入力"
            class="form-textarea"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="image" class="form-label">画像:</label>
          <input
            type="file"
            id="image"
            class="form-file-input"
            @change="handleImageUpload"
            accept="image/*"
          />
        </div>
        <input
          type="button"
          class="submit-button"
          value="送信"
          @click="submitPost"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.post-form-card {
  margin-top: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 0 1rem; /* 左右の余白を追加 */
}

.post-form-content {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.textarea {
  width: 100%;
  min-height: 150px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem;
  resize: vertical;
  font-size: 0.875rem;
}

.textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  font-weight: 600;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
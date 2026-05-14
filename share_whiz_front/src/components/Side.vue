<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// TODO: firebase.jsから必要な関数をインポートしましょう
// TODO: firebase/authから必要な関数をインポートしましょう
import FormModal from './FormModal.vue'
import { auth, signOut } from '../firebase';


const router = useRouter()
const currentUser = ref(null)
const showModal = ref(false);

onMounted(() => {
})

// ログアウト処理
const handleSignOut = async () => {
  // TODO: ログアウト機能を実装しましょう
  // 1. signOutでログアウト
  // 2. ログアウト成功後、/に遷移
  // 3. エラー時はコンソールにエラーを表示
  try{
    await signOut(auth)
    router.push("/")
  }catch(error){
    console.log('ログアウトに失敗しました')
  }
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <router-link to="/dashboard" class="sidebar-logo">
        <div class="avatar"></div>
        <span>ShareWhiZ</span>
      </router-link>
    </div>

    <div>
      <button
        class="new-memo-button"
        @click="showModal = true"
      >
      新しいメモを作成
      <span class="ellipsis">...</span>
      </button>
      <FormModal v-model="showModal" body="newPost" @close-modal="closeModal" />
    </div>

    <!-- ユーザー情報セクション -->
    <div class="user-section">
      <div class="user-info">
        <span
          class="user-name"
        >
          ゲストさん
        </span>
        <button
          variant="secondary"
          @click="handleSignOut"
          class="action-button logout-button"
          aria-label="ログアウトする"
        >
          ログアウト
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-section {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.user-name {
  color: #fff;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 4px;
}

.action-button {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
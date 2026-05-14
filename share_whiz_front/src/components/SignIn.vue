<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// TODO: firebase.jsから必要な関数をインポートしましょう
import { auth, signInWithEmailAndPassword } from '../firebase';

const email = ref('');
const password = ref('');


const router = useRouter()

const handleSignIn = async() => {
  // TODO: ログイン機能を実装しましょう
  // 1. signInWithEmailAndPasswordでログイン
  // 2. ログイン成功後、/dashboardに遷移
  // 3. エラー時はコンソールにエラーを表示

  try{
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push("/dashboard")
  }catch(error){
    console.log('ログインに失敗しました')
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="form-container">
      <h1 class="form-title">ログイン</h1>
      <div class="form-group">
        <label for="email" class="form-label">メールアドレス</label>
        <input
          id="email"
          type="text"
          v-model="email"
          placeholder="メールアドレスを入力"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">パスワード</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="パスワードを入力"
          class="input-field"
        />
      </div>
      <button class="submit-button" @click="handleSignIn">
        ログイン
      </button>
      <p class="auth-link">
        アカウント作成がお済みでない場合は、
        <router-link to="/signup">こちらへ</router-link>
      </p>
    </div>
  </div>
</template>


<style scoped>

.form-label {
  font-weight: 600;
  color: #4b5563;
  font-size: 0.875rem;
}

.input-field {
  width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1f2937;
  transition: all 0.2s;
}
</style>

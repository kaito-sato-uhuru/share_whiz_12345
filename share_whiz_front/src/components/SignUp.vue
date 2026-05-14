<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';


const router = useRouter();
const email = ref('');
const password = ref('');
const nickname = ref('');

const handleSignUp = async() => {
  try {
    await createUserWithEmailAndPassword(auth,email.value, password.value)
    router.push("/dashboard");
  }catch(error) {
    console.log('ユーザー登録できませんでした', error)
  }
}

</script>

<template>
  <div class="auth-container">
    <div class="form-container">
      <h1 class="form-title">新規登録</h1>
      <div class="form-group">
        <label for="nickname" class="form-label">ニックネーム</label>
        <input id="nickname" v-model="nickname" placeholder="ニックネームを入力" class="input-field" />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">メールアドレス</label>
        <input type="text" id="email" v-model="email" placeholder="メールアドレスを入力" class="input-field">
      </div>
      <div class="form-group">
        <label for="password" class="form-label">パスワード</label>
        <input type="password" id="password" v-model="password" placeholder="パスワードを入力" class="input-field">
      </div>
      <button class="submit-button" @click="handleSignUp" >
        新規登録
      </button>
      <p class="auth-link">
        既にアカウントをお持ちの方は、
        <router-link to="/">こちらへ</router-link>
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
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.925rem;
  color: #1f2937;
  transition: all 0.2s;
}
</style>

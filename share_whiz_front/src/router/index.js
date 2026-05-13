import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue';
import SearchResult from '../components/SearchResult.vue'
// TODO: firebase.jsから必要な関数をインポートしましょう

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/search',
    name: 'SearchResult',
    component: SearchResult
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// TODO: ナビゲーションガードを実装しましょう
// router.beforeEachを使用して、以下の条件でルーティングを制御します
// 1. 未ログインユーザーが/dashboardや/searchにアクセスした場合、/にリダイレクト
// 2. ログイン済みユーザーが/や/signupにアクセスした場合、/dashboardにリダイレクト

export default router

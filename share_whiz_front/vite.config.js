import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 外部からのアクセスを可能にする
    port: 5173, // 任意のポート番号を指定
    strictPort: true, // 指定したポートで必ず起動
  },
  build: {
    chunkSizeWarningLimit: 600, // チャンクサイズの警告限度を変更
  },
  preview: {
    allowedHosts: [
      'docbase-app-front.onrender.com' // アクセスを許可するホストを追加
    ],
  }
})

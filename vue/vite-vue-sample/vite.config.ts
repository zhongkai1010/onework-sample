import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    eslintPlugin({

    })],
  server: {
    port: 3002,
    host: '0.0.0.0',
    watch: {
      usePolling: true
    }
  }
})

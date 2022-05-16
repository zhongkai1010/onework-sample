import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// 路径查找
const pathResolve = (dir: string): string => {
   
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
  '/@': pathResolve('src'),
  '@build': pathResolve('build')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({})],
  resolve: {
    alias
  },
  server: {
    port: 3002,
    host: '0.0.0.0',
    watch: {
      usePolling: true
    }
  }
})

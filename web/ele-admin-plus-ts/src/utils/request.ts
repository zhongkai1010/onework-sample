/**
 * axios实例
 */
import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { unref } from 'vue'
import type { Action } from 'element-plus'
import { ElMessageBox } from 'element-plus/es'
import { API_BASE_URL, LAYOUT_PATH } from '@/config/setting'
import type { ApiResult } from '@/api'
import router from '@/router'
import { getToken, setToken } from './token-util'
import { logout, toURLSearch } from './common'

/** 创建axios实例 */
const service = axios.create({
  baseURL: API_BASE_URL
})

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    requestInterceptor(config)
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(new Error('网络错误'))
  }
)

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  (res: AxiosResponse<ApiResult<unknown>>) => {
    const errorMessage = responseInterceptor(res)
    if (errorMessage) {
      return Promise.reject(new Error(errorMessage))
    }
    return res
  },
  (error) => {
    console.error(error)
    return Promise.reject(new Error('网络错误'))
  }
)

/**
 * 请求拦截处理
 */
export function requestInterceptor(config: InternalAxiosRequestConfig<any>) {
  // 添加token到header
  const token = getToken()
  if (token && config.headers) {
    config.headers['Authorization'] = token
    config.headers['token'] = token
  }
  // get请求处理数组和对象类型参数
  if (config.method === 'get' && config.params) {
    config.url = toURLSearch(config.params, config.url)
    config.params = {}
  }
}

/**
 * 响应拦截处理
 */
export function responseInterceptor(res: AxiosResponse<ApiResult<unknown>>) {
  // 登录过期处理
  if (res.data?.code === 401) {
    const { path, fullPath } = unref(router.currentRoute)
    if (path == LAYOUT_PATH) {
      logout(true, void 0, router.push)
    } else if (path !== '/login') {
      ElMessageBox.close()
      ElMessageBox.alert('登录状态已过期, 请退出重新登录!', '系统提示', {
        confirmButtonText: '重新登录',
        callback: (action: Action) => {
          if (action === 'confirm') {
            logout(false, fullPath)
          }
        },
        type: 'warning',
        draggable: true
      })
    }
    return res.data.message
  }
  // 续期token
  const newToken = res.headers['authorization']
  if (newToken) {
    setToken(newToken)
  }
}

export default service

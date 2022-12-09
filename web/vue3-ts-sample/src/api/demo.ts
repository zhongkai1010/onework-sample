import { http } from '@/utils/http'

export const loginApi = () => http.post<any, any>({ url: 'login' })

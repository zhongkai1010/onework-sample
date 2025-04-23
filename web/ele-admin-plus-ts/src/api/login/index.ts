import request from '@/utils/request';
import { setToken } from '@/utils/token-util';
import type { ApiResult } from '@/api';
import type { LoginParam, LoginResult, CaptchaResult } from './model';

/**
 * 登录
 */
export async function login(data: LoginParam) {
  const res = await request.post<ApiResult<LoginResult>>('/login', data);
  if (res.data.code === 0) {
    setToken('Bearer ' + res.data.data?.access_token, data.remember);
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取验证码
 */
export async function getCaptcha() {
  const res = await request.get<ApiResult<CaptchaResult>>('/captcha');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

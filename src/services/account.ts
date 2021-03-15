import { LoginParams } from '@/types/account.request';
import request from '@/utils/request';
import { MethodType, URL } from '@/types/common.enum';

/**
 * 账户登录
 * @param params
 */
export async function login(params: LoginParams): Promise<void> {
  return request(`${URL.account}/login`, {
    method: MethodType.post,
    data: params,
  });
}

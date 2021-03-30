import { LoginParams } from '@/types/account.request';
import request from '@/utils/request';
import { MethodType, URL } from '@/types/common.enum';

/**
 * todo
 * 账户登录
 * @param params
 */
export async function login(params: LoginParams): Promise<any> {
  return request(`${URL.account}/login`, {
    method: MethodType.post,
    data: params,
  });
}

/**
 * todo 根据token获取用户存入redis的信息
 */
export async function fetchAccountInfo(): Promise<any> {
  return request(`${URL.account}/fetch_account_info`, {
    method: MethodType.get,
  });
}

/**
 * todo 获取银行列表
 */
export async function findAllBank(): Promise<any> {
  return request(`${URL.account}/find_all_bank`, {
    method: MethodType.get,
  });
}

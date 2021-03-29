import request from '@/utils/request';
import { MethodType, URL } from '@/types/common.enum';
import { CreateUserParams } from '@/types/user.request';

/**
 * todo 新增一条工人记录
 * @param params
 */
export async function createUser(params: CreateUserParams): Promise<any> {
  let formData = new FormData();
  Object.getOwnPropertyNames(params).forEach((key) => {
    // @ts-ignore
    if (params[key] !== undefined) {
      // @ts-ignore
      formData.append(key, params[key]);
    }
  });
  return request(`${URL.user}/create`, {
    method: MethodType.post,
    requestType: 'form',
    data: formData,
  });
}

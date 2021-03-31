import { extend, ResponseError } from 'umi-request';
import { CodeStatus, ResponseStatus } from '@/types/common.enum';
import store from 'storejs';
import { Account } from '@/schemas/account';

/**
 * todo
 * 拦截返回的错误处理
 * @param err
 */
const errorHandler = (err: ResponseError): Response => {
  const { response, data } = err;
  switch (response.status) {
    case ResponseStatus.created: {
      return data;
    }
    case ResponseStatus.ServerError: {
      if (data.code === CodeStatus.failed) {
        return data;
      }
      return data;
    }
    case ResponseStatus.Unauthorized: {
      return data;
    }
    case ResponseStatus.Timeout: {
      return {
        code: -1,
        message: '连接超时',
        data: null,
      } as any;
    }
  }

  return response;
};
const request = extend({
  prefix: '/api/',
  errorHandler: errorHandler,
  credentials: 'omit',
  timeout: 50000,
});
/**
 * todo
 * 发出请求前拦截
 */
request.interceptors.request.use((url, options): any => {
  //console.log('请求request:', { url, options });
  const account: Account = store.get('account');
  let token = '';
  if (account) {
    token = account.token;
  }
  options.headers = {
    ...options.headers,
    token: token,
  };
});
/**
 * todo
 * 拦截返回的response
 */
request.interceptors.response.use(
  (response, options): Response => {
    //console.log('返回response:', { response, options });
    return response;
  },
);
export default request;

import { extend, RequestOptionsInit, ResponseError } from 'umi-request';
import { ResponseStatus } from '@/types/common.enum';

/**
 * todo
 * 拦截返回的错误处理
 * @param err
 */
const errorHandler = (err: ResponseError): Response => {
  const { response, data } = err;
  switch (response.status) {
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
  console.log('请求request:', { url, options });
});
/**
 * todo
 * 拦截返回的response
 */
request.interceptors.response.use(
  (response, options): Response => {
    console.log('返回response:', { response, options });
    return response;
  },
);
export default request;

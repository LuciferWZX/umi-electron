import { history } from 'umi';

/**
 * todo
 * 跳转到入口页面 默认 push 登录
 * @param actionType
 * @param path
 */
export function navigatorToEntrance(
  actionType: 'push' | 'replace' = 'push',
  path: '/entrance/login' = '/entrance/login',
): void {
  history[actionType](path);
}

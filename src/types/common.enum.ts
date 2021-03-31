export enum Pathname {
  home = '/basic/home',
  information = '/basic/information',
  project = '/basic/project',
  projectUnderway = '/basic/project/underway',
  projectCompleted = '/basic/project/completed',
}
//请求的URL
export enum URL {
  account = 'account',
  user = 'user',
}
//请求的类型
export enum MethodType {
  get = 'GET',
  post = 'POST',
}
export enum ResponseStatus {
  created = 201,
  //无权限
  Unauthorized = 401,
  //服务器出错
  ServerError = 500,
  //请求超时
  Timeout = 504,
}
export enum CodeStatus {
  Success = 0,
  failed = -1,
}
export enum StoreKey {
  remember = 'remember',
  password = 'password',
  autoLogin = 'autoLogin',
  account = 'account',
}

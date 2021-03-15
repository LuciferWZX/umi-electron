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
}
//请求的类型
export enum MethodType {
  get = 'GET',
  post = 'POST',
}
export enum ResponseStatus {
  //无权限
  Unauthorized = 401,
  //请求超时
  Timeout = 504,
}
export enum CodeStatus {
  Success = 0,
}

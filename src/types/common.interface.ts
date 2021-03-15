export interface ResResponse<T> {
  code: number;
  message: string;
  data: T;
}

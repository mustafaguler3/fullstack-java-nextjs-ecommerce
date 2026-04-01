export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}
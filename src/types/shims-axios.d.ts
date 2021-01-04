import { AxiosInstance, Promise, AxiosRequestConfig } from 'axios'
import { ResponseResult } from './index.ts'
//自定义扩展axios模块
declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<ResponseResult<T>>

    get<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ResponseResult<T>>

    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ResponseResult<T>>

    head<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ResponseResult<T>>

    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ResponseResult<T>>

    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ResponseResult<T>>

    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ResponseResult<T>>
  }
}

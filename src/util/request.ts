/*
 * @Author : wa
 * @Date : 2021-01-01 23:53:49
 */

import { ResponseResult } from '@/types/index'
import { ElMessage } from 'element-plus'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenStatic,
  Method
} from 'axios'
import { getToken } from './auth'
//https://segmentfault.com/a/1190000023612000

class Request {
  service: AxiosInstance | null
  pending: object
  cancelToken: CancelTokenStatic
  constructor() {
    this.service = null
    this.pending = {}
    this.cancelToken = axios.CancelToken
  }

  getInsideConfig(): any {
    const conf = {
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: getToken()
      }
    }
    return conf
  }

  interceptors(service: AxiosInstance) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    //请求拦截
    service.interceptors.request.use(config => {
      const key = config.url || 'requestUrl' + config.method || ''
      that.removePending(key, true)
      config.cancelToken = new this.cancelToken(c => {
        that[key] = c
      })
      return config
    })

    //响应拦截
    service.interceptors.response.use(
      res => {
        const response = res.data
        const key = res.config.url || 'requestUrl' + res.config.method || ''
        that.removePending(key, false)

        if (response.code === 200) {
          return response
        }
        const message =
          response.code === 500
            ? '服务器繁忙，请稍后再试~'
            : response.message
            ? response.message
            : '不好意思，开了个小差，请稍后再试~'
        if (response.code === 422) {
          return Promise.reject(response)
        } else {
          ElMessage({ type: 'error', message })
          return Promise.reject(new Error(response.message))
        }
      },
      err => {
        const errMsg = err.message || '不好意思，开了个小差，请稍后再试~'
        ElMessage({ type: 'error', message: errMsg })
        return Promise.reject(new Error(err))
      }
    )
  }

  request<T>(
    options: AxiosRequestConfig,
    appendConfig?: any
  ): Promise<ResponseResult<T>> {
    appendConfig = appendConfig ? appendConfig : {}
    const config = Object.assign(this.getInsideConfig(), appendConfig)
    const service = axios.create(config)
    this.service = service
    this.interceptors(service)
    return service.request<T>(options)
  }

  get<T>(
    url: string,
    params?: any,
    appendCOnfig?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.requestMethodWithoutData<T>('get', url, params, appendCOnfig)
  }

  post<T>(
    url: string,
    data?: any,
    appendConfig?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.requestMethodWithData<T>('post', url, data, appendConfig)
  }

  requestMethodWithoutData<T>(
    method: Method,
    url: string,
    params?: any,
    appendConfig?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    params = params ? params : {}
    const options: AxiosRequestConfig = {
      url,
      method,
      params
    }
    return this.request<T>(options, appendConfig)
  }

  requestMethodWithData<T>(
    method: Method,
    url: string,
    data?: any,
    appendConfig?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    data = data ? data : {}
    const options: AxiosRequestConfig = {
      url,
      method,
      data
    }
    return this.request<T>(options, appendConfig)
  }

  removePending(key: string, isRequest: boolean): void {
    if (this.pending[key] && isRequest) {
      this.pending[key]('请求过于频繁')
    }
    delete this.pending[key]
  }
}

export default new Request()

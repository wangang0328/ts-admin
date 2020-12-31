import axios, { AxiosInstance, AxiosResponse } from 'axios'
//https://segmentfault.com/a/1190000023612000
interface ResObj<T> extends AxiosResponse<T> {
    code: number
    message: string
    data: any
}

const service: AxiosInstance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

//添加请求拦截器
service.interceptors.request.use((config)=>{
    config.headers.token = ' '
    return config
})

//添加响应拦截器
service.interceptors.response.use()

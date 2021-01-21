import axios from '@/util/request'
export interface UserInfo {
  _id: string
  nickName: string
  gender: number
  rules: string
  avatar: string
  phone: string
  location: string
  userId: string
  created: Date
  updated: Date
}

interface Captcha {
  captcha: string
  text: string
}

export interface LoginRequestData {
  userId: string
  pwd: string
  captcha: string
  sid: string
}

export function getCaptcha<T = Captcha>(sid: string) {
  return axios.get<T>('/getCaptcha', {
    sid
  })
}

export function login(data: LoginRequestData) {
  return axios.post('/user/common/login', data)
}

export function getUserInfo<T = UserInfo>() {
  return axios.get<T>('/user/getUserInfo')
}

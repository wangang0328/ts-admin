/*
 * @Author : wa
 * @Date : 2021-01-02 00:26:46
 */

import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
const sidKey = '__adminSid__'
const tokenKey = '__adminToken__'

export function getSid(): string {
  let sid = localStorage.getItem(sidKey) || ''
  if (!sid) {
    console.log(uuidv4)
    sid = uuidv4()
    localStorage.setItem(sidKey, sid)
  }
  return sid
}

export function getToken(): string {
  let token = Cookies.get(tokenKey) || ''
  token = token ? `Bearer ${token}` : ''
  return token
}

export function setToken(token: string): string {
  const expireDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
  Cookies.set(tokenKey, token, { expires: expireDate })
  return getToken()
}

export function removeToken(): void {
  Cookies.remove(tokenKey)
}

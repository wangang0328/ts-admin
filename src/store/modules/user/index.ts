/*
 * @Author : wa
 * @Date : 2021-01-02 12:10:44
 */
import { getUserInfo, UserInfo, LoginRequestData } from '@/api/user'
import { setToken, getToken, removeToken, getSid } from '@/util/auth'
import { login } from '@/api/user'

export interface UserState {
  userInfo: UserInfo | null
  token: string
  sid: string
  roles: string[]
}

//token userInfo
const state: UserState = {
  userInfo: null,
  token: getToken(),
  sid: getSid(),
  roles: []
}

const mutations = {
  setUserInfo(state: UserState, userInfo: UserInfo) {
    state.userInfo = userInfo
  },
  setRoles: (state: UserState, roles: string) => {
    state.roles = roles.split(',')
  },
  setToken(state: UserState, token: string) {
    state.token = token
  }
}

const actions = {
  resetToken({ commit }) {
    commit('setToken', '')
    commit('setRoles', [])
    removeToken()
  },
  login: async ({ commit }, data: LoginRequestData): Promise<string> => {
    try {
      const res = await login(data)
      setToken(res.token || '')
      commit('setToken', getToken())
      return new Promise(resolve => resolve('success'))
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async getInfo({ commit }): Promise<string> {
    try {
      const res = await getUserInfo()
      commit('setUserInfo', res.data)
      commit('setRoles', res.data.rules)
      res.token && setToken(res.token)
      return new Promise(resolve => resolve('success'))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

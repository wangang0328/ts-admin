/*
 * @Author : wa
 * @Date : 2020-12-27 22:23:28
 */
import { Module } from 'vuex'
import { Device, SidebarStatus, AppState } from './interface'
import { RootStateTypes } from '@/store/interface'

const state: AppState = {
  device: 'desktop',
  size: 0,
  sidebarStatus: 'opened'
}

const mutations = {
  toggleDevice: (state: AppState, device: Device) => {
    state.device = device
  },
  toggleSidebar: (state: AppState, status: SidebarStatus) => {
    state.sidebarStatus = status
  },
  closeSidebar: (state: AppState) => {
    state.sidebarStatus = 'closed'
  },
  setSize: (state: AppState, size: number) => {
    state[size] = size
  }
}

const namespaced = true
//第一个参数当前state定义，第二个根state定义
const appModule: Module<AppState, RootStateTypes> = {
  namespaced,
  state,
  mutations
}

export default appModule

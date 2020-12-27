import { AllStateTypes, RootStateTypes } from './interface'
import { createStore, useStore as baseUseStore } from 'vuex'
import app from './modules/app/index'
// import { InjectionKey } from 'vue'

export default createStore<RootStateTypes>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app
  }
})

// export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>()
}

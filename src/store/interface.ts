/*
 * @Author : wa
 * @Date : 2020-12-27 22:27:55
 */

import { AppState } from './modules/app/interface'

//root层state
export interface RootStateTypes {
  state?: string
}

//vuex所有state类型集成

export interface AllStateTypes extends RootStateTypes {
  app: AppState
}

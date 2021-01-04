/*
 * @Author : wa
 * @Date : 2020-12-27 22:27:55
 */

import { AppState } from './modules/app/interface'
import { UserState } from './modules/user/index'
//root层state
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootStateTypes {}

//vuex所有state类型集成

export interface AllStateTypes extends RootStateTypes {
  app: AppState
  user: UserState
}

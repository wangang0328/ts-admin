/*
 * @Author : wa
 * @Date : 2020-12-31 22:38:19
 */

//固定格式返回列表
export interface ResponseResult<T = any> {
  code: number
  message: string
  data: T
  total?: number
  token?: string
}

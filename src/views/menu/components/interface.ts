// export type OperateType = 'addBro' | 'addChild' | 'editNode' | 'delNode';
// export type OperatesType = 'menu' | 'resource';
export type MenuType = 'menu' | 'resource'
export type RequestMethod =
  | 'GET'
  | 'PSOT'
  | 'HEAD'
  | 'DELETE'
  | 'PUT'
  | 'PATCH'
  | 'OPTIONS'

export type OperateType = 'addBro' | 'addChild' | 'editNode' | 'delNode' | ''
export type ResourceType = 'api' | 'resource'
export type SourceType = 'api' | 'btn' //资源类型
export interface MenuOptions {
  name: string
  path: string
  requestType: string
  resourceType: string
  description?: string
}
export interface SourceForm {
  name: string
  type: SourceType
  method: RequestMethod
  path: string
  remark: string
}
export interface SourceData extends SourceForm {
  _id: string
}
export interface MenuForm {
  title: string
  name: string
  path: string
  component: string
  showInBread: boolean
  showInMenu: boolean
  isCache: boolean
  icon: string
  sort: number
  redirect: string
  type: MenuType
  children: MenuForm[]
  operations: SourceData[]
}

export interface MenuTreeData extends MenuForm {
  label?: string
  children: any[]
}

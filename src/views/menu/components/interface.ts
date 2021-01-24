// export type OperateType = 'addBro' | 'addChild' | 'editNode' | 'delNode';
// export type OperatesType = 'menu' | 'resource';
export type MenuType = 'menu' | 'resource'
export type RequestMethod =
  | 'GET'
  | 'get'
  | 'PSOT'
  | 'post'
  | 'head'
  | 'HEAD'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'

export type ResourceType = 'api' | 'resource'
export interface MenuOptions {
  name: string
  path: string
  requestType: string
  resourceType: string
  description?: string
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
  operations: any[]
}

export interface MenuTreeData extends MenuForm {
  label?: string
  children: any[]
}

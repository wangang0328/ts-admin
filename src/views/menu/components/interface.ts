export type MenuType = 'menu' | 'resource'

export interface MenuForm {
    title: string,
    name: string,
    path: string,
    component: string,
    showInBread: boolean,
    showInMenu: boolean,
    isCache: boolean,
    icon: string,
    sort: number,
    redirect: string,
    type: MenuType,
    operations: MenuForm []
}

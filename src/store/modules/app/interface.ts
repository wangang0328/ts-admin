export type Device = 'desktop' | 'mobile'
export type SidebarStatus = 'opened' | 'closed'

export interface AppState {
  device: Device
  size: number
  sidebarStatus: SidebarStatus
}

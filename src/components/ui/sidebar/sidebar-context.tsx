
import * as React from "react"
import { createContext } from "react"

export type SidebarState = "expanded" | "collapsed"
export const SIDEBAR_WIDTH = "260px"
export const SIDEBAR_WIDTH_COLLAPSED = "80px"
export const SIDEBAR_WIDTH_MOBILE = "80vw"
export const SIDEBAR_WIDTH_ICON = "4rem"
export const SIDEBAR_COOKIE_NAME = "sidebar-state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
export const SIDEBAR_KEYBOARD_SHORTCUT = ["meta", "b"]

export interface SidebarContextType {
  state: SidebarState
  setState: (state: SidebarState) => void
  toggleSidebar: () => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
)


import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  SidebarContext,
  SidebarContextType,
  SidebarState,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT
} from "./sidebar-context"

interface SidebarProviderProps {
  children: React.ReactNode
  defaultState?: SidebarState
  defaultHideNav?: boolean
  enableKeyboardShortcut?: boolean
  disableCollapseButton?: boolean
}

export function SidebarProvider({
  children,
  defaultState = "expanded",
  enableKeyboardShortcut = true,
}: SidebarProviderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [state, setState] = React.useState<SidebarState>(defaultState)
  const [openMobile, setOpenMobile] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
  }, [])

  // Set CSS variables for the sidebar width
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      state === "expanded" ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED
    )
    document.documentElement.style.setProperty(
      "--sidebar-width-collapsed",
      SIDEBAR_WIDTH_COLLAPSED
    )
    document.documentElement.style.setProperty(
      "--sidebar-width-icon",
      SIDEBAR_WIDTH_ICON
    )
  }, [state])

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        toggleSidebar,
        openMobile,
        setOpenMobile,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}


import * as React from "react"
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE, SIDEBAR_WIDTH_ICON } from "./sidebar-context"

type SidebarState = "expanded" | "collapsed" | "resizing"

type SidebarProviderProps = {
  /**
   * The default state of the sidebar. Used for initial render and SSR.
   * @default expanded
   */
  defaultState?: SidebarState
  /**
   * Whether to persist the sidebar state in localStorage.
   * @default true
   */
  persist?: boolean
}

type SidebarProviderState = {
  state: SidebarState
  setState: React.Dispatch<React.SetStateAction<SidebarState>>
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarProviderState | null>(null)

export function SidebarProvider({
  children,
  defaultState = "expanded",
  persist = true,
}: React.PropsWithChildren<SidebarProviderProps>) {
  const [state, setState] = React.useState<SidebarState>(() => {
    if (!persist) return defaultState
    try {
      const savedState = localStorage.getItem("sidebar-state")
      return savedState === "collapsed" ? "collapsed" : "expanded"
    } catch (e) {
      return defaultState
    }
  })
  const [isMobile, setIsMobile] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)

  React.useEffect(() => {
    if (persist) {
      try {
        localStorage.setItem("sidebar-state", state)
      } catch (e) {
        console.warn("Failed to save sidebar state to localStorage:", e)
      }
    }
  }, [state, persist])

  React.useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      if (!isMobileView && openMobile) setOpenMobile(false)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [openMobile])

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => (prev === "collapsed" ? "expanded" : "collapsed"))
  }, [])

  // Handle ESC key to close mobile sidebar
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openMobile) {
        setOpenMobile(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [openMobile])

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      <style>
        {`:root {
          --sidebar-width: ${SIDEBAR_WIDTH}px;
          --sidebar-width-mobile: ${SIDEBAR_WIDTH_MOBILE}px;
          --sidebar-width-icon: ${SIDEBAR_WIDTH_ICON}px;
        }`}
      </style>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar(): SidebarProviderState {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

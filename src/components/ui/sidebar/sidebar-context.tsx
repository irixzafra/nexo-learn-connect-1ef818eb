
import * as React from "react"

export const SIDEBAR_WIDTH = "var(--sidebar-width, 18rem)"
export const SIDEBAR_WIDTH_MOBILE = "var(--sidebar-width-mobile, 300px)"
export const SIDEBAR_WIDTH_ICON = "var(--sidebar-width-icon, 5rem)"

type SidebarState = "expanded" | "collapsed" | "floating"

/**
 * The following component helps set up the state for a sidebar.
 * This is useful for tracking sidebar interaction and state.
 */
const SidebarContext = React.createContext<{
  state: SidebarState
  setState: React.Dispatch<React.SetStateAction<SidebarState>>
  toggleSidebar: () => void
  triggerRef: React.RefObject<HTMLButtonElement>
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}>({
  state: "expanded",
  setState: () => {},
  toggleSidebar: () => {},
  triggerRef: { current: null },
  openMobile: false,
  setOpenMobile: () => {},
  isMobile: false,
})

/**
 * Use this provider to attach the sidebar state to your application.
 * It manages both the sidebar state and handles the resize observer.
 */
const SidebarProvider = ({
  children,
  defaultState = "expanded",
  mobileOpen = false,
}: {
  children: React.ReactNode
  defaultState?: SidebarState
  mobileOpen?: boolean
}) => {
  const [state, setState] = React.useState<SidebarState>(defaultState)
  const [openMobile, setOpenMobile] = React.useState(mobileOpen)
  const [isMobile, setIsMobile] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  // Toggle sidebar state between expanded and collapsed
  const toggleSidebar = React.useCallback(() => {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
  }, [])

  // Set isMobile state based on window width
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        toggleSidebar,
        triggerRef,
        openMobile,
        setOpenMobile,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export { SidebarContext, SidebarProvider }

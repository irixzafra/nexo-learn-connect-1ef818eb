
import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { 
  SidebarContext,
  SidebarContextType,
  SidebarState,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT
} from "./sidebar-context"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // Try to get saved state from cookie
    const getSavedState = React.useCallback(() => {
      if (typeof document === 'undefined') return defaultOpen;
      
      const cookies = document.cookie.split(';')
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === SIDEBAR_COOKIE_NAME) {
          return value === 'true'
        }
      }
      return defaultOpen
    }, [defaultOpen])

    // Initialize state with the saved value
    const [_open, _setOpen] = React.useState(() => getSavedState())
    
    // Controlled or uncontrolled open state
    const open = openProp !== undefined ? openProp : _open
    
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // Only update cookie in browser environment
        if (typeof document !== 'undefined') {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      [setOpenProp, open]
    )

    // Toggle sidebar function that handles mobile/desktop correctly
    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile(prevState => !prevState)
      } else {
        setOpen(prevState => !prevState)
      }
    }, [isMobile, setOpen])

    // Add keyboard shortcut to toggle sidebar
    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // Sidebar state for CSS styling
    const state: SidebarState = open ? "expanded" : "collapsed"

    // Create memoized context value
    const contextValue = React.useMemo<SidebarContextType>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={300}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-screen w-full bg-background",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
            
            {/* Expand button when sidebar is collapsed - desktop only */}
            {!isMobile && state === "collapsed" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed left-[60px] top-[50%] z-50 translate-y-[-50%]"
              >
                <Button
                  variant="primary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground opacity-0 shadow-md transition-opacity group-hover/sidebar-wrapper:opacity-100"
                  onClick={toggleSidebar}
                  aria-label="Expandir menú lateral"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

export { SidebarProvider }

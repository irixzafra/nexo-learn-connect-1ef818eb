
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

    // Try to get saved state from cookie - this is now wrapped in a function to avoid
    // reading cookies during render
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

    // Initialize state with a function to avoid re-computation on every render
    const [_open, _setOpen] = React.useState(() => getSavedState())
    
    // Controlled or uncontrolled open state
    const open = openProp !== undefined ? openProp : _open
    
    // Memoize setOpen to avoid recreating on every render
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // Only update cookie if in browser environment
        if (typeof document !== 'undefined') {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      [setOpenProp, open]
    )

    // Memoize toggleSidebar to avoid recreating on every render and prevent infinite loops
    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile(prevState => !prevState)
      } else {
        setOpen(prevState => !prevState)
      }
    }, [isMobile, setOpen])

    // Keyboard shortcut effect
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

    // We add a state so that we can do data-state="expanded" or "collapsed".
    const state: SidebarState = open ? "expanded" : "collapsed"

    // Memoize context value to avoid recreating on every render
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
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
            
            {/* Expand button when sidebar is collapsed */}
            {!isMobile && state === "collapsed" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-50"
              >
                <Button
                  variant="primary"
                  size="icon"
                  className="fixed left-[calc(var(--sidebar-width-icon)_-_14px)] top-[50%] translate-y-[-50%] h-9 w-9 rounded-full opacity-0 shadow-md bg-primary text-primary-foreground hover:bg-primary/90 group-hover/sidebar-wrapper:opacity-100 transition-all duration-300 z-50"
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

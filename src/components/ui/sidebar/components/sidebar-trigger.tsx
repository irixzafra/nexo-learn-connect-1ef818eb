
import * as React from "react"
import { Menu, PanelLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../use-sidebar"

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, state, openMobile, setOpenMobile } = useSidebar()
  const isCollapsed = state === "collapsed"
  const isMobile = React.useMemo(() => window.innerWidth < 768, [])

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200",
        isMobile && "absolute top-4 left-4 z-50",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        isMobile ? setOpenMobile(!openMobile) : toggleSidebar()
      }}
      aria-expanded={!isCollapsed}
      aria-label={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
      aria-controls="sidebar"
      {...props}
    >
      {isMobile ? (
        openMobile ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )
      ) : (
        <PanelLeft size={20} aria-hidden="true" />
      )}
      <span className="sr-only">{isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

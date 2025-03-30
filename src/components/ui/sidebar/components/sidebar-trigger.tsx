
import * as React from "react"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../use-sidebar"

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7 focus-visible:ring-2 focus-visible:ring-primary", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      aria-expanded={!isCollapsed}
      aria-label={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
      aria-controls="sidebar"
      {...props}
    >
      <PanelLeft aria-hidden="true" />
      <span className="sr-only">{isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"


import * as React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../use-sidebar"
import { NexoLogo } from '@/components/ui/logo'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, children, ...props }, ref) => {
  const { toggleSidebar, state, openMobile, setOpenMobile } = useSidebar()
  const isCollapsed = state === "collapsed"
  const isMobile = React.useMemo(() => window.innerWidth < 768, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={ref}
          data-sidebar="trigger"
          variant="outline"
          size="icon"
          className={cn("h-8 w-8 absolute top-4 left-4 z-[60] md:relative md:top-0 md:left-0 opacity-85 hover:opacity-100 transition-opacity shadow-sm hover:shadow bg-background/95 backdrop-blur-sm border border-border/50", className)}
          onClick={(event) => {
            onClick?.(event)
            isMobile ? setOpenMobile(!openMobile) : toggleSidebar()
          }}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
          aria-controls="sidebar"
          {...props}
        >
          <AnimatePresence mode="wait" initial={false}>
            {openMobile ? (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">{isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isCollapsed ? "Expandir menú" : "Colapsar menú"}</p>
      </TooltipContent>
    </Tooltip>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

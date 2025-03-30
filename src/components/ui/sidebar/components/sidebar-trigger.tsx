
import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../use-sidebar"
import { NexoLogo } from '@/components/ui/logo'
import { motion, AnimatePresence } from 'framer-motion'

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, children, ...props }, ref) => {
  const { toggleSidebar, state, openMobile, setOpenMobile } = useSidebar()
  const isCollapsed = state === "collapsed"
  const isMobile = React.useMemo(() => window.innerWidth < 768, [])

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 absolute top-4 left-4 z-[60] md:relative md:top-0 md:left-0 opacity-60 hover:opacity-100 transition-opacity", className)}
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
        {isMobile ? (
          <motion.div
            key="menu-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="sidebar-icon"
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
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

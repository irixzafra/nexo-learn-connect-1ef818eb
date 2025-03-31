
import * as React from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../use-sidebar"
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
      className={cn(
        "h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300",
        "fixed left-4 bottom-4 z-50 md:static md:left-auto md:bottom-auto md:z-auto",
        isMobile && "z-50",
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
      <AnimatePresence mode="wait" initial={false}>
        {isMobile ? (
          openMobile ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </motion.div>
          )
        ) : (
          isCollapsed ? (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="menu-icon"
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </motion.div>
          )
        )}
      </AnimatePresence>
      <span className="sr-only">{isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

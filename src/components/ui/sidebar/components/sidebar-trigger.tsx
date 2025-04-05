
import * as React from "react"
import { Menu, X, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "../sidebar-provider"
import { motion, AnimatePresence } from 'framer-motion'

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, children, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"
  
  const handleToggleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onClick) {
      onClick(e);
    }

    toggleSidebar();
  }, [toggleSidebar, onClick]);

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="outline"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-md bg-primary/10 text-foreground hover:bg-primary/20 transition-all duration-300 border-primary/20",
        "z-50 shadow-md",
        className
      )}
      onClick={handleToggleClick}
      aria-expanded={!isCollapsed}
      aria-label={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
      aria-controls="sidebar"
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          <motion.div
            key="menu-icon"
            initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="chevron-left"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

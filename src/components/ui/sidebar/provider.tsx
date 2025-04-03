
import { useMediaQuery } from "@/hooks/use-media-query"
import * as React from "react"
import type { KeyboardEvent } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_MOBILE,
  SidebarState,
} from "./sidebar-context"

export interface SidebarContextType {
  state: SidebarState
  setState: (state: SidebarState) => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | ((value: boolean) => void)
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
)

interface SidebarProviderProps {
  children: React.ReactNode
  defaultState?: SidebarState
  defaultOpen?: boolean
  onStateChange?: (state: SidebarState) => void
  enableHotkey?: boolean
}

export function SidebarProvider({
  children,
  defaultState = "expanded",
  defaultOpen = true,
  onStateChange,
  enableHotkey = true,
}: SidebarProviderProps) {
  const [state, setStateInternal] = useState<SidebarState>(defaultState)
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const [openMobile, setOpenMobile] = useState<boolean>(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const setState = (newState: SidebarState) => {
    setStateInternal(newState)
    setCookie(newState)
    onStateChange?.(newState)
  }

  const toggleSidebar = () => {
    const newState = state === "expanded" ? "collapsed" : "expanded"
    setState(newState)
  }

  // Set cookie when state changes
  const setCookie = (newState: SidebarState) => {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE};`
  }

  // Initialize state from cookie or localStorage
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
      ?.split("=")[1] as SidebarState | undefined

    if (cookieValue && (cookieValue === "expanded" || cookieValue === "collapsed")) {
      setStateInternal(cookieValue)
    }
  }, [])

  // Handle keyboard shortcut
  useHotkeys(
    Array.isArray(SIDEBAR_KEYBOARD_SHORTCUT) 
      ? SIDEBAR_KEYBOARD_SHORTCUT.join("+") 
      : SIDEBAR_KEYBOARD_SHORTCUT,
    (event: KeyboardEvent) => {
      if (enableHotkey) {
        event.preventDefault()
        toggleSidebar()
      }
    },
    { enableOnFormTags: false },
    [state, toggleSidebar, enableHotkey]
  )

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

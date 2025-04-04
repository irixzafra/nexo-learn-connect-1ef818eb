
import * as React from "react"
import { useSidebar as useOriginalSidebar } from "./sidebar-provider"

export function useSidebar() {
  return useOriginalSidebar()
}


"use client"

import * as React from "react"
import { Moon, Sun, Monitor, SquareCode, Palette } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
              <Palette className="absolute h-4 w-4 rotate-90 scale-0 transition-all nexo:rotate-0 nexo:scale-100 text-muted-foreground" />
              <span className="sr-only">Cambiar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" />
              <span>Oscuro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("nexo")} className="cursor-pointer">
              <Palette className="mr-2 h-4 w-4" />
              <span>Nexo</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
              <Monitor className="mr-2 h-4 w-4" />
              <span>Sistema</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("futuristic")} className="cursor-pointer">
              <SquareCode className="mr-2 h-4 w-4" />
              <span>Futurista</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Tema</p>
      </TooltipContent>
    </Tooltip>
  )
}


import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

export interface StyledAccordionItemProps {
  value: string
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
  defaultOpen?: boolean
  customIconColor?: string
  variant?: "default" | "outline" | "ghost"
}

export interface StyledAccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  className?: string
  variant?: "default" | "outline" | "ghost"
  gap?: "none" | "sm" | "md" 
  children: React.ReactNode
}

export const StyledAccordionItem = ({
  value,
  title,
  icon,
  children,
  className,
  description,
  customIconColor,
  variant = "default",
}: StyledAccordionItemProps) => {
  return (
    <AccordionItem
      value={value}
      className={cn(
        "overflow-hidden transition-all",
        variant === "outline" && "border rounded-lg mb-0 overflow-hidden",
        variant === "ghost" && "border-0 bg-transparent",
        className
      )}
    >
      <AccordionTrigger
        className={cn(
          "flex items-center justify-between w-full p-4 text-left",
          variant === "outline" && "hover:bg-muted/50",
          variant === "ghost" && "px-0 hover:bg-transparent",
          variant === "default" && "bg-secondary/30 rounded-lg hover:bg-secondary/40"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div 
              className={cn(
                "flex items-center justify-center flex-shrink-0",
                customIconColor ? customIconColor : "text-primary"
              )}
            >
              {icon}
            </div>
          )}
          <div>
            <div className="text-base font-medium">{title}</div>
            {description && (
              <div className="text-sm text-muted-foreground">{description}</div>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className={cn(
        "pt-1 pb-3 px-4",
        variant === "ghost" && "px-0"
      )}>
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}

export const StyledAccordion = ({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  variant = "default",
  gap = "md",
  children
}: StyledAccordionProps) => {
  // Create correct props based on type to fix TypeScript errors
  const accordionProps = type === "single" 
    ? {
        type: "single" as const,
        defaultValue: typeof defaultValue === 'string' ? defaultValue : undefined,
        collapsible,
      }
    : {
        type: "multiple" as const,
        defaultValue: Array.isArray(defaultValue) ? defaultValue : [],
      };

  return (
    <Accordion
      {...accordionProps}
      className={cn(
        "w-full",
        gap === "none" && "space-y-0 [&>*:not(:first-child)]:border-t-0",
        gap === "sm" && "space-y-1",
        gap === "md" && "space-y-2",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === StyledAccordionItem) {
          return React.cloneElement(child, {
            variant,
          } as Partial<StyledAccordionItemProps>);
        }
        return child;
      })}
    </Accordion>
  );
};


import * as React from "react"

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  actions,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={`space-y-1 ${className}`} {...props}>
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

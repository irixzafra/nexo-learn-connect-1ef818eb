
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// Define the props for SectionPageLayout
interface SectionPageLayoutProps {
  children: React.ReactNode;
  header?: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    breadcrumbs?: Array<{ title: string; href?: string }>;
  };
  className?: string;
  stats?: {
    stats: {
      label: string;
      value: string | number;
      icon?: React.ReactNode;
      color?: "primary" | "success" | "warning" | "destructive" | string;
      loading?: boolean;
    }[];
  };
  actions?: React.ReactNode;
}

// Define PageSection props
interface PageSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "default" | "card";
  className?: string;
  contentClassName?: string;
}

// Main SectionPageLayout component
const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({
  children,
  header,
  className,
  stats,
  actions
}) => {
  return (
    <div className={cn("container py-8 space-y-8 px-8", className)}>
      {/* Header Section */}
      {header && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {header.breadcrumbs && (
              <nav className="flex mb-2 text-sm">
                {header.breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="mx-2 text-muted-foreground">/</span>}
                    {crumb.href ? (
                      <a href={crumb.href} className="text-muted-foreground hover:text-foreground">
                        {crumb.title}
                      </a>
                    ) : (
                      <span className="font-medium">{crumb.title}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}
            <h1 className="text-2xl font-bold tracking-tight">{header.title}</h1>
            {header.description && <p className="text-muted-foreground">{header.description}</p>}
          </div>
          {(header.actions || actions) && (
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {header.actions || actions}
            </div>
          )}
        </div>
      )}

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

// StatCard Component
const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "primary" | "success" | "warning" | "destructive" | string;
  loading?: boolean;
}> = ({ label, value, icon, color = "primary", loading = false }) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case "primary": return "text-primary";
      case "success": return "text-emerald-500";
      case "warning": return "text-amber-500";
      case "destructive": return "text-destructive";
      default: return color.startsWith("text-") ? color : `text-${color}`;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {loading ? (
              <div className="h-7 w-20 bg-muted animate-pulse rounded" />
            ) : (
              <p className="text-2xl font-bold">{value}</p>
            )}
          </div>
          
          {icon && (
            <div className={cn("p-2 rounded-md", `bg-${color}/10`, getColorClass(color))}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// PageSection Component
export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  children,
  actions,
  variant = "default",
  className,
  contentClassName
}) => {
  if (variant === "card") {
    return (
      <Card className={cn("shadow-sm", className)}>
        {(title || description || actions) && (
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
              </div>
              {actions && <div>{actions}</div>}
            </div>
          </CardHeader>
        )}
        <CardContent className={cn("pt-0", contentClassName)}>
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <section className={cn("space-y-4", className)}>
      {(title || description || actions) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h2 className="text-xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
};

export default SectionPageLayout;


import React from 'react';
import { cn } from '@/lib/utils';

export interface PageSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'card';
  contentClassName?: string;
}

export interface SectionPageLayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: {
    title: string;
    description?: string;
    breadcrumbs?: Array<{ title: string; href?: string }>;
  };
  stats?: {
    stats: Array<{
      label: string;
      value: string;
      icon?: React.ReactNode;
      change?: { value: number; positive: boolean };
      loading?: boolean;
      color?: string;
    }>;
  };
  help?: {
    title: string;
    description: string;
    links: Array<{ text: string; href: string }>;
  };
}

// Add PageSection component first
export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  children,
  className,
  fullWidth = false,
  variant = 'default',
  contentClassName,
}) => {
  if (variant === 'card') {
    return (
      <div className={cn("bg-card text-card-foreground rounded-lg border shadow-sm", className)}>
        {(title || description) && (
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className={cn("p-6 pt-3", contentClassName)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <section className={cn("space-y-2", fullWidth ? "w-full" : "", className)}>
      {title && (
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
};

// Then the main SectionPageLayout component
const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({ 
  children,
  className,
  header,
  stats,
  help
}) => {
  return (
    <div className={cn("w-full", className)}>
      {header && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{header.title}</h1>
          {header.description && <p className="text-muted-foreground mt-1">{header.description}</p>}
          {header.breadcrumbs && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              {header.breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:underline">{crumb.title}</a>
                  ) : (
                    <span>{crumb.title}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
      
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.stats.map((stat, index) => (
            <div key={index} className="bg-card p-4 rounded-lg border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                  {stat.change && (
                    <p className={cn("text-xs mt-1", stat.change.positive ? "text-green-500" : "text-red-500")}>
                      {stat.change.positive ? "+" : "-"}{stat.change.value}%
                    </p>
                  )}
                </div>
                {stat.icon && <div className={cn("p-2 rounded-full", stat.color ? `text-${stat.color}` : "text-primary")}>{stat.icon}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className={cn("w-full", help ? "lg:w-3/4" : "")}>
          {children}
        </div>
        
        {help && (
          <div className="w-full lg:w-1/4">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-medium mb-2">{help.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{help.description}</p>
              <div className="space-y-2">
                {help.links.map((link, index) => (
                  <a key={index} href={link.href} className="block text-sm text-primary hover:underline">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionPageLayout;

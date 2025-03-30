
import React from 'react';
import { cn } from '@/lib/utils';
import { PageStatsProps } from '@/components/layout/page/PageStats';
import PageStats from '@/components/layout/page/PageStats';

export interface PageSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'card';
  contentClassName?: string;
}

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
      <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
        {(title || description) && (
          <div className="flex flex-col space-y-1.5 p-6">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className={cn("p-6 pt-0", contentClassName)}>{children}</div>
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

// Interfaces para soporte de ayuda y migas de pan
export interface HelpLink {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface HelpProps {
  title: string;
  description: string;
  links: HelpLink[];
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface SectionPageLayoutProps {
  header: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
  };
  stats?: PageStatsProps;
  help?: HelpProps;
  children: React.ReactNode;
  className?: string;
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({
  header,
  stats,
  help,
  children,
  className,
}) => {
  return (
    <div className={cn("container mx-auto px-4 py-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {header.breadcrumbs && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              {header.breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-primary">
                      {crumb.title}
                    </a>
                  ) : (
                    <span>{crumb.title}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-bold">{header.title}</h1>
          {header.description && (
            <p className="mt-1 text-muted-foreground">{header.description}</p>
          )}
        </div>
        {header.actions && (
          <div className="flex flex-wrap items-center gap-3">{header.actions}</div>
        )}
      </div>

      {/* Stats */}
      {stats && <PageStats {...stats} />}

      {/* Help Section */}
      {help && (
        <div className="bg-muted/30 rounded-lg p-6 border">
          <h3 className="text-lg font-medium mb-2">{help.title}</h3>
          <p className="text-muted-foreground mb-4">{help.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {help.links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex flex-col p-4 bg-background rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <span className="font-medium">{link.title}</span>
                <span className="text-sm text-muted-foreground">{link.description}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default SectionPageLayout;

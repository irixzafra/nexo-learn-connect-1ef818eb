
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

interface SectionPageLayoutProps {
  header: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
  };
  stats?: PageStatsProps;
  children: React.ReactNode;
  className?: string;
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({
  header,
  stats,
  children,
  className,
}) => {
  return (
    <div className={cn("container mx-auto px-4 py-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
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

      {/* Main Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default SectionPageLayout;

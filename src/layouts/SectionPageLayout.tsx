
import React from 'react';
import { cn } from '@/lib/utils';
import PageHeader, { PageHeaderProps } from '@/components/layout/page/PageHeader';
import PageStats, { PageStatsProps } from '@/components/layout/page/PageStats';
import PageFilters, { PageFiltersProps } from '@/components/layout/page/PageFilters';
import PageContent from '@/components/layout/page/PageContent';
import PageHelp, { PageHelpProps } from '@/components/layout/page/PageHelp';

export interface SectionPageLayoutProps {
  header: PageHeaderProps;
  stats?: PageStatsProps;
  filters?: PageFiltersProps;
  help?: PageHelpProps;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  sidebarPosition?: 'right' | 'none';
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({
  header,
  stats,
  filters,
  help,
  children,
  className,
  contentClassName,
  sidebarPosition = 'right',
}) => {
  return (
    <div className={cn("container mx-auto px-4 py-6 md:py-8", className)}>
      {/* Header Section */}
      <PageHeader {...header} />

      {/* Stats Section - Now displays up to 4 stats on desktop */}
      {stats && (
        <div className="mt-6">
          <PageStats {...stats} />
        </div>
      )}

      {/* Filters Section */}
      {filters && (
        <div className="mt-6">
          <PageFilters {...filters} />
        </div>
      )}

      {/* Content Section with optional sidebar - Maintaining 2 columns max */}
      <div className={cn(
        "mt-6 grid gap-6",
        sidebarPosition === 'right' && help ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
      )}>
        {/* Main Content */}
        <div className={cn(
          sidebarPosition === 'right' && help ? "lg:col-span-1" : "w-full"
        )}>
          <PageContent className={contentClassName}>
            {children}
          </PageContent>
        </div>

        {/* Help Sidebar */}
        {help && sidebarPosition === 'right' && (
          <div className="lg:col-span-1">
            <PageHelp {...help} />
          </div>
        )}
      </div>
    </div>
  );
};

export { default as PageSection } from '@/components/layout/page/PageSection';
export type { PageSectionProps } from '@/components/layout/page/PageSection';

export default SectionPageLayout;

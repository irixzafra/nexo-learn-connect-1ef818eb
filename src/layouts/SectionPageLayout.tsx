import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import PageStats, { StatItem } from '@/components/layout/page/PageStats';
import PageFilters, { FilterOption } from '@/components/layout/page/PageFilters';
import PageHelp, { HelpLink } from '@/components/layout/page/PageHelp';

interface Breadcrumb {
  title: string;
  href?: string;
}

interface Action {
  label?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
  tooltip?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

interface PageSectionProps {
  variant?: 'default' | 'card';
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

interface SectionPageLayoutProps {
  header: {
    title: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    actions?: Action[];
  };
  stats?: {
    stats: StatItem[];
  };
  filters?: {
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filterOptions?: FilterOption[];
    onApplyFilters?: () => void;
    onResetFilters?: () => void;
    filterCount?: number;
  };
  help?: {
    title?: string;
    description?: string;
    links?: HelpLink[];
    icon?: React.ReactNode;
  };
  children: React.ReactNode;
}

export const PageSection: React.FC<PageSectionProps> = ({
  variant = 'default',
  title,
  description,
  children,
  className,
}) => {
  if (variant === 'card') {
    return (
      <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}>
        {title && (
          <div className="flex flex-col space-y-1.5 p-6 pb-0">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {title && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({ 
  header, 
  stats, 
  filters, 
  help, 
  children 
}) => {
  const { title, description, breadcrumbs, actions } = header;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center text-sm text-muted-foreground">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              {breadcrumb.href ? (
                <Link to={breadcrumb.href} className="hover:text-foreground">
                  {breadcrumb.title}
                </Link>
              ) : (
                <span>{breadcrumb.title}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>

        {actions && actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {actions.map((action, i) => {
              const ButtonComponent = (
                <Button
                  key={i}
                  variant={action.variant}
                  size={action.size}
                  disabled={action.disabled}
                  onClick={action.onClick}
                  asChild={!!action.href}
                >
                  {action.href ? (
                    <Link to={action.href}>
                      {action.icon}
                      {action.label && <span>{action.label}</span>}
                    </Link>
                  ) : (
                    <>
                      {action.icon}
                      {action.label && <span>{action.label}</span>}
                    </>
                  )}
                </Button>
              );

              return action.tooltip ? (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    {ButtonComponent}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{action.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                ButtonComponent
              );
            })}
          </div>
        )}
      </div>

      {stats && (
        <div className="mt-6">
          <PageStats stats={stats.stats} />
        </div>
      )}

      {filters && (
        <div className="mt-6">
          <PageFilters 
            searchPlaceholder={filters.searchPlaceholder}
            searchValue={filters.searchValue}
            onSearchChange={filters.onSearchChange}
            filterOptions={filters.filterOptions}
            onApplyFilters={filters.onApplyFilters}
            onResetFilters={filters.onResetFilters}
            filterCount={filters.filterCount}
          />
        </div>
      )}

      <main>{children}</main>

      {help && (
        <div className="mt-8">
          <PageHelp
            title={help.title}
            description={help.description}
            links={help.links}
            icon={help.icon}
          />
        </div>
      )}
    </div>
  );
};

export default SectionPageLayout;

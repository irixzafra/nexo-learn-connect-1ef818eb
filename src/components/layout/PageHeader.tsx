
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import OnboardingTrigger from '@/components/onboarding/OnboardingTrigger';
import { useOnboarding } from '@/hooks/useOnboarding';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  showOnboarding?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs = [],
  actions,
  showOnboarding = false,
}) => {
  const { startOnboarding } = useOnboarding();

  return (
    <div className="pb-4 mb-6 border-b">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="ml-1 text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showOnboarding && (
            <OnboardingTrigger
              onActivate={startOnboarding}
              size="sm"
              variant="outline"
            />
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

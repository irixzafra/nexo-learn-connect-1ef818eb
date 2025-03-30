
import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  href: string;
  label: string;
  current?: boolean;
}

export interface SectionPageLayoutProps {
  pageTitle?: string;
  title?: string; // For backward compatibility
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  backLink?: string;
  backLabel?: string;
  onBack?: () => void;
  variant?: 'default' | 'narrow' | 'wide';
  breadcrumbs?: Breadcrumb[];
  contentClassName?: string;
}

export interface PageSectionProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'card' | 'bordered' | 'transparent';
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({
  pageTitle,
  title,
  subtitle,
  description,
  icon,
  actions,
  children,
  backLink,
  backLabel = 'Volver',
  onBack,
  variant = 'default',
  breadcrumbs,
  contentClassName = '',
}) => {
  // For backward compatibility, use title as pageTitle if pageTitle is not provided
  const finalTitle = pageTitle || title;
  
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        {/* Back button or breadcrumbs */}
        {(backLink || onBack || breadcrumbs) && (
          <div className="mb-4">
            {backLink && (
              <Link to={backLink}>
                <Button variant="ghost" size="sm" className="gap-1 pl-0">
                  <ArrowLeft className="h-4 w-4" />
                  {backLabel}
                </Button>
              </Link>
            )}
            
            {onBack && !backLink && (
              <Button variant="ghost" size="sm" className="gap-1 pl-0" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Button>
            )}
            
            {breadcrumbs && (
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  {breadcrumbs.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                      )}
                      {item.current ? (
                        <span className="text-sm font-medium text-primary">{item.label}</span>
                      ) : (
                        <Link 
                          to={item.href} 
                          className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        )}
        
        {/* Title and subtitle */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {finalTitle && (
              <h1 className="text-2xl font-bold tracking-tight">{finalTitle}</h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
            {description && subtitle == null && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex flex-wrap gap-2 justify-end">
              {actions}
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
};

// PageSection component for dividing the page into multiple sections
export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  variant = 'default',
  actions,
  className = '',
  children,
}) => {
  const containerClassName = {
    default: 'space-y-4',
    card: 'bg-card text-card-foreground rounded-lg border shadow-sm p-6 space-y-4',
    bordered: 'border rounded-lg p-6 space-y-4',
    transparent: 'space-y-4',
  }[variant];
  
  return (
    <section className={`${containerClassName} ${className}`}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
            {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
          </div>
          
          {actions && (
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div>
        {children}
      </div>
    </section>
  );
};

export default SectionPageLayout;

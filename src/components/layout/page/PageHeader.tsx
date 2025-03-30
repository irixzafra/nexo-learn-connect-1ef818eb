
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Breadcrumb {
  title: string;
  href?: string;
}

export interface PageAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: PageAction[];
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/" className="flex items-center hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5 mr-1" />
            <span className="sr-only">Inicio</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-3.5 w-3.5 mx-1" />
              {crumb.href ? (
                <Link 
                  to={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.title}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.title}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Header content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </motion.div>

        {actions && actions.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mt-2 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {actions.map((action, index) => {
              const buttonContent = (
                <>
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </>
              );
              
              return action.href ? (
                <Button 
                  key={index} 
                  variant={action.variant || "default"}
                  asChild
                  disabled={action.disabled}
                >
                  <Link to={action.href}>{buttonContent}</Link>
                </Button>
              ) : (
                <Button 
                  key={index} 
                  variant={action.variant || "default"} 
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  {buttonContent}
                </Button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

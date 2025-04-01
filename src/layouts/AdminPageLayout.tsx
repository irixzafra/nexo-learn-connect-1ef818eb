
import React, { ReactNode } from 'react';
import AppLayout from './AppLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';

// Add AdminSubMenuItem interface for the navigationItems prop
export interface AdminSubMenuItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface AdminPageLayoutProps {
  children?: ReactNode;
  title: string;
  subtitle?: string;
  backAction?: {
    label: string;
    onClick: () => void;
  };
  actions?: ReactNode;
  // Add support for tabs
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
  // Add support for navigation items
  navigationItems?: AdminSubMenuItem[];
  baseRoute?: string;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  title,
  subtitle,
  backAction,
  actions,
  tabs,
  defaultTabValue,
  navigationItems,
  baseRoute
}) => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            {backAction && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2" 
                onClick={backAction.onClick}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {backAction.label}
              </Button>
            )}
            
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
        
        {/* Render sub navigation if navigationItems are provided */}
        {navigationItems && navigationItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {navigationItems.map((item) => (
              <Button 
                key={item.title} 
                variant="outline" 
                size="sm"
                asChild
              >
                <a href={`${baseRoute || ''}${item.path}`}>
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </a>
              </Button>
            ))}
          </div>
        )}
        
        {tabs ? (
          <AdminNavTabs 
            tabs={tabs} 
            defaultValue={defaultTabValue || tabs[0]?.value} 
          >
            {children}
          </AdminNavTabs>
        ) : (
          children
        )}
      </div>
    </AppLayout>
  );
};

export default AdminPageLayout;

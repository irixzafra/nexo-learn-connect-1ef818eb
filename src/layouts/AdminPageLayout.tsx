
import React from 'react';
import { Toaster } from 'sonner';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  navigationItems?: AdminSubMenuItem[];
  baseRoute?: string;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  tabs = [],
  defaultTabValue,
  children,
  actions,
  navigationItems = [],
  baseRoute,
}) => {
  return (
    <div className="flex-1 w-full">
      <div className="container max-w-full mx-auto space-y-4 p-4 md:p-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {actions}
            </div>
          )}
        </header>
        
        {navigationItems && navigationItems.length > 0 && baseRoute && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {navigationItems.map((item, index) => (
                <a 
                  key={index}
                  href={`${baseRoute}${item.path}`}
                  className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {tabs.length > 0 ? (
          <>
            <nav className="bg-muted/30 py-1 border-b">
              <AdminNavTabs
                tabs={tabs}
                defaultValue={defaultTabValue || tabs[0]?.value}
              />
            </nav>
            {children}
          </>
        ) : (
          children
        )}
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminPageLayout;

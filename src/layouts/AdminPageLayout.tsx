
import React from 'react';
import AppLayout from './AppLayout';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import FloatingEditModeToggle from '@/components/admin/FloatingEditModeToggle';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  subMenuItems?: AdminSubMenuItem[];
  baseRoute?: string;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  tabs = [],
  defaultTabValue,
  children,
  actions,
  subMenuItems,
  baseRoute
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
      
      <FloatingEditModeToggle />
    </div>
  );
};

export default AdminPageLayout;

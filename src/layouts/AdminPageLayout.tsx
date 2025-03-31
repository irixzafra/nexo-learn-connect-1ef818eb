
import React from 'react';
import AppLayout from './AppLayout';
import { Card } from '@/components/ui/card';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import FloatingEditModeToggle from '@/components/admin/FloatingEditModeToggle';
import AdminSubMenu, { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  return (
    <AppLayout>
      <div className="w-full px-0 py-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 flex-wrap">
                {actions}
              </div>
            )}
          </div>

          {subMenuItems && subMenuItems.length > 0 && (
            <AdminSubMenu 
              items={subMenuItems} 
              baseRoute={baseRoute || location.pathname}
            />
          )}

          {tabs && tabs.length > 0 ? (
            <AdminNavTabs
              tabs={tabs}
              defaultValue={defaultTabValue || tabs[0]?.value}
            />
          ) : (
            <Card className="p-6 shadow-sm mx-4">{children}</Card>
          )}
        </div>
      </div>
      
      <FloatingEditModeToggle />
    </AppLayout>
  );
};

export default AdminPageLayout;


import React from 'react';
import AppLayout from './AppLayout';
import { Card } from '@/components/ui/card';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import FloatingEditModeToggle from '@/components/admin/FloatingEditModeToggle';
import { useLocation } from 'react-router-dom';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
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
  const location = useLocation();
  const { designFeatureEnabled } = useDesignSystem();
  
  return (
    <AppLayout showHeader={false} showAdminNavigation={false}>
      <div className="flex-1 max-w-full p-6">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            
            {actions && (
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {actions}
              </div>
            )}
          </div>
          
          {tabs && tabs.length > 0 ? (
            <>
              <div className="bg-muted/30 px-0 py-1 border-b">
                <AdminNavTabs
                  tabs={tabs}
                  defaultValue={defaultTabValue || tabs[0]?.value}
                />
              </div>
              <div className="px-4">
                {children}
              </div>
            </>
          ) : (
            <Card className="p-6 shadow-sm">{children}</Card>
          )}
        </div>
      </div>
      
      <FloatingEditModeToggle />
    </AppLayout>
  );
};

export default AdminPageLayout;

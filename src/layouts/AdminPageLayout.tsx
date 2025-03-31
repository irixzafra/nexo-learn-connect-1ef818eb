
import React from 'react';
import AppLayout from './AppLayout';
import { Card } from '@/components/ui/card';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  tabs = [],
  defaultTabValue,
  children,
  actions
}) => {
  return (
    <AppLayout>
      <div className="w-full px-2 py-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
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

          {tabs && tabs.length > 0 ? (
            <AdminNavTabs
              tabs={tabs}
              defaultValue={defaultTabValue || tabs[0]?.value}
            />
          ) : (
            <Card className="p-6 shadow-sm">{children}</Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPageLayout;

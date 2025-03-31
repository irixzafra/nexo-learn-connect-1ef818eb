
import React from 'react';
import AppLayout from './AppLayout';
import { Card } from '@/components/ui/card';
import AdminTabs, { AdminTabItem } from '@/components/admin/AdminTabs';

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  tabs: AdminTabItem[];
  defaultTabValue?: string;
  children?: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  tabs,
  defaultTabValue,
  children
}) => {
  return (
    <AppLayout>
      <div className="container mx-auto px-[2%]">
        <div className="space-y-6 py-4">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {tabs.length > 0 ? (
            <AdminTabs
              tabs={tabs}
              defaultValue={defaultTabValue || tabs[0].value}
            />
          ) : (
            <Card className="p-4">{children}</Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPageLayout;

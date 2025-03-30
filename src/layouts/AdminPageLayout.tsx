
import React from 'react';
import AdminTabs, { AdminTabItem } from '@/components/admin/AdminTabs';

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  tabs: AdminTabItem[];
  defaultTabValue: string;
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
    <div className="container mx-auto px-4 py-6 md:py-8 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        )}
      </div>
      
      {/* Tabs Navigation */}
      <AdminTabs 
        tabs={tabs} 
        defaultValue={defaultTabValue} 
      />
      
      {/* Additional content outside tabs if provided */}
      {children}
    </div>
  );
};

export default AdminPageLayout;

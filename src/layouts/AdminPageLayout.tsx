
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import SectionTag from '@/components/layout/SectionTag';

interface AdminPageLayoutProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  backLink?: string;
  backAction?: () => void;
  actions?: React.ReactNode;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  title,
  subtitle,
  backLink,
  backAction,
  actions,
  tabs,
  defaultTabValue
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTabValue || (tabs && tabs.length > 0 ? tabs[0].value : ''));
  
  const handleBack = () => {
    if (backAction) {
      backAction();
    } else if (backLink) {
      navigate(backLink);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="min-h-screen bg-muted/20 p-6 md:p-8 relative">
      <SectionTag name="AdminPageLayout" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between relative">
            <SectionTag name="AdminHeader" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 relative">
                <SectionTag name="AdminActions" />
                {actions}
              </div>
            )}
          </div>
          
          {/* Tabs or Direct Content */}
          {tabs ? (
            <div className="relative">
              <SectionTag name="AdminTabs" />
              <AdminNavTabs 
                tabs={tabs}
                value={activeTab} 
                onValueChange={setActiveTab}
                contentClassName="bg-background rounded-md border p-4 shadow-sm"
              />
            </div>
          ) : (
            <div className="bg-background rounded-md border p-6 shadow-sm relative">
              <SectionTag name="AdminContent" />
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;

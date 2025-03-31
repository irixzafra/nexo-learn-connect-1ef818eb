
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';

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
    <div className="min-h-screen bg-muted/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {subtitle && (
                  <p className="text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
          
          {/* Tabs or Direct Content */}
          {tabs ? (
            <AdminNavTabs 
              tabs={tabs}
              value={activeTab} 
              onValueChange={setActiveTab}
              contentClassName="bg-background rounded-md border p-4 shadow-sm"
            />
          ) : (
            <div className="bg-background rounded-md border p-6 shadow-sm">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;

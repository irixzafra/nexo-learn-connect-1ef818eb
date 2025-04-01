
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import AdminNavigation from '@/components/admin/AdminNavigation';

interface AdminPageLayoutProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  title,
  subtitle,
  tabs,
  defaultTabValue,
  actions,
  className,
  contentClassName,
  id = 'admin-page'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTabValue);
  
  // Handle tab changes via URL
  useEffect(() => {
    if (tabs && defaultTabValue && location.pathname.includes(defaultTabValue)) {
      setActiveTab(defaultTabValue);
    }
  }, [location.pathname, defaultTabValue, tabs]);
  
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    
    // Update URL if the tab has a route
    const selectedTab = tabs?.find(tab => tab.value === tabValue);
    if (selectedTab && selectedTab.route) {
      navigate(selectedTab.route);
    }
  };
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AdminNavigation />
        
        <div className="flex-1 max-w-full">
          <div className={cn("container mx-auto py-6 space-y-6", className)}>
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
            
            {tabs ? (
              <Tabs
                defaultValue={defaultTabValue}
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
                id={id}
              >
                <div className="border-b">
                  <TabsList className="w-full justify-start overflow-auto mb-0 rounded-none border-b-0">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                        data-tag={tab.dataTag}
                      >
                        {tab.icon && tab.icon}
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <div className={cn("mt-4", contentClassName)}>
                  {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className={tab.className}>
                      {tab.content}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            ) : (
              <div className={contentClassName}>{children}</div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPageLayout;

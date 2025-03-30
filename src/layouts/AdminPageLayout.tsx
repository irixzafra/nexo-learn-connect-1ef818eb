
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminTabItem } from '@/components/admin/AdminTabs';
import AdminNavigation from '@/components/admin/AdminNavigation';
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent } from '@/components/ui/sidebar';

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

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
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
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-muted/20">
        {/* Barra lateral colapsable */}
        <Sidebar className="border-r" collapsible="icon">
          <SidebarContent className="py-2">
            {/* El componente AdminNavigation se usa dentro del Sidebar */}
            <AdminNavigation />
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          {/* Botón para mostrar/ocultar la barra lateral en móviles */}
          <div className="md:hidden flex items-center p-4">
            <SidebarTrigger className="mr-4" />
          </div>
          
          <div className="max-w-7xl w-full mx-auto p-8">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
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
              
              {/* Tabs or Direct Content */}
              {tabs ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="bg-background">
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                        {tab.icon}
                        <span>{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="bg-background rounded-md border p-6 shadow-sm">
                      {tab.content}
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="bg-background rounded-md border p-6 shadow-sm">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPageLayout;

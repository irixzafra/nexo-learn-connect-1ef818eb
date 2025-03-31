
import React, { useEffect } from 'react';
import AppLayout from './AppLayout';
import { Card } from '@/components/ui/card';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import FloatingEditModeToggle from '@/components/admin/FloatingEditModeToggle';
import AdminSubMenu, { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';
import { useLocation } from 'react-router-dom';
import { useDesignSystem } from '@/contexts/DesignSystemContext';

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
  
  // Filtrar submenú según funcionalidades activadas
  const filteredSubMenuItems = subMenuItems?.filter(item => {
    // Si el elemento tiene la property requiresFeature, solo mostrarlo si la correspondiente feature está activa
    if (item.requiresFeature === 'designSystem') {
      return designFeatureEnabled;
    }
    // Por defecto, mostrar todos los elementos que no tienen restricciones
    return true;
  });
  
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

          {filteredSubMenuItems && filteredSubMenuItems.length > 0 && (
            <AdminSubMenu 
              items={filteredSubMenuItems} 
              baseRoute={baseRoute || location.pathname}
            />
          )}

          {tabs && tabs.length > 0 ? (
            <div className="bg-muted/30 px-0 py-1 border-b">
              <AdminNavTabs
                tabs={tabs}
                defaultValue={defaultTabValue || tabs[0]?.value}
              />
            </div>
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

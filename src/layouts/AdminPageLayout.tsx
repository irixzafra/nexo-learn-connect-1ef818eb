
import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  children?: ReactNode; // Making children optional
  backHref?: string;
  actions?: ReactNode;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
  navigationItems?: AdminSubMenuItem[];
  baseRoute?: string;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  children,
  backHref = '/app/admin/dashboard',
  actions,
  tabs,
  defaultTabValue,
  navigationItems,
  baseRoute
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => navigate(backHref)}
              aria-label="Volver"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          </div>
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
      
      {/* Render tabs if provided */}
      {tabs && defaultTabValue && (
        <AdminNavTabs 
          tabs={tabs} 
          defaultValue={defaultTabValue} 
        />
      )}
      
      {/* Only render the children container if there are children */}
      {children && (
        <div className="pb-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default AdminPageLayout;

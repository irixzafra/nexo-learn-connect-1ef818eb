
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { LucideIcon } from 'lucide-react';

interface AdminPageTitleProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export const AdminPageTitle: React.FC<AdminPageTitleProps> = ({ 
  title, 
  description, 
  icon, 
  actions 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
    </div>
  );
};

interface AdminTabProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface AdminTabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabs: AdminTabProps[];
  className?: string;
}

export const AdminTabs: React.FC<AdminTabsProps> = ({ 
  defaultValue, 
  value, 
  onValueChange, 
  tabs,
  className = ""
}) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      value={value}
      onValueChange={onValueChange}
      className={`w-full ${className}`}
    >
      <TabsList className="w-full sm:w-auto flex overflow-auto">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {tab.icon}
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <Outlet />
    </Tabs>
  );
};

interface AdminCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({ 
  title, 
  description, 
  children, 
  actions,
  className = ""
}) => {
  return (
    <Card className={`shadow-sm ${className}`}>
      {(title || description || actions) && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

interface AdminTableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminTableHead: React.FC<AdminTableHeadProps> = ({ 
  children,
  className = ""
}) => {
  return (
    <th className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground tracking-tight ${className}`}>
      {children}
    </th>
  );
};

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {children}
    </div>
  );
};


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface AdminSubMenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
}

interface AdminSubMenuProps {
  items: AdminSubMenuItem[];
  baseRoute: string;
  className?: string;
}

const AdminSubMenu: React.FC<AdminSubMenuProps> = ({ 
  items, 
  baseRoute,
  className 
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  if (!items || items.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("w-full border-b bg-background/95 backdrop-blur-sm sticky top-[49px] z-30", className)}>
      <div className="mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-1">
          {items.map((item) => {
            const isActive = currentPath.includes(`${baseRoute}/${item.id}`);
            const path = item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.id}
                to={path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap",
                  "hover:bg-accent/50 transition-colors",
                  isActive ? "bg-blue-600/10 text-blue-600" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSubMenu;

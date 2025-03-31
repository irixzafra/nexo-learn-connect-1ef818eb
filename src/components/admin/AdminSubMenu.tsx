
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { GripVertical, Pencil } from 'lucide-react';

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
  const { isEditMode } = useEditMode();
  const [menuItems, setMenuItems] = React.useState<AdminSubMenuItem[]>(items);
  
  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  const handleMenuItemEdit = (index: number) => {
    if (!isEditMode) return;

    const item = menuItems[index];
    const newLabel = prompt("Editar etiqueta:", item.label);
    
    if (newLabel !== null && newLabel.trim() !== "") {
      const updatedItems = [...menuItems];
      updatedItems[index] = {
        ...item,
        label: newLabel
      };
      setMenuItems(updatedItems);
    }
  };
  
  return (
    <div className={cn("w-full border-b bg-background/95 backdrop-blur-sm sticky top-[49px] z-30", className)}>
      <div className="mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-1 py-1">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path || 
                            (item.path !== baseRoute && currentPath.includes(item.path));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap",
                  "hover:bg-accent/50 transition-colors",
                  isActive ? "bg-blue-600/10 text-blue-600" : "text-muted-foreground",
                  isEditMode && "group relative"
                )}
              >
                <Icon className="h-4 w-4" />
                <span 
                  onClick={isEditMode ? (e) => {
                    e.preventDefault();
                    handleMenuItemEdit(index);
                  } : undefined}
                  className={isEditMode ? "cursor-pointer hover:text-primary" : ""}
                >
                  {item.label}
                </span>
                
                {isEditMode && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-background/70 rounded-md">
                    <Pencil className="h-3 w-3 text-primary" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSubMenu;

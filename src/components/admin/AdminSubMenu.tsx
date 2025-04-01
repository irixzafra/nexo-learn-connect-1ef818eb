
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';

export interface AdminSubMenuItem {
  title: string;
  path: string;
  onClick?: () => void;
}

interface AdminSubMenuProps {
  items: AdminSubMenuItem[];
  baseRoute: string;
  className?: string;
  allowReorder?: boolean;
}

const AdminSubMenu: React.FC<AdminSubMenuProps> = ({
  items,
  baseRoute,
  className,
  allowReorder = false,
}) => {
  const location = useLocation();
  const { isEditMode } = useEditMode();
  
  const isActive = (path: string) => {
    const fullPath = `${baseRoute}${path}`;
    return location.pathname === fullPath;
  };

  return (
    <div className={cn('flex flex-wrap gap-2 mb-6', className)}>
      {items.map((item) => (
        <Button
          key={item.path}
          variant={isActive(item.path) ? 'default' : 'outline'}
          size="sm"
          className="rounded-md"
          asChild={!item.onClick}
          onClick={item.onClick}
        >
          {item.onClick ? (
            <span>{item.title}</span>
          ) : (
            <Link to={`${baseRoute}${item.path}`}>{item.title}</Link>
          )}
        </Button>
      ))}

      {allowReorder && isEditMode && (
        <Button
          variant="outline"
          size="sm"
          className="rounded-md ml-auto gap-1.5"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span>Reordenar</span>
        </Button>
      )}
    </div>
  );
};

export default AdminSubMenu;

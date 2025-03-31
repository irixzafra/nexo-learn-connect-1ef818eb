
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface AdminMenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  description?: string;
  badge?: string | number;
}

interface AdminMenuProps {
  items: AdminMenuItem[];
  variant?: 'default' | 'buttons' | 'cards' | 'sidebar';
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  items,
  variant = 'default',
  columns = 1,
  className,
}) => {
  // Determinar el grid de columnas basado en el parámetro
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  // Estilos específicos por variante
  if (variant === 'buttons') {
    return (
      <div className={cn("flex flex-col space-y-2", className)}>
        {items.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className="flex items-center justify-between w-full p-3 text-left border rounded-md hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-md bg-primary/10 p-2 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
            </div>
            {item.badge && (
              <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex flex-col items-center justify-center p-4 text-center rounded-lg border hover:bg-accent hover-lift transition-all"
          >
            <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium">{item.label}</h3>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            )}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={cn("flex flex-col space-y-1", className)}>
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <item.icon className="h-4 w-4 text-primary" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  // Variante default
  return (
    <div className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
        >
          <item.icon className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">{item.label}</div>
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminMenu;

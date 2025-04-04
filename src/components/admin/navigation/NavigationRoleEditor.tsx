
import React, { useContext } from 'react';
import { UserRoleType } from '@/types/auth';
import { useNavigationItems } from '@/hooks/useNavigationItems';
import { NavigationTreeView } from './NavigationTreeView';
import { EmptyState } from '@/components/ui/empty-state';
import { Layers } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface NavigationRoleEditorProps {
  role: UserRoleType;
}

export const NavigationRoleEditor: React.FC<NavigationRoleEditorProps> = ({ role }) => {
  const { 
    items,
    isLoading,
    updateItemVisibility,
    reorderItem,
    selectedItem,
    setSelectedItem
  } = useNavigationItems(role);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon={<Layers className="h-10 w-10 text-muted-foreground" />}
        title="No hay elementos de navegación"
        description={`No se encontraron elementos de navegación para el rol ${role}.`}
        actions={
          <div className="text-sm text-muted-foreground">
            Utiliza "Sincronizar con código" para cargar la configuración inicial.
          </div>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <NavigationTreeView
        items={items}
        onToggleVisibility={updateItemVisibility}
        onReorder={reorderItem}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
        role={role}
      />
    </div>
  );
};

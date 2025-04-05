
import React from 'react';
import { NavigationItemNode } from './NavigationItemNode';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { UserRoleType } from '@/types/auth';

interface NavigationTreeViewProps {
  items: NavigationItemWithChildren[];
  onToggleVisibility: (itemId: string, isVisible: boolean) => void;
  onReorder: (newOrder: NavigationItemWithChildren[]) => void;
  selectedItem: string | null;
  onSelectItem: (itemId: string | null) => void;
  role: UserRoleType;
}

export const NavigationTreeView: React.FC<NavigationTreeViewProps> = ({
  items,
  onToggleVisibility,
  onReorder,
  selectedItem,
  onSelectItem,
  role
}) => {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <NavigationItemNode
          key={item.id}
          item={item}
          onToggleVisibility={onToggleVisibility}
          isSelected={selectedItem === item.id}
          onSelect={onSelectItem}
          level={0}
          role={role}
        />
      ))}
    </div>
  );
};

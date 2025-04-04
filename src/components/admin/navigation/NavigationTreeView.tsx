
import React from 'react';
import { 
  NavigationItemWithChildren,
  NavigationUpdate
} from '@/types/navigation-manager';
import { UserRoleType } from '@/types/auth';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NavigationItemNode } from './NavigationItemNode';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface NavigationTreeViewProps {
  items: NavigationItemWithChildren[];
  onToggleVisibility: (itemId: string, isVisible: boolean) => void;
  onReorder: (items: NavigationItemWithChildren[]) => void;
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        onReorder(newItems);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={items.map(item => ({ id: item.id }))}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {items.map(item => (
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
      </SortableContext>
    </DndContext>
  );
};


import React from 'react';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { UserRoleType } from '@/types/auth';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronRight, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavigationItemNodeProps {
  item: NavigationItemWithChildren;
  onToggleVisibility: (itemId: string, isVisible: boolean) => void;
  isSelected: boolean;
  onSelect: (itemId: string | null) => void;
  level: number;
  role: UserRoleType;
}

export const NavigationItemNode: React.FC<NavigationItemNodeProps> = ({
  item,
  onToggleVisibility,
  isSelected,
  onSelect,
  level,
  role
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Renderizar el icono dinámicamente basado en el nombre
  const IconComponent = item.iconName 
    ? (Icons as Record<string, React.ElementType>)[item.iconName] 
    : null;

  const handleToggle = () => {
    onToggleVisibility(item.id, !item.isVisible);
  };

  return (
    <div>
      <div 
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex items-center px-2 py-2 rounded-md",
          isSelected ? "bg-primary/10" : "hover:bg-muted/50",
          "pl-" + (level * 4 + 2),
          "transition-colors"
        )}
      >
        <div 
          className="cursor-grab pr-2 opacity-60 hover:opacity-100"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </div>
        
        {hasChildren ? (
          <button
            className="mr-1 p-1 rounded-sm hover:bg-muted/80"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        ) : (
          <div className="w-7"></div>
        )}
        
        {IconComponent && (
          <IconComponent size={16} className="mr-2 text-muted-foreground" />
        )}
        
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => onSelect(isSelected ? null : item.id)}
        >
          <span>{item.label}</span>
          
          {item.itemType === 'separator' && (
            <Badge variant="outline" className="ml-2">Separador</Badge>
          )}
          
          {item.itemType === 'group' && !hasChildren && (
            <Badge variant="outline" className="ml-2">Grupo</Badge>
          )}
        </div>
        
        <Switch
          checked={item.isVisible}
          onCheckedChange={handleToggle}
        />
      </div>
      
      {hasChildren && isExpanded && (
        <div className="pl-4 mt-1 space-y-1">
          {item.children?.map(childItem => (
            <NavigationItemNode
              key={childItem.id}
              item={childItem}
              onToggleVisibility={onToggleVisibility}
              isSelected={isSelected}
              onSelect={onSelect}
              level={level + 1}
              role={role}
            />
          ))}
        </div>
      )}
    </div>
  );
};

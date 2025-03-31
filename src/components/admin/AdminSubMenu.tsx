import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Pencil, Save } from 'lucide-react';
import { toast } from 'sonner';

export interface AdminSubMenuItem {
  id: string;
  icon: React.ElementType;
  label: string;
  path: string;
  requiresFeature?: string;
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
  const { isEditMode, isReorderMode } = useEditMode();
  const [menuItems, setMenuItems] = useState<AdminSubMenuItem[]>(items);
  
  useEffect(() => {
    setMenuItems(items);
  }, [items]);

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
      toast.success(`Etiqueta actualizada: ${newLabel}`);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(menuItems);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    
    setMenuItems(reorderedItems);
    toast.success("Orden de elementos actualizado");
  };
  
  const renderMenuItems = () => {
    if (isReorderMode) {
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="submenu-droppable" direction="horizontal">
            {(provided) => (
              <div 
                className="flex overflow-x-auto hide-scrollbar px-4 gap-1 py-1" 
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {menuItems.map((item, index) => {
                  const isActive = currentPath === item.path || 
                                 (item.path !== baseRoute && currentPath.includes(item.path));
                  const Icon = item.icon;
                  
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap",
                            "hover:bg-accent/50 transition-colors",
                            isActive ? "bg-blue-600/10 text-blue-600" : "text-muted-foreground",
                            snapshot.isDragging ? "bg-accent/80 shadow-sm" : ""
                          )}
                        >
                          <GripVertical className="h-4 w-4 cursor-grab" />
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }
    
    return (
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
    );
  };
  
  return (
    <div className={cn("w-full border-b bg-muted/30 backdrop-blur-sm sticky top-[49px] z-30", className)}>
      <div className="mx-auto">
        {renderMenuItems()}
      </div>
    </div>
  );
};

export default AdminSubMenu;

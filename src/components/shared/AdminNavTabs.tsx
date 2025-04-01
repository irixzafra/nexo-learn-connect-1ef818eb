import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEditMode } from '@/contexts/EditModeContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Pencil } from 'lucide-react';
import { toast } from 'sonner';

export interface AdminTabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  dataTag?: string;
  route?: string;
  className?: string;
  disabled?: boolean;
}

interface AdminNavTabsProps {
  tabs: AdminTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
  children?: React.ReactNode;
  showTabContent?: boolean;
}

const AdminNavTabs: React.FC<AdminNavTabsProps> = ({
  tabs: initialTabs,
  defaultValue,
  value,
  onValueChange,
  className,
  contentClassName,
  triggerClassName,
  children,
  showTabContent = true
}) => {
  const { isEditMode, isReorderMode } = useEditMode();
  const [tabs, setTabs] = React.useState<AdminTabItem[]>(initialTabs);

  React.useEffect(() => {
    setTabs(initialTabs);
  }, [initialTabs]);

  const handleTabEdit = (index: number) => {
    if (!isEditMode) return;

    const tab = tabs[index];
    const newLabel = prompt("Editar etiqueta:", tab.label);
    
    if (newLabel !== null && newLabel.trim() !== "") {
      const updatedTabs = [...tabs];
      updatedTabs[index] = {
        ...tab,
        label: newLabel
      };
      setTabs(updatedTabs);
      toast.success(`Etiqueta actualizada: ${newLabel}`);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const reorderedTabs = Array.from(tabs);
    const [movedTab] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, movedTab);
    
    setTabs(reorderedTabs);
    toast.success("Orden de pestañas actualizado");
  };

  const renderTabTriggers = () => {
    if (isReorderMode) {
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tabs-droppable" direction="horizontal">
            {(provided) => (
              <TabsList 
                className="bg-muted/60 p-1 rounded-lg mx-4 sm:w-auto flex overflow-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tabs.map((tab, index) => (
                  <Draggable key={tab.value} draggableId={tab.value} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md",
                          "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                          "data-[state=active]:text-foreground",
                          snapshot.isDragging ? "bg-accent shadow-sm" : ""
                        )}
                      >
                        <GripVertical className="h-4 w-4 cursor-grab" />
                        {tab.icon}
                        <span>{tab.label}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TabsList>
            )}
          </Droppable>
        </DragDropContext>
      );
    }
    
    return (
      <TabsList className="bg-muted/60 p-1 rounded-lg mx-4 sm:w-auto flex overflow-auto">
        {tabs.map((tab, index) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            disabled={tab.disabled}
            data-tag={tab.dataTag || `admin-tab-${tab.value}`}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap group relative",
              "data-[state=active]:bg-background data-[state=active]:shadow-sm",
              "data-[state=active]:text-foreground",
              triggerClassName
            )}
            onClick={isEditMode ? (e) => {
              if ((e.target as HTMLElement).tagName === 'SPAN') {
                e.preventDefault();
                e.stopPropagation();
                handleTabEdit(index);
              }
            } : undefined}
          >
            {tab.icon}
            <span className={isEditMode ? "cursor-pointer hover:text-primary" : ""}>
              {tab.label}
            </span>
            
            {isEditMode && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-background/40 rounded-md">
                <Pencil className="h-3 w-3 text-primary" />
              </div>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    );
  };

  return (
    <Tabs 
      defaultValue={defaultValue || tabs[0]?.value} 
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {renderTabTriggers()}
      
      {showTabContent && (
        <>
          {tabs.map((tab) => (
            tab.content && (
              <TabsContent 
                key={tab.value} 
                value={tab.value}
                className={cn("mt-4 rounded-md px-4", contentClassName)}
              >
                {tab.content}
              </TabsContent>
            )
          ))}
          {children}
        </>
      )}
    </Tabs>
  );
};

export default AdminNavTabs;

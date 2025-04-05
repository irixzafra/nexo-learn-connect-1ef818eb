
import React, { useState } from 'react';
import { useNavigationItems } from '@/hooks/useNavigationItems';
import { UserRoleType } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { EditIcon, SaveIcon, EyeIcon, EyeOffIcon, ArrowUpIcon, ArrowDownIcon, Menu } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/auth';

export const InlineNavigationEditor: React.FC = () => {
  const { effectiveRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRoleType>(effectiveRole as UserRoleType || 'admin');
  const { toast } = useToast();
  const { 
    items, 
    updateItemVisibility, 
    reorderItem, 
    saveNavigationChanges,
    hasUnsavedChanges 
  } = useNavigationItems(selectedRole);

  const [isOpen, setIsOpen] = useState(false);

  const handleMoveItem = (itemId: string, direction: 'up' | 'down') => {
    const flattenedItems = flattenNavigationTree(items);
    const currentIndex = flattenedItems.findIndex(item => item.id === itemId);
    
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'up' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < flattenedItems.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return;
    }
    
    // Este es un enfoque simplificado, para una implementación completa necesitaríamos
    // reconstruir el árbol de navegación con la nueva posición
    const newItems = [...items];
    const itemToMove = flattenedItems[currentIndex];
    const targetItem = flattenedItems[newIndex];
    
    // Intercambiar los órdenes de los elementos
    const tempOrder = itemToMove.sortOrder;
    itemToMove.sortOrder = targetItem.sortOrder;
    targetItem.sortOrder = tempOrder;
    
    reorderItem(newItems);
  };
  
  const handleSave = async () => {
    try {
      await saveNavigationChanges();
      toast({
        title: "Cambios guardados",
        description: "Los cambios en la navegación se han guardado correctamente",
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive",
      });
    }
  };

  // Función auxiliar para aplanar el árbol de navegación
  const flattenNavigationTree = (items: any[]) => {
    let result: any[] = [];
    
    const flatten = (items: any[]) => {
      items.forEach(item => {
        result.push(item);
        if (item.children && item.children.length > 0) {
          flatten(item.children);
        }
      });
    };
    
    flatten(items);
    return result;
  };

  const renderNavigationItem = (item: any, level = 0) => {
    return (
      <div 
        key={item.id}
        className="border-b border-border/30 last:border-b-0"
      >
        <div className="flex items-center justify-between py-2 px-2 hover:bg-muted/30 transition-colors">
          <div className="flex items-center gap-2" style={{ marginLeft: `${level * 16}px` }}>
            {item.itemType === 'group' && (
              <Badge variant="outline" className="text-xs">
                Grupo
              </Badge>
            )}
            <span className={item.isActive ? "font-medium" : "text-muted-foreground"}>
              {item.label}
            </span>
            {!item.isActive && (
              <Badge variant="secondary" className="text-xs">
                Inactivo
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  checked={item.isVisible}
                  onCheckedChange={(checked) => updateItemVisibility(item.id, checked)}
                  className="data-[state=checked]:bg-green-500"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.isVisible ? "Visible" : "Oculto"}</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleMoveItem(item.id, 'up')}
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleMoveItem(item.id, 'down')}
              >
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {item.children && item.children.length > 0 && (
          <div className="pl-4">
            {item.children.map((child: any) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-20 right-4 z-50 shadow-lg h-10 w-10 rounded-full bg-background"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Editar Navegación</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Editar Navegación</SheetTitle>
        </SheetHeader>
        
        <div className="flex gap-2 my-4">
          <Button 
            variant={selectedRole === 'admin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('admin')}
          >
            Admin
          </Button>
          <Button 
            variant={selectedRole === 'instructor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('instructor')}
          >
            Instructor
          </Button>
          <Button 
            variant={selectedRole === 'student' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('student')}
          >
            Estudiante
          </Button>
        </div>
        
        <Card className="mt-4">
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {items.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No hay elementos de navegación disponibles
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {items.map(item => renderNavigationItem(item))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="gap-2"
          >
            <SaveIcon className="h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InlineNavigationEditor;

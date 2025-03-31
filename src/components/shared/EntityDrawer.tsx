
import React, { useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface EntityDrawerProps<T> {
  title: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: T) => Promise<void>;
  entity?: T | null;
  loading?: boolean;
  children: ReactNode | ((props: { data: T | null; onChange: (data: T) => void }) => ReactNode);
}

export function EntityDrawer<T>({
  title,
  description,
  isOpen,
  onOpenChange,
  onSave,
  entity,
  loading = false,
  children
}: EntityDrawerProps<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<T | null>(null);

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    }
  }, [entity]);

  const handleSave = async () => {
    if (!formData) return;
    
    try {
      setIsSaving(true);
      await onSave(formData);
      toast.success('Datos guardados correctamente');
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error al guardar los datos');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] sm:max-w-[600px] md:max-w-[800px]">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Cargando...</span>
          </div>
        ) : (
          <>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>

            <div className="px-4 py-2 overflow-y-auto">
              {typeof children === 'function' 
                ? children({ data: formData, onChange: setFormData })
                : children}
            </div>

            <DrawerFooter className="pt-2 border-t flex justify-between">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar cambios
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

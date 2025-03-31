
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Role } from '../../hooks/useRoles';

interface EditRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: Role | null;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onUpdateRole: () => void;
}

export const EditRoleDialog: React.FC<EditRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedRole,
  name,
  setName,
  description,
  setDescription,
  onUpdateRole,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar rol</DialogTitle>
          <DialogDescription>
            Modifica la información del rol seleccionado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Nombre del rol</Label>
            <Input
              id="edit-name"
              placeholder="Ej: Editor, Revisor, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={selectedRole?.is_default}
            />
            {selectedRole?.is_default && (
              <p className="text-sm text-muted-foreground">
                No se puede cambiar el nombre de un rol predeterminado.
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Descripción</Label>
            <Textarea
              id="edit-description"
              placeholder="Describe las responsabilidades y permisos de este rol..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onUpdateRole}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

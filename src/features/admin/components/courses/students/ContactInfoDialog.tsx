
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';
import { Mail, Phone, UserCog } from 'lucide-react';

interface ContactInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: EnrolledStudent | null;
  onEditUser: (userId: string) => void;
}

const ContactInfoDialog: React.FC<ContactInfoDialogProps> = ({
  open,
  onOpenChange,
  student,
  onEditUser
}) => {
  if (!student) return null;

  const studentName = student.full_name || `Usuario ${student.user_id.substring(0, 8)}`;
  const missingEmail = !student.email;
  const missingPhone = !student.phone;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Información de contacto</DialogTitle>
          <DialogDescription>
            {(missingEmail || missingPhone) ? (
              "Este estudiante no tiene toda la información de contacto. Puedes actualizar sus datos."
            ) : (
              "Detalles de contacto del estudiante."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-md">
              <Mail className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium">Email</h4>
              {student.email ? (
                <p className="text-sm text-muted-foreground break-all">{student.email}</p>
              ) : (
                <p className="text-sm text-orange-500">No disponible</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-50 dark:bg-green-950 p-2 rounded-md">
              <Phone className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium">Teléfono</h4>
              {student.phone ? (
                <p className="text-sm text-muted-foreground">{student.phone}</p>
              ) : (
                <p className="text-sm text-orange-500">No disponible</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
          <Button 
            onClick={() => onEditUser(student.user_id)}
            className="gap-2"
          >
            <UserCog className="h-4 w-4" />
            Editar información de usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoDialog;

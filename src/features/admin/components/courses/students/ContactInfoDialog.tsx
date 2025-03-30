
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500">!</span> 
            Información de contacto faltante
          </DialogTitle>
          <DialogDescription>
            No se encontró información de contacto para {student?.full_name || 'este estudiante'}.
          </DialogDescription>
        </DialogHeader>
        
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">¿Qué deseas hacer?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                Para contactar a este estudiante, primero debe añadir su información de contacto al perfil.
              </p>
              {student && (
                <div className="text-sm mt-2 p-2 rounded-md bg-background border">
                  <div><strong>Nombre:</strong> {student.full_name || 'No disponible'}</div>
                  <div><strong>Email:</strong> {student.email || 'No disponible'}</div>
                  <div><strong>Teléfono:</strong> {student.phone || 'No disponible'}</div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="default" 
              className="w-full sm:w-auto"
              onClick={() => {
                if (student) {
                  onEditUser(student.user_id);
                  onOpenChange(false);
                }
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar información
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cerrar
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoDialog;

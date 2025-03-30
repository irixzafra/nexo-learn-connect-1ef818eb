
import React, { useState } from 'react';
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
import { Mail, Phone, UserCog, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Reset states when dialog opens with new student data
  React.useEffect(() => {
    if (student) {
      setEmail(student.email || '');
      setPhone(student.phone || '');
      setIsEditingEmail(false);
      setIsEditingPhone(false);
    }
  }, [student, open]);

  if (!student) return null;

  const studentName = student.full_name || `Usuario ${student.user_id.substring(0, 8)}`;
  const missingEmail = !student.email;
  const missingPhone = !student.phone;

  const handleSaveContact = async (field: 'email' | 'phone') => {
    if (!student) return;
    
    setIsSaving(true);
    
    try {
      const value = field === 'email' ? email : phone;
      if (!value.trim()) {
        toast.error(`El ${field === 'email' ? 'correo' : 'teléfono'} no puede estar vacío`);
        setIsSaving(false);
        return;
      }

      // Validar formato de email básico
      if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        toast.error('Formato de correo electrónico inválido');
        setIsSaving(false);
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({ [field]: value })
        .eq('id', student.user_id);
        
      if (error) throw error;
      
      toast.success(`${field === 'email' ? 'Correo' : 'Teléfono'} actualizado correctamente`);
      
      // Actualizar el estado local del estudiante
      if (field === 'email') {
        student.email = email;
        setIsEditingEmail(false);
      } else {
        student.phone = phone;
        setIsEditingPhone(false);
      }
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      toast.error(`No se pudo actualizar el ${field === 'email' ? 'correo' : 'teléfono'}`);
    } finally {
      setIsSaving(false);
    }
  };

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
            <div className={`p-2 rounded-md ${student.email ? 'bg-blue-50 dark:bg-blue-950' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <Mail className={`h-5 w-5 ${student.email ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Email</h4>
              {isEditingEmail ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Introduce el email"
                    className="flex-1"
                    autoFocus
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleSaveContact('email')}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div 
                  className="flex items-center group cursor-pointer"
                  onClick={() => setIsEditingEmail(true)}
                >
                  {student.email ? (
                    <p className="text-sm text-muted-foreground break-all group-hover:underline">{student.email}</p>
                  ) : (
                    <p className="text-sm text-orange-500 group-hover:underline">
                      Haz clic para añadir email
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-md ${student.phone ? 'bg-green-50 dark:bg-green-950' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <Phone className={`h-5 w-5 ${student.phone ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Teléfono</h4>
              {isEditingPhone ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Introduce el teléfono"
                    className="flex-1"
                    autoFocus
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleSaveContact('phone')}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div 
                  className="flex items-center group cursor-pointer"
                  onClick={() => setIsEditingPhone(true)}
                >
                  {student.phone ? (
                    <p className="text-sm text-muted-foreground group-hover:underline">{student.phone}</p>
                  ) : (
                    <p className="text-sm text-orange-500 group-hover:underline">
                      Haz clic para añadir teléfono
                    </p>
                  )}
                </div>
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

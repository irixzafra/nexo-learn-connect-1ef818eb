
import React, { useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

const EditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode } = useEditMode();
  const { userRole } = useAuth();
  
  useEffect(() => {
    // Debug information to check if the component is rendering
    console.log('EditModeToggle rendering, userRole:', userRole);
  }, [userRole]);
  
  // Si no eres administrador, no muestra el botón
  if (userRole !== 'admin') {
    console.log('Not showing edit button because userRole is not admin:', userRole);
    return null;
  }

  const handleToggle = () => {
    toggleEditMode();
    toast.success(isEditMode ? 'Modo edición desactivado' : 'Modo edición activado');
  };

  return (
    <Button
      variant={isEditMode ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      className={`gap-2 ${isEditMode ? 'bg-primary text-primary-foreground' : ''} fixed top-20 right-4 z-50 shadow-md`}
    >
      {isEditMode ? (
        <>
          <CheckSquare className="h-4 w-4" />
          <span>Editando</span>
        </>
      ) : (
        <>
          <Edit className="h-4 w-4" />
          <span>Editar</span>
        </>
      )}
    </Button>
  );
};

export default EditModeToggle;

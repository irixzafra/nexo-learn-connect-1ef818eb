
import React, { useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

const EditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode, isEditModeEnabled } = useEditMode();
  const { userRole } = useAuth();
  
  useEffect(() => {
    // Debug information to check if the component is rendering
    console.log('EditModeToggle rendering, userRole:', userRole, 'isEditModeEnabled:', isEditModeEnabled);
  }, [userRole, isEditModeEnabled]);
  
  // No mostrar el botón si no es admin/sistemas o si la funcionalidad está desactivada
  if ((userRole !== 'admin' && userRole !== 'sistemas') || !isEditModeEnabled) {
    console.log('Not showing edit button because userRole is not admin/sistemas or feature is disabled');
    return null;
  }

  const handleToggle = () => {
    toggleEditMode();
  };

  return (
    <Button
      variant={isEditMode ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      className={`gap-2 ${isEditMode ? 'bg-primary text-primary-foreground' : ''}`}
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

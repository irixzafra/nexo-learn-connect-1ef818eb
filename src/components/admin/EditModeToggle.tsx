
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Edit, CheckSquare } from 'lucide-react';

const EditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode } = useEditMode();
  const { userRole } = useAuth();
  
  if (userRole !== 'admin') {
    return null;
  }

  return (
    <Button
      variant={isEditMode ? "default" : "outline"}
      size="sm"
      onClick={toggleEditMode}
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

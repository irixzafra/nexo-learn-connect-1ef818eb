
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Edit, CheckSquare, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';

interface HeaderActionsProps {
  userRole: string | null;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ userRole }) => {
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <div className="flex items-center gap-2">
      {/* Edit Mode Toggle - only visible for admins and sistemas */}
      {(userRole === 'admin' || userRole === 'sistemas') && (
        <Button
          variant={isEditMode ? "default" : "outline"}
          size="sm"
          onClick={toggleEditMode}
          className={cn(
            "gap-1",
            isEditMode ? 'bg-primary text-primary-foreground' : '',
          )}
          title="Modo de edición"
        >
          {isEditMode ? (
            <>
              <CheckSquare className="h-4 w-4" />
              <span className="hidden md:inline">Editando</span>
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              <span className="hidden md:inline">Editar</span>
            </>
          )}
        </Button>
      )}
      
      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
          2
        </span>
      </Button>
      
      {/* Help */}
      <Button variant="ghost" size="icon" className="hidden sm:flex">
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};


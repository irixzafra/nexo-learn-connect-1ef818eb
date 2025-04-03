
import React from 'react';
import { CommandSeparator, CommandGroup, CommandItem } from '@/components/ui/command';
import { RotateCcw } from 'lucide-react';
import { getRoleName } from './roleUtils';

interface ResetRoleOptionProps {
  isViewingAsOtherRole: boolean;
  userRole: string;
  resetToOriginalRole: () => void;
  handleClose: () => void;
}

export const ResetRoleOption: React.FC<ResetRoleOptionProps> = ({
  isViewingAsOtherRole,
  userRole,
  resetToOriginalRole,
  handleClose
}) => {
  if (!isViewingAsOtherRole) {
    return null;
  }

  return (
    <>
      <CommandSeparator className="my-2" />
      <CommandGroup>
        <CommandItem
          onSelect={() => {
            resetToOriginalRole();
            handleClose();
          }}
          className="flex items-center gap-3 text-red-600 dark:text-red-400 py-3 px-3 rounded-md cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <RotateCcw className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <span className="font-medium">Cerrar Sesión</span>
        </CommandItem>
      </CommandGroup>
    </>
  );
};

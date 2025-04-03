
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
      <CommandSeparator />
      <CommandGroup>
        <CommandItem
          onSelect={() => {
            resetToOriginalRole();
            handleClose();
          }}
          className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Volver a mi rol original: {getRoleName(userRole || '')}</span>
        </CommandItem>
      </CommandGroup>
    </>
  );
};

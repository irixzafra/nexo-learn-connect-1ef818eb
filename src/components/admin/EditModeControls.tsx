
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// This component has been simplified since we removed the inline editing functionality
const EditModeControls: React.FC = () => {
  const { isEditMode } = useEditMode();

  if (!isEditMode) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-background border shadow-lg rounded-lg p-4 w-auto md:w-96 space-y-4">
        <div className="flex justify-between gap-2">
          <Button
            variant="destructive"
            size="sm"
            className="gap-2"
            onClick={() => console.log('Edit mode functionality has been removed')}
          >
            <X className="h-4 w-4" />
            <span>Exit</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModeControls;

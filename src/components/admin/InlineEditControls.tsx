
import React, { useState } from 'react';
import { useInlineEditor } from '@/contexts/InlineEditorContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Settings, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const InlineEditControls: React.FC = () => {
  const { 
    isEditModeEnabled, 
    toggleEditMode
  } = useInlineEditor();
  
  return (
    <div className="fixed z-50 bottom-8 right-6">
      <Button 
        size="icon" 
        variant={isEditModeEnabled ? "default" : "outline"} 
        className={cn(
          "h-12 w-12 rounded-full shadow-lg",
          isEditModeEnabled && "bg-primary text-primary-foreground"
        )}
        onClick={toggleEditMode}
      >
        {isEditModeEnabled ? (
          <X className="h-5 w-5" />
        ) : (
          <Settings className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default InlineEditControls;

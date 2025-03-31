
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Wand2, RefreshCw } from 'lucide-react';

interface PageFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  onRegenerate: () => void;
}

const PageFormActions: React.FC<PageFormActionsProps> = ({
  isSubmitting,
  onCancel,
  onRegenerate
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onRegenerate}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Regenerar
        </Button>
      </div>
      
      <Button 
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="h-4 w-4" />
        )}
        Crear Página
      </Button>
    </div>
  );
};

export default PageFormActions;

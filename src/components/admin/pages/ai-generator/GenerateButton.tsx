
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';

interface GenerateButtonProps {
  loading: boolean;
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  loading,
  onClick,
}) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <Wand2 className="h-4 w-4" />
          Generar contenido
        </>
      )}
    </Button>
  );
};

export default GenerateButton;

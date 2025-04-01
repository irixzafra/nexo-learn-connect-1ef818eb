
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface GenerateButtonProps {
  loading: boolean;
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  loading,
  onClick
}) => {
  return (
    <Button 
      onClick={onClick}
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <>
          <span className="animate-spin mr-2">⚙️</span>
          Generando...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generar con IA
        </>
      )}
    </Button>
  );
};

export default GenerateButton;

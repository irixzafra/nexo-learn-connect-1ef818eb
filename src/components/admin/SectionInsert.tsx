
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown, ChevronUp, Wand2 } from 'lucide-react';
import AISectionCreator from './AISectionCreator';

interface SectionInsertProps {
  onAddSection: (content: string, type?: string) => void;
  compact?: boolean;
}

const SectionInsert: React.FC<SectionInsertProps> = ({ 
  onAddSection,
  compact = false 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isAICreatorOpen, setIsAICreatorOpen] = useState(false);

  const handleAddTextSection = () => {
    onAddSection('Nuevo contenido de texto');
    setExpanded(false);
  };

  const handleAddHeroSection = () => {
    onAddSection('Título destacado', 'hero');
    setExpanded(false);
  };

  const handleOpenAICreator = () => {
    setIsAICreatorOpen(true);
    setExpanded(false);
  };

  const handleAddSectionWithAI = (content: string, type = 'text') => {
    onAddSection(content, type);
  };

  if (compact) {
    return (
      <div className="relative group">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full border shadow-sm z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground"
            onClick={() => setExpanded(!expanded)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          {expanded && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-background rounded-lg shadow-lg border p-1 flex flex-col gap-1 z-20">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start"
                onClick={handleAddTextSection}
              >
                <Plus className="h-4 w-4 mr-2" />
                Texto
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start"
                onClick={handleAddHeroSection}
              >
                <Plus className="h-4 w-4 mr-2" />
                Título
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-primary"
                onClick={handleOpenAICreator}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Crear con IA
              </Button>
            </div>
          )}
        </div>
        <div className="py-2 border-b border-dashed border-primary/20" />

        <AISectionCreator
          isOpen={isAICreatorOpen}
          onOpenChange={setIsAICreatorOpen}
          onAddSection={handleAddSectionWithAI}
        />
      </div>
    );
  }

  return (
    <div className="relative py-2">
      <div 
        className={`
          flex flex-col items-center justify-center gap-2
          ${expanded ? 'p-4 border border-dashed border-primary/50 rounded-lg' : ''}
        `}
      >
        {!expanded ? (
          <Button
            variant="ghost" 
            size="sm"
            onClick={() => setExpanded(true)}
            className="bg-muted/50 hover:bg-muted gap-1 text-muted-foreground"
          >
            <Plus className="h-4 w-4" />
            Añadir sección
            <ChevronDown className="h-3 w-3 ml-2" />
          </Button>
        ) : (
          <>
            <div className="text-sm font-medium mb-2">Añadir sección</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleAddTextSection}
                className="justify-start"
              >
                <Plus className="h-4 w-4 mr-2" />
                Texto
              </Button>
              <Button
                variant="outline"
                onClick={handleAddHeroSection}
                className="justify-start"
              >
                <Plus className="h-4 w-4 mr-2" />
                Título
              </Button>
              <Button
                variant="outline"
                onClick={handleOpenAICreator}
                className="justify-start text-primary"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Crear con IA
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(false)}
              className="mt-2"
            >
              <ChevronUp className="h-3 w-3 mr-1" />
              Cerrar
            </Button>
          </>
        )}
      </div>

      <AISectionCreator
        isOpen={isAICreatorOpen}
        onOpenChange={setIsAICreatorOpen}
        onAddSection={handleAddSectionWithAI}
      />
    </div>
  );
};

export default SectionInsert;

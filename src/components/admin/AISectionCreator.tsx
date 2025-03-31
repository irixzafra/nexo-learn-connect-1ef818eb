
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, MessageSquare, CheckSquare, Sparkles, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AISectionCreatorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSection: (content: string, type?: string) => void;
}

const AISectionCreator: React.FC<AISectionCreatorProps> = ({
  isOpen,
  onOpenChange,
  onAddSection
}) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('prompt');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, introduce una descripción');
      return;
    }

    setGenerating(true);
    setActiveTab('result');

    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simple response based on the prompt
      const generatedContent = `Contenido generado por IA basado en: "${prompt}"\n\nEste es un texto de ejemplo que simula el resultado de la IA. En una implementación real, aquí veríamos el contenido generado por un modelo de lenguaje.`;
      
      setResult(generatedContent);
      toast.success('Contenido generado con éxito');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error al generar contenido');
    } finally {
      setGenerating(false);
    }
  };

  const handleAddContent = () => {
    if (!result.trim()) {
      toast.error('No hay contenido para añadir');
      return;
    }

    onAddSection(result, 'text');
    toast.success('Sección añadida con éxito');
    
    // Reset state and close dialog
    setPrompt('');
    setResult('');
    setActiveTab('prompt');
    onOpenChange(false);
  };

  const handleClose = () => {
    // Reset state and close dialog
    setPrompt('');
    setResult('');
    setActiveTab('prompt');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Crear contenido con IA
          </DialogTitle>
          <DialogDescription>
            Describe lo que quieres crear y la IA generará el contenido para ti.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="prompt" disabled={generating}>
              Descripción
            </TabsTrigger>
            <TabsTrigger value="result" disabled={generating && !result}>
              Resultado {result ? <CheckSquare className="ml-1 h-3 w-3" /> : null}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompt" className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Describe el contenido que quieres crear
              </label>
              <Textarea
                placeholder="Ej: Un párrafo sobre la importancia de la educación online, con un tono profesional y motivador."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt.trim()}
                className="gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generar
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="space-y-4 py-4">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-center text-muted-foreground">
                  Generando contenido con IA...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-muted/20">
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span>Contenido generado:</span>
                  </div>
                  <Textarea 
                    value={result} 
                    onChange={(e) => setResult(e.target.value)}
                    rows={8}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setActiveTab('prompt')}>
                    Volver
                  </Button>
                  <Button onClick={handleAddContent} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir sección
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Haz clic en "Generar" para crear contenido</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AISectionCreator;

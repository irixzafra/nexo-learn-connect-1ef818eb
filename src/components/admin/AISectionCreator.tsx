
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Loader2, 
  MessageSquareText, 
  Sparkles, 
  Wand2, 
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  LinkIcon,
  ListChecks,
  CircleHelp,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AISectionCreatorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSection: (content: string, type: string) => void;
}

type SectionType = 'text' | 'hero' | 'features' | 'cta' | 'testimonials' | 'faq';

interface SectionTemplate {
  id: string;
  name: string;
  type: SectionType;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  promptTemplate: string;
}

const SECTION_TEMPLATES: SectionTemplate[] = [
  {
    id: 'text-paragraph',
    name: 'Párrafo de texto',
    type: 'text',
    description: 'Un párrafo simple de texto informativo',
    icon: FileText,
    promptTemplate: 'Escribe un párrafo informativo sobre'
  },
  {
    id: 'hero-section',
    name: 'Sección Hero',
    type: 'hero',
    description: 'Título principal destacado para captar atención',
    icon: Type,
    promptTemplate: 'Crea un título impactante para una sección hero sobre'
  },
  {
    id: 'features-list',
    name: 'Lista de características',
    type: 'features',
    description: 'Lista de funcionalidades o beneficios destacados',
    icon: ListChecks,
    promptTemplate: 'Genera una lista de características principales de'
  },
  {
    id: 'call-to-action',
    name: 'Llamada a la acción',
    type: 'cta',
    description: 'Texto persuasivo para motivar una acción',
    icon: LinkIcon,
    promptTemplate: 'Escribe una llamada a la acción persuasiva para'
  },
  {
    id: 'testimonial',
    name: 'Testimonio',
    type: 'testimonials',
    description: 'Opinión o valoración de un cliente o usuario',
    icon: MessageSquareText,
    promptTemplate: 'Crea un testimonio ficticio pero realista sobre'
  },
  {
    id: 'faq-item',
    name: 'Pregunta frecuente',
    type: 'faq',
    description: 'Pregunta y respuesta para resolver dudas',
    icon: CircleHelp,
    promptTemplate: 'Genera una pregunta frecuente con su respuesta sobre'
  }
];

const AISectionCreator: React.FC<AISectionCreatorProps> = ({
  isOpen,
  onOpenChange,
  onAddSection
}) => {
  const [sectionType, setSectionType] = useState<SectionType>('text');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Reset states when dialog opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setGeneratedContent('');
      setCustomPrompt('');
      setSectionType('text');
      setSelectedTemplate(null);
    }
  }, [isOpen]);

  const handleSelectTemplate = (templateId: string) => {
    const template = SECTION_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSectionType(template.type);
    }
  };

  const handleGenerateContent = () => {
    if (!customPrompt.trim()) {
      toast.error('Por favor, describe qué contenido quieres generar');
      return;
    }
    
    generateContent();
  };

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would call an AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const template = SECTION_TEMPLATES.find(t => t.id === selectedTemplate);
      const prompt = template 
        ? `${template.promptTemplate} ${customPrompt}`
        : `Genera contenido para una sección de tipo ${sectionType}: ${customPrompt}`;
      
      let response = '';
      
      switch(sectionType) {
        case 'text':
          response = `Este es un párrafo de ejemplo generado automáticamente sobre "${customPrompt}". La IA ha creado este contenido basándose en tu solicitud para demostrar cómo funcionaría la generación de contenido en un entorno real. En una implementación completa, este texto sería mucho más elaborado y relevante al tema específico solicitado.`;
          break;
        case 'hero':
          response = `${customPrompt.toUpperCase()}: DESCUBRE UN NUEVO MUNDO DE POSIBILIDADES`;
          break;
        case 'features':
          response = `Características principales de ${customPrompt}:\n- Diseño intuitivo y fácil de usar\n- Integración con sistemas existentes\n- Alto rendimiento y escalabilidad\n- Soporte técnico 24/7\n- Actualizaciones automáticas`;
          break;
        case 'cta':
          response = `¡No esperes más! Descubre todos los beneficios de ${customPrompt} hoy mismo y lleva tu experiencia al siguiente nivel. ¡Haz clic para comenzar!`;
          break;
        case 'testimonials':
          response = `"Desde que empecé a usar ${customPrompt}, mi productividad ha aumentado un 200%. Es una herramienta imprescindible que recomendaría a cualquiera." - María G., Directora de Operaciones`;
          break;
        case 'faq':
          response = `Pregunta: ¿Cuáles son los principales beneficios de ${customPrompt}?\n\nRespuesta: ${customPrompt} ofrece múltiples ventajas, incluyendo mayor eficiencia, reducción de costos operativos y una experiencia de usuario mejorada. Nuestros clientes han reportado un aumento promedio del 35% en productividad tras su implementación.`;
          break;
        default:
          response = `Contenido personalizado sobre ${customPrompt} generado por IA.`;
      }
      
      setGeneratedContent(response);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error al generar contenido con IA');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddSection = () => {
    if (!generatedContent.trim()) {
      toast.error('No hay contenido generado para añadir');
      return;
    }
    
    onAddSection(generatedContent, sectionType);
    toast.success(`Sección de tipo "${sectionType}" añadida correctamente`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Crear sección con IA
          </DialogTitle>
          <DialogDescription>
            Usa la inteligencia artificial para generar el contenido de una nueva sección.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Tipo de sección:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SECTION_TEMPLATES.map(template => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelectTemplate(template.id)}
                  disabled={isGenerating}
                  className="h-auto py-2 justify-start text-xs flex-col items-start"
                >
                  <div className="flex items-center w-full">
                    <template.icon className="h-3 w-3 mr-1" />
                    <span className="font-medium">{template.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 text-left">
                    {template.description}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">¿Qué quieres generar?</h4>
            <div className="flex flex-col gap-2">
              <Input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ej: beneficios de nuestro producto, servicios profesionales..."
                className="flex-1"
                disabled={isGenerating}
              />
              <Button
                onClick={handleGenerateContent}
                disabled={isGenerating || !customPrompt.trim() || !selectedTemplate}
                className="w-full"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Wand2 className="h-4 w-4 mr-2" />
                )}
                {isGenerating ? "Generando contenido..." : "Generar contenido"}
              </Button>
            </div>
          </div>
          
          {generatedContent && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary" />
                Contenido generado:
              </h4>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[120px]"
                placeholder="El contenido generado aparecerá aquí"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddSection}
            disabled={isGenerating || !generatedContent}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Espera...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Añadir sección
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AISectionCreator;

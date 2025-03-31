
import React from 'react';
import { Check, Brain, BrainCircuit, Sparkles } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type AIService = 'openai' | 'hf' | 'perplexity' | 'anthropic' | 'gemini';

interface AIServiceSelectorProps {
  selectedService: AIService;
  onServiceChange: (service: AIService) => void;
  disabled?: boolean;
}

const AIServiceSelector: React.FC<AIServiceSelectorProps> = ({
  selectedService,
  onServiceChange,
  disabled = false
}) => {
  const services = [
    { id: 'openai', name: 'OpenAI', description: 'GPT-4o, mejor calidad general', icon: Sparkles },
    { id: 'anthropic', name: 'Anthropic', description: 'Claude 3, preciso y seguro', icon: BrainCircuit },
    { id: 'gemini', name: 'Google Gemini', description: 'Bueno para múltiples modelos', icon: Brain },
    { id: 'perplexity', name: 'Perplexity', description: 'Búsqueda y respuesta integrada', icon: Brain },
    { id: 'hf', name: 'Hugging Face', description: 'Modelos abiertos personalizables', icon: Sparkles },
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="ai-service">Servicio de IA</Label>
      <Select 
        value={selectedService} 
        onValueChange={(value) => onServiceChange(value as AIService)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full" id="ai-service">
          <SelectValue placeholder="Selecciona un servicio de IA" />
        </SelectTrigger>
        <SelectContent>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <SelectItem key={service.id} value={service.id}>
                <div className="flex items-center">
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{service.name}</span>
                  {selectedService === service.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-xs text-muted-foreground cursor-help">
              Cada servicio requiere su propia API key y ofrece diferentes capacidades
            </p>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            <p>OpenAI ofrece los modelos más avanzados, Anthropic es excelente para contenido seguro y preciso, 
            Google Gemini integra bien con Google Workspace, Perplexity incorpora búsqueda de información,
            y Hugging Face proporciona modelos de código abierto.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AIServiceSelector;

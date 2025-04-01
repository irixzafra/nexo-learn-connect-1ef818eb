
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TemplateSelectorProps {
  template: string;
  onTemplateChange: (value: string) => void;
}

// Define the templates we'll use in the application
export const PAGE_TEMPLATES = [
  { id: 'landing', name: 'Página de aterrizaje' },
  { id: 'about', name: 'Sobre nosotros' },
  { id: 'services', name: 'Servicios' },
  { id: 'pricing', name: 'Precios' },
  { id: 'faq', name: 'Preguntas frecuentes' },
  { id: 'blog', name: 'Artículo de blog' },
  { id: 'contact', name: 'Contacto' },
  { id: 'custom', name: 'Personalizado' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  template,
  onTemplateChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="template-select">Tipo de contenido</Label>
      <Select value={template} onValueChange={onTemplateChange}>
        <SelectTrigger id="template-select">
          <SelectValue placeholder="Selecciona un tipo de plantilla" />
        </SelectTrigger>
        <SelectContent>
          {PAGE_TEMPLATES.map((tmpl) => (
            <SelectItem key={tmpl.id} value={tmpl.id}>
              {tmpl.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;

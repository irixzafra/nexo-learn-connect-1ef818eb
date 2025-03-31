
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormLabel } from '@/components/ui/form';

export const PAGE_TEMPLATES = [
  { value: 'landing', label: 'Landing Page' },
  { value: 'about', label: 'Página Acerca De' },
  { value: 'service', label: 'Página de Servicio' },
  { value: 'contact', label: 'Página de Contacto' },
  { value: 'blog', label: 'Entrada de Blog' },
  { value: 'faq', label: 'Preguntas Frecuentes' },
  { value: 'product', label: 'Página de Producto' },
  { value: 'custom', label: 'Personalizado' },
];

interface TemplateSelectorProps {
  template: string;
  onTemplateChange: (value: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  template,
  onTemplateChange,
}) => {
  return (
    <div>
      <FormLabel>Plantilla de página</FormLabel>
      <Select value={template} onValueChange={onTemplateChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un tipo de página" />
        </SelectTrigger>
        <SelectContent>
          {PAGE_TEMPLATES.map((template) => (
            <SelectItem key={template.value} value={template.value}>
              {template.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground mt-1">
        Selecciona el tipo de página que quieres crear
      </p>
    </div>
  );
};

export default TemplateSelector;

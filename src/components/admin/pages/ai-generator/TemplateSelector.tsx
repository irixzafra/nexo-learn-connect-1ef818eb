
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
          <SelectItem value="landing">Página de aterrizaje</SelectItem>
          <SelectItem value="about">Sobre nosotros</SelectItem>
          <SelectItem value="services">Servicios</SelectItem>
          <SelectItem value="pricing">Precios</SelectItem>
          <SelectItem value="faq">Preguntas frecuentes</SelectItem>
          <SelectItem value="blog">Artículo de blog</SelectItem>
          <SelectItem value="contact">Contacto</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;

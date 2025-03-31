
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { CreatePageFormData } from '@/features/admin/hooks/useCreatePageForm';
import { LayoutGrid, PaintBucket } from 'lucide-react';

const PAGE_TYPES = [
  { value: 'landing', label: 'Landing Page', icon: <LayoutGrid className="h-4 w-4" /> },
  { value: 'blog', label: 'Entrada de Blog', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'about', label: 'Página Acerca De', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'service', label: 'Página de Servicio', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'contact', label: 'Página de Contacto', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'faq', label: 'Preguntas Frecuentes', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'product', label: 'Página de Producto', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'custom', label: 'Personalizado', icon: <PaintBucket className="h-4 w-4" /> },
];

interface PageTypeSelectorProps {
  form: UseFormReturn<CreatePageFormData>;
}

const PageTypeSelector: React.FC<PageTypeSelectorProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="pageType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de página</FormLabel>
          <FormControl>
            <RadioGroup 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2"
              value={field.value}
              onValueChange={field.onChange}
            >
              {PAGE_TYPES.map((type) => (
                <FormItem key={type.value} className="flex flex-col items-center space-y-3">
                  <FormControl>
                    <div>
                      <RadioGroupItem
                        value={type.value}
                        id={`pageType-${type.value}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`pageType-${type.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {type.icon}
                        <div className="mt-2 font-medium">{type.label}</div>
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>
            Selecciona el tipo de página que deseas crear
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PageTypeSelector;

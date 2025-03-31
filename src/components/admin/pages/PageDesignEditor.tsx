
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PageLayout } from '@/types/pages';
import { Card, CardContent } from '@/components/ui/card';
import { Columns, Maximize, Sidebar as SidebarIcon, LayoutDashboard, BookOpen, PenTool } from 'lucide-react';

interface PageDesignEditorProps {
  form: UseFormReturn<any>;
}

const layoutOptions: { value: PageLayout; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: 'default',
    label: 'Estándar',
    icon: <LayoutDashboard className="h-4 w-4" />,
    description: 'Diseño básico con encabezado y contenido centrado'
  },
  {
    value: 'landing',
    label: 'Landing Page',
    icon: <Maximize className="h-4 w-4" />,
    description: 'Diseño para páginas de aterrizaje y promociones'
  },
  {
    value: 'marketing',
    label: 'Marketing',
    icon: <PenTool className="h-4 w-4" />,
    description: 'Diseño enfocado en conversiones con CTA prominentes'
  },
  {
    value: 'documentation',
    label: 'Documentación',
    icon: <BookOpen className="h-4 w-4" />,
    description: 'Ideal para tutoriales y documentación técnica'
  },
  {
    value: 'course',
    label: 'Curso',
    icon: <BookOpen className="h-4 w-4" />,
    description: 'Estructura optimizada para contenido educativo'
  },
  {
    value: 'sidebar',
    label: 'Con Sidebar',
    icon: <SidebarIcon className="h-4 w-4" />,
    description: 'Incluye una barra lateral para navegación adicional'
  },
  {
    value: 'full-width',
    label: 'Ancho Completo',
    icon: <Columns className="h-4 w-4" />,
    description: 'Utiliza el ancho completo de la pantalla'
  }
];

const PageDesignEditor: React.FC<PageDesignEditorProps> = ({ form }) => {
  const currentLayout = form.watch('layout');

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="layout"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diseño de página</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un diseño" />
                </SelectTrigger>
                <SelectContent>
                  {layoutOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>Define cómo se verá tu página</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {layoutOptions.map(layout => (
          <Card 
            key={layout.value}
            className={`cursor-pointer transition ${currentLayout === layout.value ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
            onClick={() => form.setValue('layout', layout.value)}
          >
            <CardContent className="p-4 text-center">
              <div className="h-24 flex items-center justify-center mb-3 bg-muted rounded-md">
                <div className="text-4xl text-primary/60">
                  {layout.icon}
                </div>
              </div>
              <h3 className="font-medium mb-1">{layout.label}</h3>
              <p className="text-xs text-muted-foreground">{layout.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-md border p-4 bg-muted/30 mt-6">
        <h3 className="font-medium mb-2">Sugerencias de IA para el diseño</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Basado en tu contenido actual, estos son algunos diseños recomendados:
        </p>
        
        {currentLayout === 'default' && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm">
            <p className="text-blue-800">
              <span className="font-medium">Sugerencia:</span> Si tu página tiene mucho texto, considera usar el diseño <strong>Documentación</strong> que mejora la legibilidad.
            </p>
          </div>
        )}
        
        {currentLayout === 'landing' && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm">
            <p className="text-blue-800">
              <span className="font-medium">Sugerencia:</span> Para landing pages, añade al menos un bloque Hero y un CTA para maximizar conversiones.
            </p>
          </div>
        )}

        {['documentation', 'course'].includes(currentLayout) && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm">
            <p className="text-blue-800">
              <span className="font-medium">Sugerencia:</span> Considera usar el diseño <strong>Sidebar</strong> para facilitar la navegación entre secciones del contenido.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDesignEditor;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, Copy, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const ThemeOverviewTab: React.FC = () => {
  const { theme, isLoading } = useDesignSystem();
  
  if (isLoading) {
    return <div className="p-8 text-center">Cargando configuración de diseño...</div>;
  }
  
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    toast.success('Configuración copiada al portapapeles');
  };
  
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileName = `nexo-design-theme-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>Resumen de la configuración actual del diseño</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Modo del Tema</h4>
              <Badge variant={theme.mode === 'light' ? 'default' : 'secondary'}>
                {theme.mode === 'light' ? 'Claro' : theme.mode === 'dark' ? 'Oscuro' : 'Sistema'}
              </Badge>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Tipografía Principal</h4>
              <p className="text-sm text-muted-foreground">{theme.fonts.body}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Radio de Bordes</h4>
              <p className="text-sm text-muted-foreground">{theme.borderRadius}</p>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="gap-2 w-full" onClick={handleCopyJSON}>
                <Copy className="h-4 w-4" />
                Copiar Configuración JSON
              </Button>
            </div>
            
            <div>
              <Button variant="outline" size="sm" className="gap-2 w-full" onClick={handleExportJSON}>
                <Download className="h-4 w-4" />
                Exportar Configuración
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>Previsualización de los elementos principales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Encabezado de Muestra</h3>
              <p className="text-muted-foreground">
                Este es un texto de párrafo que muestra la tipografía y el color de texto principal.
                Incluye <a href="#" className="text-primary hover:underline">enlaces</a> y 
                <strong> texto destacado</strong> para mostrar diferentes estilos.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Button>Botón Principal</Button>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Secundario</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex flex-wrap gap-2">
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.primary }}></div>
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.secondary }}></div>
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.accent }}></div>
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.background, border: '1px solid #eaeaea' }}></div>
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.foreground }}></div>
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.muted }}></div>
              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: theme.colors.border }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Documentación del Sistema de Diseño</CardTitle>
          <CardDescription>
            Recursos y guías para implementar el diseño consistentemente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center text-center gap-2">
              <Eye className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Vista Previa Completa</h3>
              <p className="text-sm text-muted-foreground">Previsualiza todos los componentes con el tema actual</p>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center text-center gap-2">
              <ExternalLink className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Guía de Estilos</h3>
              <p className="text-sm text-muted-foreground">Accede a la documentación completa del sistema de diseño</p>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center text-center gap-2">
              <Copy className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Código de Componentes</h3>
              <p className="text-sm text-muted-foreground">Consulta ejemplos de código para implementar el diseño</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

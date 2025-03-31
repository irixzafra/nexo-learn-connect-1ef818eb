
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Info, Code, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const DeveloperSettings: React.FC = () => {
  const [showSectionTags, setShowSectionTags] = useState(false);
  const [showDeveloperTools, setShowDeveloperTools] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSectionTags = localStorage.getItem('showSectionTags') === 'true';
    const savedDevTools = localStorage.getItem('showDeveloperTools') === 'true';
    
    setShowSectionTags(savedSectionTags);
    setShowDeveloperTools(savedDevTools);
  }, []);

  const handleToggleSectionTags = (checked: boolean) => {
    setShowSectionTags(checked);
    localStorage.setItem('showSectionTags', checked.toString());
    
    // Dispatch a custom event for real-time updates
    window.dispatchEvent(
      new CustomEvent('sectionTagsChanged', {
        detail: { showSectionTags: checked }
      })
    );
  };

  const handleToggleDeveloperTools = (checked: boolean) => {
    setShowDeveloperTools(checked);
    localStorage.setItem('showDeveloperTools', checked.toString());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="mr-2 h-5 w-5 text-primary" />
          Herramientas para Desarrolladores
        </CardTitle>
        <CardDescription>
          Opciones destinadas a desarrolladores y administradores técnicos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-y-1">
          <div>
            <Label htmlFor="section-tags" className="font-medium flex items-center">
              <Tag className="mr-2 h-4 w-4 text-primary" />
              Mostrar etiquetas de sección
            </Label>
            <p className="text-sm text-muted-foreground">
              Muestra el nombre de cada sección para facilitar referencias en desarrollo
            </p>
          </div>
          <Switch
            id="section-tags"
            checked={showSectionTags}
            onCheckedChange={handleToggleSectionTags}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-y-1">
          <div>
            <Label htmlFor="developer-tools" className="font-medium flex items-center">
              <Code className="mr-2 h-4 w-4 text-primary" />
              Herramientas de desarrollo
            </Label>
            <p className="text-sm text-muted-foreground">
              Activa herramientas adicionales para desarrollo y depuración
            </p>
          </div>
          <Switch
            id="developer-tools"
            checked={showDeveloperTools}
            onCheckedChange={handleToggleDeveloperTools}
          />
        </div>

        {showDeveloperTools && (
          <div className="pt-4 space-y-2">
            <Button variant="outline" size="sm" className="w-full" onClick={() => console.log('Clear cache')}>
              Limpiar Caché Local
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => console.log('Reset settings')}>
              Restablecer Configuración
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeveloperSettings;

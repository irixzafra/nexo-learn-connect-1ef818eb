
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Flag, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Datos de ejemplo para simular las características
// En una implementación real, esto vendría de una API
const featureFlagGroups = [
  {
    id: 'platform',
    name: 'Plataforma',
    features: [
      { id: 'dark_mode', name: 'Modo Oscuro', enabled: true, description: 'Habilitar modo oscuro en toda la plataforma' },
      { id: 'beta_features', name: 'Características Beta', enabled: false, description: 'Habilitar acceso a características en desarrollo' },
      { id: 'analytics', name: 'Analíticas', enabled: true, description: 'Recopilar datos anónimos de uso' },
    ]
  },
  {
    id: 'courses',
    name: 'Cursos',
    features: [
      { id: 'ai_recommendations', name: 'Recomendaciones AI', enabled: false, description: 'Usar inteligencia artificial para recomendar cursos' },
      { id: 'course_ratings', name: 'Valoraciones', enabled: true, description: 'Permitir valoraciones en cursos' },
      { id: 'course_discussions', name: 'Discusiones', enabled: true, description: 'Habilitar discusiones en cursos' },
    ]
  },
  {
    id: 'users',
    name: 'Usuarios',
    features: [
      { id: 'social_login', name: 'Login Social', enabled: true, description: 'Permitir inicio de sesión con redes sociales' },
      { id: 'user_profiles', name: 'Perfiles Públicos', enabled: false, description: 'Habilitar perfiles públicos de usuario' },
    ]
  },
  {
    id: 'content',
    name: 'Contenido',
    features: [
      { id: 'markdown_editor', name: 'Editor Markdown', enabled: true, description: 'Usar editor markdown para contenido' },
      { id: 'rich_media', name: 'Media Enriquecido', enabled: true, description: 'Permitir subir y embeber contenido multimedia' },
      { id: 'ai_content', name: 'Contenido AI', enabled: false, description: 'Generar contenido con AI' },
    ]
  }
];

const InlineFeatureFlags: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState(featureFlagGroups);
  const { toast } = useToast();

  const handleToggleFeature = (groupId: string, featureId: string, enabled: boolean) => {
    const newFeatures = features.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          features: group.features.map(feature => {
            if (feature.id === featureId) {
              return { ...feature, enabled };
            }
            return feature;
          })
        };
      }
      return group;
    });
    
    setFeatures(newFeatures);
    
    toast({
      title: `Característica ${enabled ? 'activada' : 'desactivada'}`,
      description: `Se ha ${enabled ? 'activado' : 'desactivado'} la característica "${featureId.replace('_', ' ')}"`,
      duration: 2000,
    });
  };

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios en la API
    toast({
      title: "Cambios guardados",
      description: "Los cambios en las características se han guardado correctamente",
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-32 right-4 z-50 shadow-lg h-10 w-10 rounded-full bg-background"
        >
          <Flag className="h-4 w-4" />
          <span className="sr-only">Gestionar Features</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Gestionar Features</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[600px] mt-6">
          <Accordion type="multiple" className="w-full">
            {features.map((group) => (
              <AccordionItem value={group.id} key={group.id}>
                <AccordionTrigger className="text-md font-medium">
                  {group.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 py-2">
                    {group.features.map((feature) => (
                      <div 
                        key={feature.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            {feature.enabled ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="font-medium">{feature.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {feature.description}
                          </p>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={(enabled) => 
                            handleToggleFeature(group.id, feature.id, enabled)
                          }
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveChanges} className="gap-2">
            Guardar Cambios
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InlineFeatureFlags;

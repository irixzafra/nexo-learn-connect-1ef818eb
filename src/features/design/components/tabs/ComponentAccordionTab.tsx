
import React from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Shield, MessageCircle, Users, FileText, Boxes, Cog } from 'lucide-react';
import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ComponentAccordionTab = () => {
  const { previewTheme, isPreviewing } = useDesignSystem();
  const [variant, setVariant] = React.useState<'default' | 'outline' | 'ghost'>('default');
  const [gap, setGap] = React.useState<'none' | 'sm' | 'md'>('md');
  const [type, setType] = React.useState<'single' | 'multiple'>('single');

  const applyChanges = () => {
    if (!isPreviewing) {
      const currentTheme = JSON.parse(localStorage.getItem('designSystemTheme') || '{}');
      
      const updatedTheme = {
        ...currentTheme,
        components: {
          ...currentTheme.components,
          accordion: {
            variant,
            gap,
            type
          }
        }
      };
      
      previewTheme(updatedTheme);
      localStorage.setItem('designSystemTheme', JSON.stringify(updatedTheme));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Acordeones</CardTitle>
          <CardDescription>
            Personaliza la apariencia y comportamiento de los acordeones en toda la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Variante de estilo</Label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={variant === 'default' ? 'default' : 'outline'}
                    onClick={() => setVariant('default')}
                  >
                    Por defecto
                  </Button>
                  <Button 
                    size="sm" 
                    variant={variant === 'outline' ? 'default' : 'outline'}
                    onClick={() => setVariant('outline')}
                  >
                    Outline
                  </Button>
                  <Button 
                    size="sm" 
                    variant={variant === 'ghost' ? 'default' : 'outline'}
                    onClick={() => setVariant('ghost')}
                  >
                    Ghost
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Espacio entre elementos</Label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={gap === 'none' ? 'default' : 'outline'}
                    onClick={() => setGap('none')}
                  >
                    Sin espacio
                  </Button>
                  <Button 
                    size="sm" 
                    variant={gap === 'sm' ? 'default' : 'outline'}
                    onClick={() => setGap('sm')}
                  >
                    Pequeño
                  </Button>
                  <Button 
                    size="sm" 
                    variant={gap === 'md' ? 'default' : 'outline'}
                    onClick={() => setGap('md')}
                  >
                    Mediano
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de acordeón</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="accordion-type"
                    checked={type === 'multiple'}
                    onCheckedChange={(checked) => setType(checked ? 'multiple' : 'single')}
                  />
                  <Label htmlFor="accordion-type">
                    {type === 'multiple' ? 'Múltiple expansión' : 'Una sección a la vez'}
                  </Label>
                </div>
              </div>
            </div>
            
            <Button onClick={applyChanges} disabled={isPreviewing}>
              {isPreviewing ? 'Vista previa activa' : 'Aplicar cambios'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista previa</CardTitle>
          <CardDescription>
            Así se verán los acordeones con la configuración actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StyledAccordion 
            variant={variant} 
            gap={gap} 
            type={type}
            collapsible={true}
            defaultValue="basicas"
          >
            <StyledAccordionItem 
              value="basicas" 
              title="Básicas" 
              icon={<Cog className="h-5 w-5" />}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="feature-1">Multi-idioma</Label>
                  <Switch id="feature-1" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="feature-2">Modo oscuro</Label>
                  <Switch id="feature-2" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="feature-3">Notificaciones</Label>
                  <Switch id="feature-3" defaultChecked />
                </div>
              </div>
            </StyledAccordionItem>
            
            <StyledAccordionItem 
              value="security" 
              title="Seguridad" 
              icon={<Shield className="h-5 w-5 text-green-500" />}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="security-1">Autenticación de dos factores</Label>
                  <Switch id="security-1" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="security-2">Sesiones simultáneas</Label>
                  <Switch id="security-2" defaultChecked />
                </div>
              </div>
            </StyledAccordionItem>
            
            <StyledAccordionItem 
              value="content" 
              title="Contenido" 
              icon={<FileText className="h-5 w-5 text-purple-500" />}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content-1">Editor avanzado</Label>
                  <Switch id="content-1" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="content-2">Autoguardado</Label>
                  <Switch id="content-2" defaultChecked />
                </div>
              </div>
            </StyledAccordionItem>
            
            <StyledAccordionItem 
              value="users" 
              title="Usuarios" 
              icon={<Users className="h-5 w-5 text-orange-500" />}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="users-1">Invitaciones</Label>
                  <Switch id="users-1" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="users-2">Roles personalizados</Label>
                  <Switch id="users-2" />
                </div>
              </div>
            </StyledAccordionItem>
            
            <StyledAccordionItem 
              value="communication" 
              title="Comunicación" 
              icon={<MessageCircle className="h-5 w-5 text-blue-500" />}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="comm-1">Mensajes internos</Label>
                  <Switch id="comm-1" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="comm-2">Notificaciones por email</Label>
                  <Switch id="comm-2" defaultChecked />
                </div>
              </div>
            </StyledAccordionItem>
            
            <StyledAccordionItem 
              value="advanced" 
              title="Avanzadas" 
              icon={<Boxes className="h-5 w-5 text-red-500" />}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="adv-1">API pública</Label>
                  <Switch id="adv-1" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="adv-2">Webhooks</Label>
                  <Switch id="adv-2" />
                </div>
              </div>
            </StyledAccordionItem>
          </StyledAccordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uso en código</CardTitle>
          <CardDescription>
            Cómo implementar estos acordeones en el código
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
{`import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Shield } from 'lucide-react';

// Uso básico
<StyledAccordion>
  <StyledAccordionItem 
    value="item-1" 
    title="Seguridad" 
    icon={<Shield className="h-5 w-5" />}
  >
    Contenido del acordeón
  </StyledAccordionItem>
</StyledAccordion>

// Uso avanzado
<StyledAccordion 
  type="${type}" 
  variant="${variant}" 
  gap="${gap}"
  defaultValue="item-1"
>
  <StyledAccordionItem 
    value="item-1" 
    title="Seguridad" 
    description="Configuración de seguridad"
    icon={<Shield className="h-5 w-5 text-green-500" />}
  >
    Contenido del acordeón
  </StyledAccordionItem>
</StyledAccordion>`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentAccordionTab;

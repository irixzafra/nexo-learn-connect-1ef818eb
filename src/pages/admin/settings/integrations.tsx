
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Plug, Globe, ShieldCheck, Blocks, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'pending';
  isConfigured: boolean;
}

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Procesador de pagos para suscripciones y compras únicas',
      icon: <ShieldCheck className="h-8 w-8 text-purple-500" />,
      status: 'active',
      isConfigured: true
    },
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Integración con Gmail, Calendar y otros servicios de Google',
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      status: 'active',
      isConfigured: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automatización con más de 3,000 aplicaciones',
      icon: <Blocks className="h-8 w-8 text-orange-500" />,
      status: 'inactive',
      isConfigured: false
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Notificaciones y comandos desde Slack',
      icon: <Plug className="h-8 w-8 text-green-500" />,
      status: 'pending',
      isConfigured: true
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id ? {
          ...integration,
          status: integration.status === 'active' ? 'inactive' : 'active'
        } : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      const newStatus = integration.status === 'active' ? 'desactivada' : 'activada';
      toast.success(`Integración ${integration.name} ${newStatus}`);
    }
  };

  return (
    <AdminPageLayout 
      title="Integraciones" 
      subtitle="Conecta la plataforma con servicios externos"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Plug className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Integraciones Activas</CardTitle>
            </div>
            <CardDescription>
              Gestiona las conexiones con servicios externos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div 
                  key={integration.id} 
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-md p-2">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {integration.name}
                        {integration.status === 'active' && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Activa
                          </Badge>
                        )}
                        {integration.status === 'pending' && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Pendiente
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={integration.status === 'active'}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                      disabled={integration.status === 'pending' || !integration.isConfigured}
                    />
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Añadir integración
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Estado de servicios</CardTitle>
              </div>
              <Button variant="ghost" size="sm">Actualizar</Button>
            </div>
            <CardDescription>
              Verifica el estado de los servicios conectados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm">API REST</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">Operativa</span>
                </div>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm">Procesamiento de pagos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">Operativo</span>
                </div>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm">Servicio de autenticación</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">Operativo</span>
                </div>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-sm">Notificaciones push</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-muted-foreground">Degradado</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default IntegrationsPage;

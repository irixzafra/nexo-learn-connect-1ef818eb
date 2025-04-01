
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plug, Server, LucideIcon, Search, Mail, CreditCard, MessageSquare, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
  status: 'connected' | 'not_connected' | 'error';
  category: 'analytics' | 'communication' | 'payment' | 'developer' | 'ai';
}

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = React.useState<Integration[]>([
    {
      id: 'google_analytics',
      name: 'Google Analytics',
      description: 'Integra analíticas de tráfico y comportamiento de usuarios',
      icon: Search,
      enabled: true,
      status: 'connected',
      category: 'analytics'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Integración para gestión de campañas de email marketing',
      icon: Mail,
      enabled: false,
      status: 'not_connected',
      category: 'communication'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Procesa pagos y suscripciones en tu plataforma',
      icon: CreditCard,
      enabled: true,
      status: 'connected',
      category: 'payment'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Conecta notificaciones y alertas con canales de Slack',
      icon: MessageSquare,
      enabled: false,
      status: 'not_connected',
      category: 'communication'
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Integración con repositorios y automatización de CI/CD',
      icon: Github,
      enabled: true,
      status: 'connected',
      category: 'developer'
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Integra funcionalidades de IA para generación de contenido',
      icon: Server,
      enabled: true,
      status: 'connected',
      category: 'ai'
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              enabled: !integration.enabled,
              status: !integration.enabled ? 'connected' : 'not_connected'
            } 
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    const action = integration?.enabled ? 'desactivada' : 'activada';
    toast.success(`Integración ${integration?.name} ${action} correctamente`);
  };

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'analytics', name: 'Analíticas' },
    { id: 'communication', name: 'Comunicación' },
    { id: 'payment', name: 'Pagos' },
    { id: 'developer', name: 'Desarrollo' },
    { id: 'ai', name: 'Inteligencia Artificial' }
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeCategory);

  return (
    <AdminPageLayout 
      title="Integraciones" 
      subtitle="Gestiona las conexiones con servicios externos"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Plug className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Servicios Conectados</CardTitle>
            </div>
            <CardDescription>
              Administra las integraciones con servicios y aplicaciones de terceros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <Badge 
                  key={category.id} 
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            
            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map(integration => {
                const Icon = integration.icon;
                return (
                  <Card key={integration.id}>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/10 rounded-md">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                        </div>
                        <Badge variant={integration.status === 'connected' ? "outline" : "secondary"}>
                          {integration.status === 'connected' ? 'Conectado' : 'No conectado'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                      <Button
                        variant={integration.enabled ? "outline" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        {integration.enabled ? 'Desactivar' : 'Activar'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default IntegrationsPage;


import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Plug, ExternalLink, Lock, CreditCard, Check, Database, ShieldCheck, Key } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectionsSettings from '@/features/admin/components/settings/ConnectionsSettings';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const IntegrationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("integrations");
  const [apiKeyVisible, setApiKeyVisible] = useState<{[key: string]: boolean}>({});
  
  // Mock function to simulate copying to clipboard
  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${name} copiado al portapapeles`);
      })
      .catch(() => {
        toast.error("Error al copiar al portapapeles");
      });
  };

  // Mock function to test Supabase connection
  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('test').select('count').single();
      
      if (error) {
        toast.error("Error de conexión con Supabase");
        console.error("Supabase connection error:", error);
        return;
      }
      
      toast.success("Conexión con Supabase exitosa");
    } catch (error) {
      toast.error("Error al probar la conexión");
      console.error("Test connection error:", error);
    }
  };

  return (
    <AdminPageLayout 
      title="Conexiones e Integraciones" 
      subtitle="Configura las conexiones con servicios externos"
    >
      <Tabs defaultValue="integrations" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            <span>Integraciones</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Base de Datos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Integraciones y APIs</CardTitle>
              </div>
              <CardDescription>
                Conecta tu plataforma con servicios externos y APIs de terceros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {integrations.map((integration, index) => (
                  <Card key={index} className="overflow-hidden border transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-md bg-muted p-1.5 flex items-center justify-center overflow-hidden">
                          <img 
                            src={integration.icon} 
                            alt={`${integration.name} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex space-x-1">
                          {integration.isPopular && (
                            <Badge variant="secondary">Popular</Badge>
                          )}
                          {integration.isNew && (
                            <Badge variant="default">Nuevo</Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-base mt-3">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="border-t pt-3 pb-3 flex justify-between items-center">
                      <Badge variant="outline">{integration.category}</Badge>
                      <Button 
                        variant={integration.status === "connected" ? "outline" : "default"} 
                        size="sm"
                      >
                        {integration.status === "connected" ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Conectado
                          </>
                        ) : (
                          "Conectar"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <ConnectionsSettings />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Administra las claves de API para conectar aplicaciones externas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key, index) => (
                  <div key={index} className="p-4 border rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">{key.name}</h3>
                        <Badge variant="outline">{key.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Creada: {key.createdAt}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                      <div className="bg-muted px-3 py-1.5 rounded text-mono text-sm flex-1 md:flex-auto">
                        {apiKeyVisible[key.id] ? key.value : key.maskedValue}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setApiKeyVisible(prev => ({...prev, [key.id]: !prev[key.id]}))}
                      >
                        {apiKeyVisible[key.id] ? "Ocultar" : "Mostrar"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(key.value, key.name)}
                      >
                        Copiar
                      </Button>
                    </div>
                  </div>
                ))}
                <Button>
                  <Key className="mr-2 h-4 w-4" />
                  Generar nueva API Key
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Configura eventos para notificar a sistemas externos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md divide-y">
                <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Notificaciones de pago</h3>
                    <p className="text-sm text-muted-foreground">
                      Enviar eventos cuando se realice un pago en la plataforma
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="payment-webhook" />
                    <Label htmlFor="payment-webhook">Activado</Label>
                  </div>
                </div>
                <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Inscripciones a cursos</h3>
                    <p className="text-sm text-muted-foreground">
                      Notificar cuando un estudiante se inscriba a un curso
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="enrollment-webhook" />
                    <Label htmlFor="enrollment-webhook">Activado</Label>
                  </div>
                </div>
                <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Completar cursos</h3>
                    <p className="text-sm text-muted-foreground">
                      Enviar eventos cuando un estudiante complete un curso
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="course-completion-webhook" />
                    <Label htmlFor="course-completion-webhook">Activado</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Configuración de Supabase</CardTitle>
              </div>
              <CardDescription>
                Gestiona la conexión con tu base de datos Supabase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supabase-url">URL de Supabase</Label>
                  <Input 
                    id="supabase-url" 
                    defaultValue="https://yydtceuhpvfsenlwuvmn.supabase.co" 
                    disabled 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supabase-key">API Key anónima</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="supabase-key" 
                      type="password" 
                      value="••••••••••••••••••••••••••••••••"
                      disabled 
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZHRjZXVocHZmc2VubHd1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDk3MTYsImV4cCI6MjA1ODgyNTcxNn0.Dy5AwXr1EWD5D-Ymj09mhFYD9ah9YJodmRdberEdOP4", "API Key anónima")}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="text-sm font-medium">Estado de la conexión</h3>
                <div className="bg-muted p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Conectado a Supabase</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={testSupabaseConnection}
                  >
                    Probar conexión
                  </Button>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="text-sm font-medium">Seguridad</h3>
                <div className="flex flex-col md:flex-row justify-between gap-4 p-4 border rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Encriptación de datos sensibles</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Habilitar encriptación para campos sensibles en la base de datos
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="data-encryption" />
                    <Label htmlFor="data-encryption">Activado</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between pt-4">
              <Button variant="outline">Actualizar configuración</Button>
              <Button>Guardar cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

// Datos de integraciones disponibles
const integrations = [
  {
    name: "Stripe",
    description: "Procesamiento de pagos seguro",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    category: "Pagos",
    status: "connected",
    isPopular: true,
  },
  {
    name: "PayPal",
    description: "Alternativa para procesamiento de pagos",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.svg",
    category: "Pagos",
    status: "disconnected",
  },
  {
    name: "Mailchimp",
    description: "Servicio de email marketing",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Mailchimp_Logo-Horizontal_Black.svg/2560px-Mailchimp_Logo-Horizontal_Black.svg.png",
    category: "Marketing",
    status: "disconnected",
  },
  {
    name: "Google Analytics",
    description: "Analíticas y estadísticas web",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Google_Analytics_logo_2015.svg/1200px-Google_Analytics_logo_2015.svg.png",
    category: "Analítica",
    status: "connected",
  },
  {
    name: "Slack",
    description: "Notificaciones y mensajería",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
    category: "Comunicación",
    status: "disconnected",
    isPopular: true,
  },
  {
    name: "Zoom",
    description: "Videoconferencias en vivo",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Zoom_logo.svg/2056px-Zoom_logo.svg.png",
    category: "Comunicación",
    status: "disconnected",
  },
  {
    name: "OpenAI",
    description: "Integración de IA generativa",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
    category: "IA",
    status: "disconnected",
    isNew: true,
  },
  {
    name: "Zapier",
    description: "Automatización entre servicios",
    icon: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    category: "Automatización",
    status: "disconnected",
  },
];

// Datos de API keys
const apiKeys = [
  {
    id: "1",
    name: "API Key de Producción",
    value: "sk_prod_2023_abcdef123456789",
    maskedValue: "•••••••••••••••••",
    status: "active",
    createdAt: "23/05/2023",
  },
  {
    id: "2",
    name: "API Key de Desarrollo",
    value: "sk_dev_2023_987654321fedcba",
    maskedValue: "•••••••••••••••••",
    status: "active",
    createdAt: "12/02/2023",
  }
];

export default IntegrationsPage;

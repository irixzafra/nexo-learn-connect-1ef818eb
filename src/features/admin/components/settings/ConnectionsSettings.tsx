
import React from 'react';
import { 
  Plug, 
  Globe, 
  Mail, 
  MessageSquare, 
  Webhook
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';
import { toast } from 'sonner';

const ConnectionsSettings: React.FC = () => {
  const handleTestConnection = (service: string) => {
    toast.loading(`Probando conexión con ${service}...`);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Conexión con ${service} establecida correctamente`);
    }, 1500);
  };

  const connectionsSections: SettingsSection[] = [
    {
      id: "email",
      title: "Email",
      icon: <Mail className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="smtp_host">Servidor SMTP</Label>
            <Input id="smtp_host" defaultValue="smtp.example.com" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp_port">Puerto SMTP</Label>
              <Input id="smtp_port" defaultValue="587" type="number" />
            </div>
            
            <div>
              <Label htmlFor="smtp_security">Seguridad</Label>
              <Input id="smtp_security" defaultValue="TLS" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp_username">Usuario SMTP</Label>
              <Input id="smtp_username" defaultValue="user@example.com" />
            </div>
            
            <div>
              <Label htmlFor="smtp_password">Contraseña SMTP</Label>
              <Input id="smtp_password" type="password" defaultValue="password" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="sender_email">Email del remitente</Label>
            <Input id="sender_email" defaultValue="no-reply@example.com" />
          </div>
          
          <Button 
            onClick={() => handleTestConnection('SMTP')} 
            variant="outline" 
            size="sm"
          >
            Probar conexión
          </Button>
        </div>
      )
    },
    {
      id: "webhooks",
      title: "Webhooks",
      icon: <Webhook className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Activar webhooks</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el envío de webhooks para eventos del sistema
              </p>
            </div>
            <Switch id="enable_webhooks" defaultChecked={false} />
          </div>
          
          <div>
            <Label htmlFor="webhook_url">URL del webhook</Label>
            <Input id="webhook_url" defaultValue="https://example.com/webhook" />
            <p className="text-xs text-muted-foreground mt-1">
              URL donde se enviarán los eventos
            </p>
          </div>
          
          <div>
            <Label htmlFor="webhook_secret">Clave secreta</Label>
            <Input id="webhook_secret" type="password" defaultValue="" />
            <p className="text-xs text-muted-foreground mt-1">
              Clave para firmar las solicitudes de webhook
            </p>
          </div>
          
          <Button 
            onClick={() => handleTestConnection('Webhooks')} 
            variant="outline" 
            size="sm"
          >
            Probar webhook
          </Button>
        </div>
      )
    },
    {
      id: "social",
      title: "Redes Sociales",
      icon: <Globe className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Integración con redes sociales</h3>
              <p className="text-xs text-muted-foreground">
                Habilita la integración con redes sociales
              </p>
            </div>
            <Switch id="enable_social" defaultChecked={true} />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Facebook</Label>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200">
                Conectado
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook_app_id">App ID</Label>
                <Input id="facebook_app_id" defaultValue="123456789" />
              </div>
              <div>
                <Label htmlFor="facebook_app_secret">App Secret</Label>
                <Input id="facebook_app_secret" type="password" defaultValue="secret" />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Twitter</Label>
              <Badge variant="outline" className="bg-red-100 text-red-800 text-xs border-red-200">
                Desconectado
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="twitter_api_key">API Key</Label>
                <Input id="twitter_api_key" defaultValue="" />
              </div>
              <div>
                <Label htmlFor="twitter_api_secret">API Secret</Label>
                <Input id="twitter_api_secret" type="password" defaultValue="" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "chat",
      title: "Chat en vivo",
      icon: <MessageSquare className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Activar chat en vivo</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el chat en vivo para soporte
              </p>
            </div>
            <Switch id="enable_live_chat" defaultChecked={false} />
          </div>
          
          <div>
            <Label htmlFor="chat_provider">Proveedor</Label>
            <Input id="chat_provider" defaultValue="Intercom" />
          </div>
          
          <div>
            <Label htmlFor="chat_api_key">API Key</Label>
            <Input id="chat_api_key" defaultValue="" />
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
            <h3 className="text-sm font-medium text-blue-800">Configuración adicional</h3>
            <p className="text-xs text-blue-700 mt-1">
              Para configurar opciones avanzadas del chat, accede al panel de administración del proveedor.
            </p>
            <Button 
              variant="link" 
              className="text-blue-600 p-0 h-auto mt-2 text-xs"
            >
              Ir al panel de administración
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-purple-600">
          <Plug className="h-5 w-5" />
          Conexiones
        </h1>
        <p className="text-muted-foreground">
          Configura las conexiones con servicios externos
        </p>
      </div>

      <SettingsAccordion sections={connectionsSections} />
    </div>
  );
};

export default ConnectionsSettings;


import React from 'react';
import { 
  Plug, 
  Globe, 
  Mail, 
  MessageSquare, 
  FileCode,
  Webhook,
  ExternalLink,
  Loader2,
  Construction,
  Database
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';
import { Separator } from '@/components/ui/separator';
import SupabaseConnectionTest from './SupabaseConnectionTest';

const ConnectionsSettings: React.FC = () => {
  const connectionsSections: SettingsSection[] = [
    {
      id: "database",
      title: "Base de Datos",
      icon: <Database className="h-5 w-5" />,
      iconColor: "text-indigo-500",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dbProvider" className="text-left block mb-1">Proveedor de Base de Datos</Label>
            <Input id="dbProvider" value="Supabase" disabled />
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-2">
            <Label className="text-left block mb-1">Estado de la conexión</Label>
            <SupabaseConnectionTest />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Sincronización automática</h3>
              <p className="text-xs text-muted-foreground">
                Mantener los datos sincronizados automáticamente
              </p>
            </div>
            <Switch id="dbSync" defaultChecked />
          </div>
        </div>
      )
    },
    {
      id: "email",
      title: "Correo Electrónico",
      icon: <Mail className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="emailProvider" className="text-left block mb-1">Proveedor de Email</Label>
            <Input id="emailProvider" placeholder="Ej: SMTP, SendGrid, Mailgun..." />
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <Label htmlFor="emailApiKey" className="text-left block mb-1">API Key</Label>
            <Input id="emailApiKey" type="password" placeholder="••••••••••••••••" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Verificación DKIM</h3>
              <p className="text-xs text-muted-foreground">
                Mejora la verificación y entregabilidad de emails
              </p>
            </div>
            <Switch id="dkimVerification" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="pt-2">
            <Button variant="outline" size="sm">Verificar Conexión</Button>
          </div>
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
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Login con Google</h3>
              <p className="text-xs text-muted-foreground">
                Permite iniciar sesión con cuentas de Google
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="googleLogin" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Login con Facebook</h3>
              <p className="text-xs text-muted-foreground">
                Permite iniciar sesión con cuentas de Facebook
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="facebookLogin" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Login con Apple</h3>
              <p className="text-xs text-muted-foreground">
                Permite iniciar sesión con cuentas de Apple
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="appleLogin" />
          </div>
        </div>
      )
    },
    {
      id: "integrations",
      title: "Integraciones",
      icon: <ExternalLink className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Integración con Slack</h3>
              <p className="text-xs text-muted-foreground">
                Conecta la plataforma con canales de Slack
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="slackIntegration" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Integración con Google Calendar</h3>
              <p className="text-xs text-muted-foreground">
                Conecta con Google Calendar para eventos
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="googleCalendarIntegration" />
          </div>
        </div>
      )
    },
    {
      id: "webhooks",
      title: "Webhooks",
      icon: <Webhook className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Webhooks salientes</h3>
              <p className="text-xs text-muted-foreground">
                Envía notificaciones a sistemas externos
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="outgoingWebhooks" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between py-1">
            <div className="text-left">
              <h3 className="text-sm font-medium">Webhooks entrantes</h3>
              <p className="text-xs text-muted-foreground">
                Recibe datos desde sistemas externos
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <Switch id="incomingWebhooks" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-indigo-600">
          <Plug className="h-5 w-5" />
          Conexiones
        </h1>
        <p className="text-muted-foreground">
          Configura integraciones con servicios externos y APIs
        </p>
      </div>

      <SettingsAccordion sections={connectionsSections} />
    </div>
  );
};

export default ConnectionsSettings;

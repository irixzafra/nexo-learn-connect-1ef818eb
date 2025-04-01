
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Info, 
  Video, 
  Mail, 
  Plug, 
  AlertTriangle, 
  FileCode, 
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface ConnectionCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ConnectionsSettings: React.FC = () => {
  const [showSecretKey, setShowSecretKey] = React.useState(false);
  const [paymentProvider, setPaymentProvider] = React.useState<string>("stripe");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'payments': true,
    'login': true,
    'video': false,
    'email': false,
    'apis': false,
  });
  
  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const toggleSecretKeyVisibility = () => setShowSecretKey(!showSecretKey);
  
  const testConnection = (service: string) => {
    toast.promise(
      // Simulate API request
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Comprobando conexión con ${service}...`,
        success: `Conexión con ${service} establecida correctamente`,
        error: `Error al conectar con ${service}. Verifica tus credenciales.`,
      }
    );
  };

  // Define categories for connections
  const categories: ConnectionCategory[] = [
    {
      id: 'payments',
      title: 'Pagos',
      icon: <CreditCard className="h-5 w-5 text-purple-500" />,
      children: (
        <div className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="payment_provider">Proveedor de Pagos</Label>
            <Select 
              value={paymentProvider} 
              onValueChange={setPaymentProvider}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Stripe</span>
                  </div>
                </SelectItem>
                <SelectItem value="paypal" disabled>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>PayPal</span>
                    <Badge className="ml-2" variant="outline">Próximamente</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentProvider === "stripe" && (
            <div className="rounded-md border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Configuración de Stripe
                </h3>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  <Check className="mr-1 h-3 w-3" /> Conectado
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stripe_public_key">Clave Pública (Publicable)</Label>
                  <Input 
                    id="stripe_public_key" 
                    value="pk_test_51NdFt****************************************" 
                    readOnly
                  />
                </div>
                
                <div>
                  <Label htmlFor="stripe_secret_key">Clave Secreta</Label>
                  <div className="flex">
                    <Input 
                      id="stripe_secret_key" 
                      type={showSecretKey ? "text" : "password"} 
                      value="sk_test_51NdFt****************************************" 
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={toggleSecretKeyVisibility}
                      className="rounded-l-none border-l-0"
                    >
                      {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="stripe_webhook_secret">Webhook Secret</Label>
                  <Input 
                    id="stripe_webhook_secret" 
                    type="password" 
                    value="whsec_************************************" 
                    readOnly
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="stripe_test_mode">Modo de Prueba</Label>
                  <Switch id="stripe_test_mode" defaultChecked />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => testConnection('Stripe')}
                  >
                    <Info className="mr-1 h-4 w-4" />
                    Probar Conexión
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Panel de Stripe
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'login',
      title: 'Proveedores de Login Social',
      icon: <Plug className="h-5 w-5 text-blue-500" />,
      children: (
        <div className="space-y-4 divide-y">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <Label className="font-medium">Google</Label>
                <p className="text-xs text-muted-foreground">Iniciar sesión con cuenta Google</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <div className="bg-slate-900 text-white rounded-full p-1">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <Label className="font-medium">GitHub</Label>
                <p className="text-xs text-muted-foreground">Iniciar sesión con GitHub</p>
              </div>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-700 text-white rounded-full p-1">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <Label className="font-medium">Facebook</Label>
                <p className="text-xs text-muted-foreground">Iniciar sesión con Facebook</p>
              </div>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <div className="bg-sky-500 text-white rounded-full p-1">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <Label className="font-medium">Twitter / X</Label>
                <p className="text-xs text-muted-foreground">Iniciar sesión con Twitter/X</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      )
    },
    {
      id: 'video',
      title: 'Video Hosting',
      icon: <Video className="h-5 w-5 text-amber-500" />,
      children: (
        <div className="rounded-md border border-dashed p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <Video className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-medium">Configuración de Video</h3>
            <p className="text-sm text-muted-foreground">
              La integración con proveedores de video estará disponible próximamente.
            </p>
            <Badge variant="outline">Próximamente</Badge>
          </div>
        </div>
      )
    },
    {
      id: 'email',
      title: 'Email (Transaccional/Marketing)',
      icon: <Mail className="h-5 w-5 text-green-500" />,
      children: (
        <>
          <Badge variant="outline" className="mb-3">Próximamente</Badge>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">Configuración requerida</h3>
                <p className="text-sm text-amber-700">
                  Es importante configurar un servicio de correo electrónico para el funcionamiento 
                  correcto de notificaciones, recuperación de contraseñas y otras funcionalidades del sistema.
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'apis',
      title: 'Otras APIs',
      icon: <FileCode className="h-5 w-5 text-indigo-500" />,
      children: (
        <div className="rounded-md border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-indigo-500" />
              <div className="text-left">
                <Label className="font-medium">API de Inteligencia Artificial</Label>
                <p className="text-xs text-muted-foreground">
                  Integra capacidades de IA para creación de contenido y asistencia
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center mb-2">
          <Plug className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-left">Conexiones</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4 text-left">
          Configura los proveedores de servicios y conexiones externas
        </p>

        <div className="space-y-3">
          {categories.map((category, idx) => (
            <React.Fragment key={category.id}>
              <Collapsible 
                open={openCategories[category.id]} 
                onOpenChange={() => toggleCategory(category.id)}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
                  <div className="flex items-center gap-2 flex-1">
                    {category.icon}
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {openCategories[category.id] ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t pt-4">
                  {category.children}
                </CollapsibleContent>
              </Collapsible>
              {idx < categories.length - 1 && <div className="h-2"></div>}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionsSettings;

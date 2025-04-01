
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ShieldCheck, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const [openSections, setOpenSections] = React.useState({
    authentication: true,
    privacy: true,
    encryption: true,
    audit: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center mb-2">
          <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-xl font-semibold text-left">Seguridad</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4 text-left">
          Configura las opciones de seguridad y autenticación
        </p>

        <div className="space-y-3">
          {/* Autenticación */}
          <Collapsible 
            open={openSections.authentication} 
            onOpenChange={() => toggleSection('authentication')}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
              <div className="flex items-center gap-2 flex-1">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium">Autenticación</span>
              </div>
              <div className="text-muted-foreground">
                {openSections.authentication ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3 border-t pt-2">
              <div className="space-y-0 divide-y">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Autenticación de múltiples factores</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Requiere verificación adicional durante el inicio de sesión
                    </p>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableMFA"
                      checked={false}
                      disabled={true}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Bloqueo de cuentas</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Bloquea la cuenta después de varios intentos fallidos
                    </p>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableAccountLocking"
                      checked={false}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Privacidad */}
          <Collapsible 
            open={openSections.privacy} 
            onOpenChange={() => toggleSection('privacy')}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
              <div className="flex items-center gap-2 flex-1">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium">Privacidad</span>
              </div>
              <div className="text-muted-foreground">
                {openSections.privacy ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3 border-t pt-2">
              <div className="space-y-0 divide-y">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Cookies de terceros</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Permite el uso de cookies de terceros para análisis y publicidad
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableThirdPartyCookies"
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Anonimización de datos</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Anonimiza datos personales sensibles en informes y análisis
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableDataAnonymization"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Cifrado */}
          <Collapsible 
            open={openSections.encryption} 
            onOpenChange={() => toggleSection('encryption')}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
              <div className="flex items-center gap-2 flex-1">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium">Cifrado</span>
              </div>
              <div className="text-muted-foreground">
                {openSections.encryption ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3 border-t pt-2">
              <div className="space-y-0 divide-y">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Cifrado de datos sensibles</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Protege información crítica mediante cifrado avanzado
                    </p>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableDataEncryption"
                      checked={false}
                      disabled={true}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Cifrado en tránsito</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Asegura que los datos se cifren durante la transferencia
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableTransitEncryption"
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Auditoría */}
          <Collapsible 
            open={openSections.audit} 
            onOpenChange={() => toggleSection('audit')}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
              <div className="flex items-center gap-2 flex-1">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium">Auditoría</span>
              </div>
              <div className="text-muted-foreground">
                {openSections.audit ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3 border-t pt-2">
              <div className="space-y-0 divide-y">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Registros de auditoría</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Mantiene un registro detallado de todas las actividades
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableAuditLog"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-left">Notificaciones de seguridad</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      Envía alertas sobre inicios de sesión sospechosos y cambios importantes
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isLoading && (
                      <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                    )}
                    <Switch
                      id="enableSecurityNotifications"
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;

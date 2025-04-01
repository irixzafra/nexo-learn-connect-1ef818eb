
import React, { useState } from 'react';
import { Shield, Search, Award, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import PageSection from '@/components/layout/page/PageSection';

type VerificationStatus = 'idle' | 'loading' | 'valid' | 'invalid';

const CertificateVerify: React.FC = () => {
  const [certificateId, setCertificateId] = useState<string>('');
  const [status, setStatus] = useState<VerificationStatus>('idle');
  
  // Simulamos un certificado válido con ID "cert-001"
  const handleVerify = () => {
    if (!certificateId.trim()) return;
    
    setStatus('loading');
    
    // Simulación de llamada a API
    setTimeout(() => {
      if (certificateId.toLowerCase() === 'cert-001') {
        setStatus('valid');
      } else {
        setStatus('invalid');
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Verificación de Certificados"
        description="Verifica la autenticidad de cualquier certificado"
        breadcrumbs={[
          { title: 'Home', href: '/home' },
          { title: 'Certificados', href: '/certificates' },
          { title: 'Verificar' },
        ]}
      />

      <PageContent>
        <div className="max-w-3xl mx-auto">
          <PageSection variant="card">
            <div className="flex flex-col items-center text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Verifique la Autenticidad</h2>
              <p className="text-muted-foreground max-w-md">
                Introduzca el ID del certificado para verificar su autenticidad. 
                El ID se encuentra en la esquina inferior del certificado.
              </p>
            </div>
            
            <div className="px-6 pb-6">
              <Separator className="mb-6" />
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Ingrese el ID del certificado (ej: cert-001)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleVerify} disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Verificar
                    </>
                  )}
                </Button>
              </div>
              
              {status === 'valid' && (
                <Alert className="mt-6 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-600 dark:text-green-400">Certificado Válido</AlertTitle>
                  <AlertDescription className="text-green-600/90 dark:text-green-400/90">
                    El certificado es auténtico y se encuentra vigente.
                  </AlertDescription>
                </Alert>
              )}
              
              {status === 'invalid' && (
                <Alert className="mt-6 border-red-500 bg-red-50 dark:bg-red-900/20">
                  <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertTitle className="text-red-600 dark:text-red-400">Certificado No Válido</AlertTitle>
                  <AlertDescription className="text-red-600/90 dark:text-red-400/90">
                    El certificado no se encuentra en nuestros registros o ha sido revocado.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </PageSection>
          
          {status === 'valid' && (
            <PageSection variant="card" className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Detalles del Certificado</CardTitle>
                <CardDescription>
                  Información del certificado verificado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <h3 className="font-medium">Fundamentos de React</h3>
                      <p className="text-sm text-muted-foreground">Curso: Desarrollo Web con React</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Emitido a</p>
                      <p className="font-medium">Juan Pérez</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha de emisión</p>
                      <p>15 de Abril, 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Válido hasta</p>
                      <p>15 de Abril, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Emitido por</p>
                      <p>Nexo Learning Platform</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </PageSection>
          )}
          
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-medium">Preguntas frecuentes</h3>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">¿Cómo puedo encontrar el ID de un certificado?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    El ID del certificado se encuentra en la esquina inferior izquierda de cada certificado emitido. 
                    También puede acceder al ID escaneando el código QR que aparece en el documento.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">¿Por qué es importante verificar un certificado?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    La verificación garantiza la autenticidad del certificado y confirma que fue emitido oficialmente
                    por nuestra plataforma, evitando posibles falsificaciones.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">¿Puedo verificar certificados por otros medios?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sí, también puede verificar la autenticidad escaneando el código QR del certificado con cualquier 
                    lector de códigos QR o enviando un correo electrónico a verificaciones@ejemplo.com.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default CertificateVerify;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Search, Info } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CertificateVerificationPortal: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateId.trim()) {
      setError('Por favor ingrese un ID de certificado válido');
      return;
    }
    
    // Limpiar cualquier error previo
    setError(null);
    
    // Navegar a la página de verificación con el ID proporcionado
    navigate(`/certificates/verify/${certificateId.trim()}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="text-center mb-8">
        <Award className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Portal de Verificación de Certificados</h1>
        <p className="text-muted-foreground mt-2">
          Compruebe la autenticidad de los certificados emitidos por nuestra plataforma
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Verificar un Certificado</CardTitle>
          <CardDescription>
            Ingrese el ID del certificado que desea verificar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="certificate-id">ID del Certificado</Label>
                <Input
                  id="certificate-id"
                  placeholder="Ejemplo: cert_123abc456def"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Verificar Certificado
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 border-t pt-4">
          <Alert variant="default" className="bg-muted/50 border-muted">
            <Info className="h-4 w-4" />
            <AlertTitle>¿Cómo verificar un certificado?</AlertTitle>
            <AlertDescription>
              Puede verificar un certificado escaneando el código QR en el certificado físico o ingresando el ID del certificado que aparece en la parte inferior del mismo.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CertificateVerificationPortal;

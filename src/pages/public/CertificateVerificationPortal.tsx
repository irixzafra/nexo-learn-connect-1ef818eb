
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CertificateVerificationPortal: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateId.trim()) {
      setError('Por favor ingrese un ID de certificado válido');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Navigate to certificate verification page
    navigate(`/admin/certificates/verify/${certificateId}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-lg">
      <div className="text-center mb-8">
        <Award className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Verificación de Certificados</h1>
        <p className="text-muted-foreground mt-2">
          Ingrese el ID del certificado para verificar su autenticidad
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Verificar certificado</CardTitle>
          <CardDescription>
            Ingrese el ID o número del certificado para verificar su autenticidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="certificate-id" className="text-sm font-medium">
                  ID o Número de Certificado
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="certificate-id"
                    placeholder="Ej: c7f9e9e0-1b5a-4b0f-8b0a-7b0b0b0b0b0b"
                    className="pl-9"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              
              <Button type="submit" className="w-full">
                Verificar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col text-center text-sm text-muted-foreground">
          <p>
            Todos los certificados incluyen un código QR para una verificación rápida.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CertificateVerificationPortal;

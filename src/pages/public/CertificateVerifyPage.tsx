
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Calendar, Award, User, AlertTriangle, ArrowLeft, FileText, School, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface Certificate {
  id: string;
  created_at: string;
  issued_date: string;
  expiration_date: string | null;
  student_id: string;
  course_id: string;
  certificate_number: string;
  is_valid: boolean;
  status: 'active' | 'revoked' | 'expired';
  revocation_reason?: string;
  metadata?: Record<string, any>;
}

interface VerificationResult {
  certificate: Certificate | null;
  student: {
    full_name: string;
    email?: string;
  } | null;
  course: {
    title: string;
    description: string;
  } | null;
  isValid: boolean;
  message: string;
}

const CertificateVerifyPage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  
  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!certificateId) {
        setError('No se proporcionó un ID de certificado');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // This would be a real API call in production
        // For now we'll simulate a response with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock verification result - in a real app this would come from the API
        const mockResult: VerificationResult = {
          certificate: {
            id: certificateId,
            created_at: new Date().toISOString(),
            issued_date: new Date().toISOString(),
            expiration_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(), // 1 year from now
            student_id: 'student_123',
            course_id: 'course_456',
            certificate_number: `CERT-${Math.floor(Math.random() * 10000)}`,
            is_valid: true,
            status: 'active',
          },
          student: {
            full_name: 'Estudiante Ejemplo',
            email: 'estudiante@ejemplo.com'
          },
          course: {
            title: 'Desarrollo Web Avanzado',
            description: 'Un curso completo sobre desarrollo web moderno con las últimas tecnologías.'
          },
          isValid: true,
          message: 'El certificado es válido y fue emitido correctamente.'
        };
        
        setResult(mockResult);
      } catch (err) {
        console.error('Error verifying certificate:', err);
        setError('Error al verificar el certificado. Por favor intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCertificateData();
  }, [certificateId]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error || !result) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Verificación Fallida</CardTitle>
            <CardDescription>No se pudo verificar el certificado</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'No se pudo encontrar información sobre este certificado. Verifique el ID e intente nuevamente.'}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/certificates/verification-portal">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Portal de Verificación
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <Card>
        <CardHeader className="pb-2">
          {result.isValid ? (
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                Certificado Válido
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                Certificado No Válido
              </Badge>
            </div>
          )}
          
          <CardTitle className="text-2xl font-bold">Verificación de Certificado</CardTitle>
          <CardDescription>
            Detalles del certificado con ID: <span className="font-mono">{certificateId}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Mensaje de verificación */}
          <Alert variant={result.isValid ? "default" : "destructive"} className={result.isValid ? "bg-green-50 border-green-200 text-green-800" : ""}>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>
              {result.isValid ? "Verificación Exitosa" : "Verificación Fallida"}
            </AlertTitle>
            <AlertDescription>
              {result.message}
            </AlertDescription>
          </Alert>
          
          {/* Información del curso */}
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Información del Curso</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Curso</p>
                <p className="font-medium">{result.course?.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Descripción</p>
                <p>{result.course?.description}</p>
              </div>
            </div>
          </div>
          
          {/* Información del estudiante */}
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Información del Estudiante</h3>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Nombre completo</p>
              <p className="font-medium">{result.student?.full_name}</p>
            </div>
          </div>
          
          {/* Detalles del certificado */}
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Detalles del Certificado</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Número de Certificado</p>
                <p className="font-mono font-medium">{result.certificate?.certificate_number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge variant={result.certificate?.status === 'active' ? 'outline' : 'destructive'} className={result.certificate?.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                  {result.certificate?.status === 'active' ? 'Activo' : result.certificate?.status === 'revoked' ? 'Revocado' : 'Expirado'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Emisión</p>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p>{result.certificate?.issued_date ? format(new Date(result.certificate.issued_date), 'dd/MM/yyyy') : 'N/A'}</p>
                </div>
              </div>
              {result.certificate?.expiration_date && (
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Expiración</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p>{format(new Date(result.certificate.expiration_date), 'dd/MM/yyyy')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline">
            <Link to="/certificates/verification-portal">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Portal
            </Link>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <FileText className="mr-2 h-4 w-4" />
              Ver Certificado
            </Button>
            <Button className="flex-1 sm:flex-none">
              <Award className="mr-2 h-4 w-4" />
              Validar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CertificateVerifyPage;

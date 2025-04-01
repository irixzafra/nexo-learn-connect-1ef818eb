
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Award, FileCheck, Ban, Clock, ExternalLink, ArrowLeft, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface Certificate {
  id: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  status: 'issued' | 'revoked' | 'expired';
  user: {
    full_name: string;
  };
  course: {
    title: string;
    description: string;
    instructor: {
      full_name: string;
    };
  };
}

interface CertificateData {
  id: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  status: 'issued' | 'revoked' | 'expired';
  profiles: {
    full_name: string;
  };
  courses: {
    title: string;
    description: string;
    profiles: {
      full_name: string;
    };
  };
}

const CertificateVerifyPage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationUrl, setVerificationUrl] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (certificateId) {
      fetchCertificate(certificateId);
      
      // Set verification URL for QR code
      const baseUrl = window.location.origin;
      setVerificationUrl(`${baseUrl}/admin/certificates/verify/${certificateId}`);
    }
  }, [certificateId]);

  const fetchCertificate = async (id: string) => {
    try {
      setLoading(true);
      
      // Establecer el setting para la política RLS que permite verificar certificados
      await supabase.rpc('set_claim', {
        claim: 'app.certificate_id',
        value: id
      });
      
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          id,
          certificate_number,
          issue_date,
          expiry_date,
          status,
          profiles:user_id (
            full_name
          ),
          courses:course_id (
            title,
            description,
            profiles:instructor_id (
              full_name
            )
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our expected Certificate interface
        const certificateData = {
          id: data.id,
          certificate_number: data.certificate_number,
          issue_date: data.issue_date,
          expiry_date: data.expiry_date,
          status: data.status,
          user: {
            full_name: data.profiles?.full_name || 'Usuario desconocido'
          },
          course: {
            title: data.courses?.title || 'Curso desconocido',
            description: data.courses?.description || 'Sin descripción',
            instructor: {
              full_name: data.courses?.profiles?.full_name || 'Instructor desconocido'
            }
          }
        };
        
        setCertificate(certificateData);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error fetching certificate:', error);
      setCertificate(null);
      setError('No se pudo encontrar el certificado solicitado o no tienes permisos para verlo.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued':
        return <FileCheck className="h-8 w-8 text-green-600" />;
      case 'revoked':
        return <Ban className="h-8 w-8 text-red-600" />;
      case 'expired':
        return <Clock className="h-8 w-8 text-amber-600" />;
      default:
        return <Award className="h-8 w-8 text-primary" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'issued':
        return 'Certificado válido y vigente';
      case 'revoked':
        return 'Este certificado ha sido revocado';
      case 'expired':
        return 'Este certificado ha expirado';
      default:
        return 'Estado desconocido';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'revoked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificado ${certificate?.certificate_number}`,
        text: `Verificar certificado de ${certificate?.user.full_name} para el curso ${certificate?.course.title}`,
        url: window.location.href,
      }).catch((error) => {
        console.error('Error sharing:', error);
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado al portapapeles');
  };

  const downloadCertificateInfo = () => {
    if (!certificate) return;
    
    const certificateInfo = {
      certificateNumber: certificate.certificate_number,
      studentName: certificate.user.full_name,
      courseName: certificate.course.title,
      issueDate: new Date(certificate.issue_date).toLocaleDateString(),
      expiryDate: certificate.expiry_date ? new Date(certificate.expiry_date).toLocaleDateString() : 'No expira',
      status: getStatusText(certificate.status),
      verificationUrl: window.location.href
    };
    
    const blob = new Blob([JSON.stringify(certificateInfo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate_${certificate.certificate_number}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Información del certificado descargada');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>
      
      <div className="text-center mb-8">
        <Award className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Verificación de Certificado</h1>
        <p className="text-muted-foreground mt-2">
          Compruebe la autenticidad de un certificado emitido por nuestra plataforma.
        </p>
      </div>
      
      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ) : error ? (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Ban className="h-5 w-5" />
              Error de verificación
            </CardTitle>
            <CardDescription>
              No se pudo verificar el certificado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => navigate('/admin/certificates')}>
              Volver al listado de certificados
            </Button>
          </CardFooter>
        </Card>
      ) : certificate ? (
        <Card className={`border-2 ${getStatusClass(certificate.status)}`}>
          <CardHeader className={`bg-opacity-30 ${certificate.status === 'issued' ? 'bg-green-50' : certificate.status === 'revoked' ? 'bg-red-50' : 'bg-amber-50'}`}>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Certificado {certificate.certificate_number}</CardTitle>
                <CardDescription className="mt-1">
                  Emitido el {new Date(certificate.issue_date).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className={getStatusClass(certificate.status)}>
                {getStatusText(certificate.status)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center justify-center mb-4">
              {getStatusIcon(certificate.status)}
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium text-lg mb-1">Certificado otorgado a:</h3>
                <p className="text-2xl font-semibold">{certificate.user.full_name}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-1">Por completar el curso:</h3>
                <p className="text-xl font-medium">{certificate.course.title}</p>
                <p className="text-muted-foreground mt-1">{certificate.course.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-1">Instructor:</h3>
                <p>{certificate.course.instructor.full_name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-md mb-1">Fecha de emisión:</h3>
                  <p>{new Date(certificate.issue_date).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-md mb-1">Fecha de expiración:</h3>
                  <p>{certificate.expiry_date ? new Date(certificate.expiry_date).toLocaleDateString() : 'No expira'}</p>
                </div>
              </div>
              
              {/* QR Code for verification */}
              <div className="flex flex-col items-center justify-center border rounded-md p-4 bg-white">
                <h3 className="font-medium text-md mb-3">Código de verificación</h3>
                <QRCodeSVG
                  value={verificationUrl}
                  size={150}
                  includeMargin={true}
                  level="H"
                />
                <p className="text-xs text-muted-foreground mt-3">Escanee para verificar este certificado</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col space-y-4">
            <div className="w-full flex flex-col sm:flex-row gap-2">
              <Button variant="default" onClick={shareCertificate} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir Certificado
              </Button>
              <Button variant="outline" onClick={downloadCertificateInfo} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Descargar Info
              </Button>
            </div>
            
            <div className="w-full pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Este certificado puede ser verificado en cualquier momento utilizando el siguiente enlace:
              </p>
              <div className="flex items-center mt-2">
                <code className="bg-muted p-2 rounded text-sm flex-1 overflow-x-auto">
                  {verificationUrl}
                </code>
                <Button variant="ghost" size="icon" className="ml-2" onClick={copyToClipboard}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  );
};

export default CertificateVerifyPage;

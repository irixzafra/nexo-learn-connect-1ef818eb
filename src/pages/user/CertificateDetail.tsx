
import React from 'react';
import { useParams } from 'react-router-dom';
import { Award, Download, Link as LinkIcon, Calendar, ArrowLeft, Share2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import PageSection from '@/components/layout/page/PageSection';
import { toast } from 'sonner';

const CertificateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // En un caso real, obtendrías esta información de una API
  const certificate = {
    id: id || 'unknown',
    name: 'Fundamentos de React',
    courseName: 'Desarrollo Web con React',
    courseId: 'course-001',
    instructor: 'Alejandro Rodríguez',
    issueDate: '15/04/2023',
    expiryDate: '15/04/2025',
    status: 'valid',
    description: 'Este certificado acredita que el estudiante ha completado satisfactoriamente el curso de Fundamentos de React, demostrando conocimientos avanzados en el desarrollo de aplicaciones web con React.',
    skills: ['React.js', 'JavaScript', 'Estado y Props', 'Hooks', 'Context API', 'Routing'],
    hours: 40,
    verificationUrl: `https://example.com/verify/cert-001`
  };

  const handleCopyVerificationLink = () => {
    navigator.clipboard.writeText(certificate.verificationUrl)
      .then(() => toast.success('Enlace copiado al portapapeles'))
      .catch(() => toast.error('No se pudo copiar el enlace'));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Detalle del Certificado"
        breadcrumbs={[
          { title: 'Home', href: '/home' },
          { title: 'Certificados', href: '/certificates' },
          { title: certificate.name },
        ]}
        actions={[
          {
            label: 'Volver',
            icon: <ArrowLeft className="h-4 w-4 mr-2" />,
            variant: 'outline',
            href: '/certificates'
          },
          {
            label: 'Descargar PDF',
            icon: <Download className="h-4 w-4 mr-2" />,
            variant: 'default',
          }
        ]}
      />

      <PageContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PageSection variant="card">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{certificate.name}</h2>
                  <p className="text-muted-foreground">{certificate.courseName}</p>
                </div>
                
                <div className="max-w-xl mx-auto">
                  <p className="text-base text-foreground">
                    {certificate.description}
                  </p>
                </div>

                <div className="mt-8 w-full">
                  <Separator className="mb-8" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 text-left">
                      <h3 className="text-sm font-medium text-muted-foreground">Fecha de emisión</h3>
                      <p className="text-base flex items-center">
                        <Calendar className="h-4 w-4 mr-2 inline text-muted-foreground" />
                        {certificate.issueDate}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <h3 className="text-sm font-medium text-muted-foreground">Válido hasta</h3>
                      <p className="text-base flex items-center">
                        <Calendar className="h-4 w-4 mr-2 inline text-muted-foreground" />
                        {certificate.expiryDate}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <h3 className="text-sm font-medium text-muted-foreground">ID del Certificado</h3>
                      <p className="text-base font-mono text-sm">{certificate.id}</p>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
                      <Badge variant={certificate.status === 'valid' ? 'default' : 'destructive'}>
                        {certificate.status === 'valid' ? 'Válido' : 'Expirado'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </PageSection>

            <PageSection 
              title="Habilidades adquiridas" 
              description="Competencias acreditadas por este certificado"
              variant="card"
            >
              <div className="flex flex-wrap gap-2 pt-2">
                {certificate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </PageSection>
          </div>

          <div className="space-y-6">
            <PageSection variant="card">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium">Verificación</h3>
                </div>
                
                <div className="pt-2 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Este certificado puede ser verificado utilizando el enlace a continuación:
                  </p>
                  
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        readOnly 
                        value={certificate.verificationUrl}
                        className="w-full pr-10 text-xs bg-muted rounded-md p-2 font-mono"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full"
                        onClick={handleCopyVerificationLink}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleCopyVerificationLink}>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Copiar enlace
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir certificado
                  </Button>
                </div>
              </div>
            </PageSection>

            <PageSection variant="card">
              <div className="space-y-4">
                <h3 className="font-medium">Detalles del curso</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Instructor</span>
                    <span className="text-sm font-medium">{certificate.instructor}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duración del curso</span>
                    <span className="text-sm font-medium">{certificate.hours} horas</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ID del curso</span>
                    <span className="text-sm font-mono">{certificate.courseId}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/courses/${certificate.courseId}`}>
                    Ver curso
                  </a>
                </Button>
              </div>
            </PageSection>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default CertificateDetail;

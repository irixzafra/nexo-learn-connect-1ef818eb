
import React from 'react';
import { Award, Download, Search, Filter, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import PageSection from '@/components/layout/page/PageSection';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Datos de ejemplo
const certificates = [
  {
    id: 'cert-001',
    name: 'Fundamentos de React',
    issueDate: '15/04/2023',
    expiryDate: '15/04/2025',
    status: 'valid',
    courseId: 'course-001',
    courseName: 'Desarrollo Web con React',
  },
  {
    id: 'cert-002',
    name: 'JavaScript Avanzado',
    issueDate: '20/02/2023',
    expiryDate: '20/02/2025',
    status: 'valid',
    courseId: 'course-002',
    courseName: 'JavaScript Moderno',
  },
  {
    id: 'cert-003',
    name: 'Diseño UX/UI',
    issueDate: '10/12/2022',
    expiryDate: '10/12/2024',
    status: 'valid',
    courseId: 'course-003',
    courseName: 'Fundamentos de Diseño UX',
  },
  {
    id: 'cert-004',
    name: 'Node.js Básico',
    issueDate: '05/08/2022',
    expiryDate: '05/08/2023',
    status: 'expired',
    courseId: 'course-004',
    courseName: 'Backend con Node.js',
  }
];

const CertificatesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Mis Certificados"
        description="Visualiza y descarga tus certificados de cursos completados"
        breadcrumbs={[
          { title: 'Home', href: '/home' },
          { title: 'Certificados' },
        ]}
        actions={[
          {
            label: 'Verificar certificado',
            icon: <Award className="mr-2 h-4 w-4" />,
            variant: 'outline',
            href: '/certificates/verify'
          }
        ]}
      />

      <PageContent>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="valid">Válidos</TabsTrigger>
              <TabsTrigger value="expired">Expirados</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar certificado..."
                  className="pl-8 w-[200px] lg:w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            <PageSection variant="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificado</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Fecha Emisión
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Validez
                      </div>
                    </TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">{cert.name}</TableCell>
                      <TableCell>{cert.courseName}</TableCell>
                      <TableCell>{cert.issueDate}</TableCell>
                      <TableCell>{cert.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant={cert.status === 'valid' ? 'default' : 'destructive'}>
                          {cert.status === 'valid' ? 'Válido' : 'Expirado'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            asChild
                          >
                            <a href={`/certificates/${cert.id}`} target="_blank" rel="noopener noreferrer">
                              Ver
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PageSection>
          </TabsContent>

          <TabsContent value="valid" className="mt-4">
            <PageSection variant="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificado</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead>Validez</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.filter(cert => cert.status === 'valid').map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">{cert.name}</TableCell>
                      <TableCell>{cert.courseName}</TableCell>
                      <TableCell>{cert.issueDate}</TableCell>
                      <TableCell>{cert.expiryDate}</TableCell>
                      <TableCell>
                        <Badge>Válido</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            asChild
                          >
                            <a href={`/certificates/${cert.id}`} target="_blank" rel="noopener noreferrer">
                              Ver
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PageSection>
          </TabsContent>

          <TabsContent value="expired" className="mt-4">
            <PageSection variant="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificado</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead>Validez</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.filter(cert => cert.status === 'expired').map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">{cert.name}</TableCell>
                      <TableCell>{cert.courseName}</TableCell>
                      <TableCell>{cert.issueDate}</TableCell>
                      <TableCell>{cert.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Expirado</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            asChild
                          >
                            <a href={`/certificates/${cert.id}`} target="_blank" rel="noopener noreferrer">
                              Ver
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PageSection>
          </TabsContent>
        </Tabs>

        <PageSection
          title="Sobre los certificados"
          description="Información importante sobre tus certificados"
          variant="card"
          className="mt-6"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Los certificados son emitidos al completar satisfactoriamente todos los requisitos de un curso. 
              Tienen una validez de 2 años desde la fecha de emisión. Puedes descargarlos en formato PDF o 
              compartir un enlace verificable para validar su autenticidad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Verificación</CardTitle>
                  <CardDescription>Para terceros</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cualquier persona puede verificar la autenticidad de tu certificado 
                    utilizando el código QR o el ID único que aparece en el mismo.
                  </p>
                  <Button variant="outline" className="mt-4" size="sm">
                    Cómo verificar
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Actualización</CardTitle>
                  <CardDescription>Mantén tus certificados vigentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Para renovar un certificado expirado, puedes realizar un curso 
                    de actualización o pagar una cuota de renovación.
                  </p>
                  <Button variant="outline" className="mt-4" size="sm">
                    Políticas de renovación
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageSection>
      </PageContent>
    </div>
  );
};

export default CertificatesPage;

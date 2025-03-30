
import React from 'react';
import { 
  Search, 
  Download,
  CheckCircle2,
  XCircle,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  useCertificates, 
  CourseWithCertificate 
} from '@/features/admin/hooks/useCertificates';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminTableHead } from '@/components/layout/admin/AdminPageLayout';

const CertificatesStats: React.FC = () => {
  const { 
    certifiedCoursesCount, 
    totalCoursesCount, 
    certificationRate 
  } = useCertificates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Cursos con Certificado
              </p>
              <p className="text-2xl font-bold mt-1">
                {certifiedCoursesCount}
              </p>
            </div>
            <div className="bg-green-500/10 text-green-500 p-2 rounded-full">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Cursos sin Certificado
              </p>
              <p className="text-2xl font-bold mt-1">
                {totalCoursesCount - certifiedCoursesCount}
              </p>
            </div>
            <div className="bg-orange-500/10 text-orange-500 p-2 rounded-full">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tasa de Certificación
              </p>
              <p className="text-2xl font-bold mt-1">
                {certificationRate}%
              </p>
            </div>
            <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full">
              <Info className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AllCertificatesTab: React.FC = () => {
  const { 
    filteredCourses, 
    isLoading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    updateCourseCertificate 
  } = useCertificates();

  const handleToggleCertificate = (courseId: string, currentValue: boolean) => {
    updateCourseCertificate.mutate({
      courseId,
      grantsCertificate: !currentValue
    });
  };

  return (
    <div className="space-y-6">
      <CertificatesStats />
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center w-full sm:w-auto max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cursos..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportar lista de cursos con certificados</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive rounded-md p-4">
          <p className="text-destructive font-medium">Error: {error.message}</p>
        </div>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <AdminTableHead>Curso</AdminTableHead>
              <AdminTableHead>Estado</AdminTableHead>
              <AdminTableHead>Duración</AdminTableHead>
              <AdminTableHead>Fecha Actualización</AdminTableHead>
              <AdminTableHead>Certificado</AdminTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map((course: CourseWithCertificate) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    {course.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.is_published ? "success" : "secondary"}>
                      {course.is_published ? "Publicado" : "Borrador"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {course.duration ? `${course.duration} min` : "—"}
                  </TableCell>
                  <TableCell>
                    {course.updated_at ? new Date(course.updated_at).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={course.grants_certificate}
                        onCheckedChange={() => handleToggleCertificate(course.id, course.grants_certificate)}
                      />
                      <span>
                        {course.grants_certificate ? "Activado" : "Desactivado"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchTerm ? "No se encontraron resultados para la búsqueda." : "No hay cursos disponibles."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllCertificatesTab;

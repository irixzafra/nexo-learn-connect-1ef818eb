
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  ArrowUpDown, 
  Check, 
  ChevronsUpDown, 
  FileCheck, 
  MoreHorizontal, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';
import { useCertificates, CourseWithCertificate } from '@/features/admin/hooks/useCertificates';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice, formatDate, formatStatus } from '@/features/admin/utils/formatters';

const AllCertificatesTab: React.FC = () => {
  const { 
    filteredCourses, 
    isLoading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    updateCourseCertificate,
    certifiedCoursesCount,
    totalCoursesCount,
    certificationRate
  } = useCertificates();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCertificateToggle = (courseId: string, currentValue: boolean) => {
    updateCourseCertificate.mutate({
      courseId,
      grantsCertificate: !currentValue
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Error al cargar los certificados</h3>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{isLoading ? '...' : certifiedCoursesCount}</CardTitle>
            <CardDescription>Cursos con certificados</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{isLoading ? '...' : totalCoursesCount}</CardTitle>
            <CardDescription>Cursos totales</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{isLoading ? '...' : `${certificationRate}%`}</CardTitle>
            <CardDescription>Tasa de certificación</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle>Gestión de Certificados</CardTitle>
              <CardDescription>Administra qué cursos otorgan certificados al completarse</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar cursos..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Todos los cursos</DropdownMenuItem>
                  <DropdownMenuItem>Solo con certificado</DropdownMenuItem>
                  <DropdownMenuItem>Sin certificado</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Publicados</DropdownMenuItem>
                  <DropdownMenuItem>Borradores</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Curso</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Creado</TableHead>
                    <TableHead>
                      <div className="flex items-center justify-end">
                        <span>Otorga Certificado</span>
                      </div>
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No se encontraron cursos.
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredCourses?.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {course.description || 'Sin descripción'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatPrice(course.price, course.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.is_published ? 'default' : 'secondary'}>
                          {formatStatus(course.is_published ? 'published' : 'draft')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDate(course.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Switch 
                            checked={course.grants_certificate} 
                            onCheckedChange={() => handleCertificateToggle(course.id, course.grants_certificate || false)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileCheck className="h-4 w-4 mr-2" />
                              <span>Ver detalles del certificado</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <span>Editar curso</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllCertificatesTab;


import React, { useState } from 'react';
import { 
  FileText, 
  Award, 
  Printer, 
  Download, 
  Search, 
  Plus, 
  Settings, 
  MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminTableHead } from '@/components/layout/admin/AdminPageLayout';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for certificates
const mockCertificates = [
  {
    id: '1',
    title: 'Certificado de Finalización',
    course: 'Desarrollo Web con React',
    template: 'Standard',
    status: 'active',
    issuedCount: 124,
    createdAt: '2023-10-15',
  },
  {
    id: '2',
    title: 'Certificado de Participación',
    course: 'Introducción a Python',
    template: 'Premium',
    status: 'active',
    issuedCount: 56,
    createdAt: '2023-11-20',
  },
  {
    id: '3',
    title: 'Certificado de Excelencia',
    course: 'Machine Learning Avanzado',
    template: 'Gold',
    status: 'draft',
    issuedCount: 0,
    createdAt: '2023-12-05',
  },
  {
    id: '4',
    title: 'Certificado de Asistencia',
    course: 'Marketing Digital',
    template: 'Standard',
    status: 'inactive',
    issuedCount: 35,
    createdAt: '2023-09-30',
  },
];

const CertificatesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtered certificates based on search term
  const filteredCertificates = mockCertificates.filter(cert => 
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Activo</Badge>;
      case 'draft':
        return <Badge variant="outline">Borrador</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center w-full sm:w-auto max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar certificados..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Configuración</span>
          </Button>
          
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Nuevo Certificado</span>
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <AdminTableHead>Certificado</AdminTableHead>
              <AdminTableHead>Curso</AdminTableHead>
              <AdminTableHead>Plantilla</AdminTableHead>
              <AdminTableHead>Estado</AdminTableHead>
              <AdminTableHead>Emitidos</AdminTableHead>
              <AdminTableHead>Fecha</AdminTableHead>
              <AdminTableHead className="text-right">Acciones</AdminTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(4).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={7}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredCertificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron certificados
                </TableCell>
              </TableRow>
            ) : (
              filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{cert.title}</span>
                  </TableCell>
                  <TableCell>{cert.course}</TableCell>
                  <TableCell>{cert.template}</TableCell>
                  <TableCell>{getStatusBadge(cert.status)}</TableCell>
                  <TableCell>{cert.issuedCount}</TableCell>
                  <TableCell>{new Date(cert.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Award className="h-4 w-4" /> Vista previa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Printer className="h-4 w-4" /> Imprimir
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="h-4 w-4" /> Descargar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CertificatesTab;

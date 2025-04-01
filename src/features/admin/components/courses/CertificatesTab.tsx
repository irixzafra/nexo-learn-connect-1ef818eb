import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  PlusIcon, 
  FileCheck, 
  Download, 
  Search, 
  Award, 
  Clock,
  AlertTriangle,
  Check,
  Ban
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@/components/ui/date-picker';

interface Certificate {
  id: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  status: 'issued' | 'revoked' | 'expired';
  user: {
    full_name: string;
    email: string;
  };
}

interface CertificatesTabProps {
  course?: any;
}

const CertificatesTab: React.FC<CertificatesTabProps> = ({ course }) => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [newCertificate, setNewCertificate] = useState({
    userId: '',
    expiryDate: null as Date | null,
  });
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    if (course?.id) {
      fetchCertificates();
      fetchEnrolledStudents();
    }
  }, [course?.id]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          id,
          certificate_number,
          issue_date,
          expiry_date,
          status,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .eq('course_id', course?.id)
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      
      const formattedData = data.map((cert: any) => ({
        id: cert.id,
        certificate_number: cert.certificate_number,
        issue_date: cert.issue_date,
        expiry_date: cert.expiry_date,
        status: cert.status,
        user: {
          full_name: cert.profiles?.full_name || 'Usuario desconocido',
          email: cert.profiles?.email || 'Sin email'
        }
      }));
      
      setCertificates(formattedData);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast.error('No se pudieron cargar los certificados');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledStudents = async () => {
    try {
      setLoadingStudents(true);
      
      const { data, error } = await supabase.rpc('get_course_enrollments_with_details', {
        course_id_param: course?.id
      });
      
      if (error) throw error;
      
      const { data: existingCertificates, error: certError } = await supabase
        .from('certificates')
        .select('user_id')
        .eq('course_id', course?.id)
        .eq('status', 'issued');
      
      if (certError) throw certError;
      
      const certificateUserIds = new Set(existingCertificates.map(cert => cert.user_id));
      const eligibleStudents = data.filter((student: any) => !certificateUserIds.has(student.user_id));
      
      setStudents(eligibleStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('No se pudieron cargar los estudiantes');
    } finally {
      setLoadingStudents(false);
    }
  };

  const createCertificate = async () => {
    try {
      if (!newCertificate.userId) {
        toast.error('Debe seleccionar un estudiante');
        return;
      }
      
      const { data: certNumberData, error: certNumberError } = await supabase
        .rpc('generate_certificate_number');
      
      if (certNumberError) throw certNumberError;
      
      const { data, error } = await supabase
        .from('certificates')
        .insert([
          {
            course_id: course?.id,
            user_id: newCertificate.userId,
            certificate_number: certNumberData,
            expiry_date: newCertificate.expiryDate,
            verification_url: `${window.location.origin}/admin/certificates/verify/`
          }
        ])
        .select();
      
      if (error) throw error;
      
      const certId = data[0].id;
      const { error: updateError } = await supabase
        .from('certificates')
        .update({ verification_url: `${window.location.origin}/admin/certificates/verify/${certId}` })
        .eq('id', certId);
      
      if (updateError) throw updateError;
      
      toast.success('Certificado creado con éxito');
      setIsCreateDialogOpen(false);
      fetchCertificates();
      
      setNewCertificate({
        userId: '',
        expiryDate: null
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      toast.error('No se pudo crear el certificado');
    }
  };

  const revokeCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .update({ status: 'revoked' })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Certificado revocado con éxito');
      setIsRevokeDialogOpen(false);
      fetchCertificates();
    } catch (error) {
      console.error('Error revoking certificate:', error);
      toast.error('No se pudo revocar el certificado');
    }
  };

  const handleVerifyCertificate = (id: string) => {
    const verificationUrl = `/admin/certificates/verify/${id}`;
    navigate(verificationUrl);
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.certificate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<Certificate>[] = [
    {
      accessorKey: 'certificate_number',
      header: "Número de Certificado",
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'user.full_name',
      header: "Estudiante",
      cell: info => (
        <div>
          <div>{info.row.original.user.full_name}</div>
          <div className="text-xs text-muted-foreground">{info.row.original.user.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'issue_date',
      header: "Fecha de Emisión",
      cell: ({ row }) => {
        const date = new Date(row.original.issue_date);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: 'expiry_date',
      header: "Fecha de Expiración",
      cell: ({ row }) => {
        return row.original.expiry_date 
          ? new Date(row.original.expiry_date).toLocaleDateString()
          : 'No expira';
      },
    },
    {
      accessorKey: 'status',
      header: "Estado",
      cell: ({ row }) => {
        const status = row.original.status;
        
        if (status === 'issued') {
          return <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" /> Emitido</Badge>;
        } else if (status === 'revoked') {
          return <Badge className="bg-red-100 text-red-800"><Ban className="h-3 w-3 mr-1" /> Revocado</Badge>;
        } else {
          return <Badge className="bg-amber-100 text-amber-800"><Clock className="h-3 w-3 mr-1" /> Expirado</Badge>;
        }
      },
    },
    {
      id: 'actions',
      header: "Acciones",
      cell: ({ row }) => {
        const cert = row.original;
        
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleVerifyCertificate(cert.id)}
            >
              <Search className="h-4 w-4 mr-1" />
              Verificar
            </Button>
            
            {cert.status === 'issued' && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  setSelectedCertificate(cert);
                  setIsRevokeDialogOpen(true);
                }}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Revocar
              </Button>
            )}
          </div>
        );
      },
    }
  ];

  const table = useReactTable({
    data: filteredCertificates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (!course?.id) {
    return (
      <PageSection variant="card" title="Certificados" description="Gestión de certificados del curso">
        <div className="text-center py-8">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No se puede cargar la información</h3>
          <p className="text-muted-foreground mb-4">
            No se ha encontrado la información del curso.
          </p>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant="card" title="Certificados" description="Gestión de certificados del curso">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        <div className="flex-1 w-full md:max-w-sm">
          <Input
            placeholder="Buscar por número o estudiante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <Button
            onClick={() => {
              if (!course.grants_certificate) {
                supabase
                  .from('courses')
                  .update({ grants_certificate: true })
                  .eq('id', course.id)
                  .then(({ error }) => {
                    if (error) {
                      console.error('Error updating course:', error);
                      toast.error('No se pudo habilitar los certificados para este curso');
                    } else {
                      toast.success('Certificados habilitados para este curso');
                    }
                  });
              }
              
              setIsCreateDialogOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Emitir Certificado
          </Button>
        </div>
      </div>
      
      {course.grants_certificate ? (
        <Badge className="mb-4 bg-green-100 text-green-800">
          <FileCheck className="h-4 w-4 mr-1" />
          Este curso otorga certificados
        </Badge>
      ) : (
        <Badge className="mb-4 bg-amber-100 text-amber-800">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Este curso no otorga certificados actualmente
        </Badge>
      )}

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableCaption>Lista de certificados emitidos para este curso.</TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se encontraron certificados para este curso.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4 px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emitir nuevo certificado</DialogTitle>
            <DialogDescription>
              Complete la información para emitir un certificado a un estudiante.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student">Estudiante</Label>
              <select
                id="student"
                className="w-full p-2 border rounded-md"
                value={newCertificate.userId}
                onChange={(e) => setNewCertificate({...newCertificate, userId: e.target.value})}
              >
                <option value="">Seleccionar estudiante</option>
                {loadingStudents ? (
                  <option disabled>Cargando estudiantes...</option>
                ) : (
                  students.map(student => (
                    <option key={student.user_id} value={student.user_id}>
                      {student.full_name}
                    </option>
                  ))
                )}
              </select>
              {students.length === 0 && !loadingStudents && (
                <p className="text-sm text-amber-500">
                  No hay estudiantes elegibles para recibir certificado.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Fecha de expiración (opcional)</Label>
              <DatePicker
                date={newCertificate.expiryDate}
                onDateChange={(date) => setNewCertificate({...newCertificate, expiryDate: date})}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Si no se establece, el certificado no tendrá fecha de expiración.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={createCertificate}>
              Emitir Certificado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revocar certificado</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea revocar este certificado? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedCertificate && (
              <div className="space-y-2">
                <p><strong>Número de certificado:</strong> {selectedCertificate.certificate_number}</p>
                <p><strong>Estudiante:</strong> {selectedCertificate.user.full_name}</p>
                <p><strong>Fecha de emisión:</strong> {new Date(selectedCertificate.issue_date).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedCertificate && revokeCertificate(selectedCertificate.id)}
            >
              Revocar Certificado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageSection>
  );
};

export default CertificatesTab;

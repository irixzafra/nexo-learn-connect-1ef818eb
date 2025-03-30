
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Users, AlertCircle, RefreshCw, Trash2, Download, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/features/admin/utils/formatters";
import { useCourseEnrollments } from "@/features/admin/hooks/useCourseEnrollments";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EnrolledStudentsListProps {
  courseId: string;
}

interface CSVFieldOption {
  id: string;
  label: string;
  field: keyof EnrolledStudent | string;
  checked: boolean;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ courseId }) => {
  const { 
    enrolledStudents, 
    isLoading, 
    error, 
    refetch 
  } = useCourseEnrollments(courseId);
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [csvFields, setCsvFields] = useState<CSVFieldOption[]>([
    { id: "name", label: "Nombre", field: "full_name", checked: true },
    { id: "userId", label: "ID de Usuario", field: "user_id", checked: true },
    { id: "enrollDate", label: "Fecha de Inscripción", field: "enrolled_at", checked: true }
  ]);

  const handleDeleteEnrollment = async (enrollmentId: string) => {
    try {
      setDeletingId(enrollmentId);
      
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', enrollmentId);
      
      if (error) {
        throw error;
      }
      
      toast.success("Matrícula eliminada correctamente");
      refetch(); // Refresh the list after deletion
    } catch (error: any) {
      console.error("Error al eliminar matrícula:", error);
      toast.error(`Error al eliminar matrícula: ${error.message || "Error desconocido"}`);
    } finally {
      setDeletingId(null);
      setIsConfirmOpen(false);
    }
  };

  const openDeleteConfirm = (enrollmentId: string) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsConfirmOpen(true);
  };

  const toggleFieldSelection = (fieldId: string) => {
    setCsvFields(prevFields => 
      prevFields.map(field => 
        field.id === fieldId 
          ? { ...field, checked: !field.checked } 
          : field
      )
    );
  };

  const exportToCSV = () => {
    // Filter selected fields
    const selectedFields = csvFields.filter(field => field.checked);
    
    if (selectedFields.length === 0) {
      toast.error("Selecciona al menos un campo para exportar");
      return;
    }

    try {
      // Create CSV header
      const header = selectedFields.map(field => field.label).join(',');
      
      // Create CSV rows
      const rows = enrolledStudents.map(student => {
        return selectedFields.map(field => {
          const fieldName = field.field as keyof typeof student;
          let value = student[fieldName];
          
          // Format date values
          if (fieldName === 'enrolled_at' && value) {
            value = formatDate(value as string);
          }
          
          // Format user_id (truncate to make it shorter)
          if (fieldName === 'user_id' && value) {
            value = (value as string).substring(0, 8) + '...';
          }
          
          // Wrap strings with quotes and handle nulls
          return value ? `"${value}"` : '""';
        }).join(',');
      }).join('\n');
      
      // Combine header and rows
      const csv = `${header}\n${rows}`;
      
      // Create download link
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `estudiantes-inscritos_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExportDialogOpen(false);
      toast.success("Archivo CSV descargado correctamente");
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      toast.error("Error al generar el archivo CSV");
    }
  };

  const handleEmailContact = (student: any) => {
    // In a real application, this might open a compose email dialog
    // For now, we'll just show a toast message
    toast.info(`Contactar a ${student.full_name || 'estudiante'} vía email.`);
  };

  const handleWhatsAppContact = (student: any) => {
    // In a real application, this would open WhatsApp with the student's number
    // For now, we'll just show a toast message
    toast.info(`Contactar a ${student.full_name || 'estudiante'} vía WhatsApp.`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-2" />
        <h3 className="text-lg font-medium">Error al cargar estudiantes</h3>
        <p className="text-muted-foreground mb-4">
          {error.message || "No se pudieron cargar los estudiantes inscritos en este curso."}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (enrolledStudents.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-slate-50 dark:bg-slate-800">
        <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium mb-1">No hay estudiantes matriculados</h3>
        <p className="text-muted-foreground mb-4">
          Este curso aún no tiene estudiantes inscritos.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b flex justify-between items-center">
        <h3 className="font-medium">Total: {enrolledStudents.length} estudiantes</h3>
        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exportar Estudiantes a CSV</DialogTitle>
              <DialogDescription>
                Selecciona los campos que quieres incluir en el archivo CSV.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {csvFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={field.id} 
                    checked={field.checked}
                    onCheckedChange={() => toggleFieldSelection(field.id)}
                  />
                  <Label htmlFor={field.id}>{field.label}</Label>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>Cancelar</Button>
              <Button onClick={exportToCSV}>Descargar CSV</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>ID de Usuario</TableHead>
            <TableHead>Fecha de Inscripción</TableHead>
            <TableHead className="text-center">Contacto</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrolledStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.full_name || 'Sin nombre'}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {student.user_id.substring(0, 8)}...
              </TableCell>
              <TableCell>{formatDate(student.enrolled_at)}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEmailContact(student)}
                        >
                          <Mail className="h-4 w-4 text-blue-500" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Contactar por Email</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleWhatsAppContact(student)}
                        >
                          <Phone className="h-4 w-4 text-green-500" />
                          <span className="sr-only">WhatsApp</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Contactar por WhatsApp</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openDeleteConfirm(student.id)}
                        disabled={deletingId === student.id}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Eliminar matrícula</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar matrícula</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la matrícula del estudiante en este curso. 
              El estudiante perderá acceso al contenido y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedEnrollmentId && handleDeleteEnrollment(selectedEnrollmentId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnrolledStudentsList;

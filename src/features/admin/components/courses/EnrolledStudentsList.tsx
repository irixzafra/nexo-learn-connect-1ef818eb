
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCourseEnrollments, EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';
import { Loader2 } from 'lucide-react';

interface EnrolledStudentsListProps {
  courseId: string;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ courseId }) => {
  const { enrolledStudents, isLoading, error } = useCourseEnrollments(courseId);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = enrolledStudents?.filter(student => 
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: es });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 border rounded-lg bg-destructive/10 text-destructive">
        <p>Error al cargar los estudiantes: {error.message}</p>
        <Button variant="secondary" className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Buscar por nombre..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-semibold">{enrolledStudents.length} estudiantes</span>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>ID de Usuario</TableHead>
              <TableHead>Fecha de Inscripción</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.full_name || `Usuario ${student.user_id.substring(0, 8)}`}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {student.user_id.substring(0, 12)}...
                  </TableCell>
                  <TableCell>{formatDate(student.enrolled_at)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4 text-green-500" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchTerm 
                    ? `No se encontraron estudiantes que coincidan con "${searchTerm}"`
                    : "No hay estudiantes inscritos en este curso"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EnrolledStudentsList;

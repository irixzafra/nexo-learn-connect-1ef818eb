
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';
import StudentContactButtons from './StudentContactButtons';

interface StudentsTableProps {
  students: EnrolledStudent[];
  searchTerm: string;
  onEmailClick: (student: EnrolledStudent) => void;
  onPhoneClick: (student: EnrolledStudent) => void;
  onDeleteClick: (student: EnrolledStudent) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  searchTerm,
  onEmailClick,
  onPhoneClick,
  onDeleteClick
}) => {
  const filteredStudents = students.filter(student => 
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: es });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  return (
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
                  <StudentContactButtons
                    student={student}
                    onEmailClick={onEmailClick}
                    onPhoneClick={onPhoneClick}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteClick(student)}
                  >
                    Eliminar
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
  );
};

export default StudentsTable;

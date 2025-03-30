
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';

interface StudentContactButtonsProps {
  student: EnrolledStudent;
  onEmailClick: (student: EnrolledStudent) => void;
  onPhoneClick: (student: EnrolledStudent) => void;
}

const StudentContactButtons: React.FC<StudentContactButtonsProps> = ({
  student,
  onEmailClick,
  onPhoneClick
}) => {
  return (
    <div className="flex space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEmailClick(student)}
            className="relative"
          >
            <Mail className={`h-4 w-4 ${student.email ? 'text-blue-500' : 'text-gray-400'}`} />
            {!student.email && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full"></span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {student.email 
            ? `Enviar email a ${student.email}` 
            : "Falta email. Haz clic para añadir"}
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onPhoneClick(student)}
            className="relative"
          >
            <Phone className={`h-4 w-4 ${student.phone ? 'text-green-500' : 'text-gray-400'}`} />
            {!student.phone && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full"></span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {student.phone 
            ? `Llamar al ${student.phone}` 
            : "Falta teléfono. Haz clic para añadir"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default StudentContactButtons;

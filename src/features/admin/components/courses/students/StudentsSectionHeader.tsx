
import React from 'react';

interface StudentsSectionHeaderProps {
  courseName: string;
  showTitle: boolean;
}

const StudentsSectionHeader: React.FC<StudentsSectionHeaderProps> = ({ 
  courseName, 
  showTitle 
}) => {
  return (
    <React.Fragment>
      {showTitle && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Estudiantes Inscritos</h2>
          <p className="text-muted-foreground">Gestión de participantes del curso</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            Estudiantes Inscritos en: {courseName}
          </h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentsSectionHeader;

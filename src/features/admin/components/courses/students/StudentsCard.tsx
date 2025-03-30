
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import EnrolledStudentsList from '../EnrolledStudentsList';
import ExportButton from './ExportButton';

interface StudentsCardProps {
  courseId: string;
  enrolledCount: number;
}

const StudentsCard: React.FC<StudentsCardProps> = ({ 
  courseId,
  enrolledCount
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            Total: {enrolledCount} estudiantes
          </h3>
          <ExportButton />
        </div>
        
        <EnrolledStudentsList courseId={courseId} />
      </CardContent>
    </Card>
  );
};

export default StudentsCard;

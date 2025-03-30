
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import NotFound from '@/pages/NotFound';

const CourseNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col">
      <NotFound />
      <div className="flex justify-center mt-4">
        <Button onClick={() => navigate('/admin/courses')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Cursos
        </Button>
      </div>
    </div>
  );
};

export default CourseNotFound;

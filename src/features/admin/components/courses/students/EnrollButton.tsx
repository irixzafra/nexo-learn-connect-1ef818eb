
import React from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnrollButtonProps {
  onClick: () => void;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      className="w-full sm:w-auto"
    >
      <UserPlus className="mr-2 h-4 w-4" />
      Matricular Usuario
    </Button>
  );
};

export default EnrollButton;

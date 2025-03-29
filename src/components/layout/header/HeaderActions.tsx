
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { RoleIndicator } from './RoleIndicator';
import { ConnectionStatus } from '@/components/ConnectionStatus';

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="ml-auto flex items-center space-x-4">
      <ConnectionStatus />
      <Separator orientation="vertical" className="h-6" />
      <RoleIndicator />
      <Separator orientation="vertical" className="h-6" />
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate('/courses')}
        className="hidden md:flex"
      >
        Explorar cursos
      </Button>
    </div>
  );
};

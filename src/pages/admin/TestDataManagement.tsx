
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TestDataGenerator from '@/components/admin/TestDataGenerator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TestDataManagement: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not an admin
    if (userRole !== 'admin') {
      navigate('/unauthorized');
    }
  }, [userRole, navigate]);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/admin/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Gestión de Datos de Prueba</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Esta herramienta te permite generar y gestionar datos de prueba para la aplicación. 
          Solo los administradores tienen acceso a esta funcionalidad.
        </p>
        
        <div className="mt-8">
          <TestDataGenerator />
        </div>
      </div>
    </AppLayout>
  );
};

export default TestDataManagement;

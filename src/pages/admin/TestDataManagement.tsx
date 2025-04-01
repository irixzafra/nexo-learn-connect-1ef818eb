import React from 'react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TestDataGenerator } from '@/components/admin/test-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Database, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TestDataManagement = () => {
  const { userRole } = useAuth();
  const { featuresConfig } = useFeatures();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not an admin
    if (userRole !== 'admin') {
      navigate('/unauthorized');
    }
  }, [userRole, navigate]);

  // Si la característica está desactivada, mostrar mensaje
  if (!featuresConfig.enableTestDataGenerator) {
    return (
      <div className="container mx-auto p-6">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/admin/dashboard')}
              className="rounded-full bg-muted/30 hover:bg-muted/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Generador de Datos de Prueba
            </h1>
          </div>
          <p className="text-muted-foreground ml-12">
            Esta herramienta te permite generar y gestionar datos de prueba para la aplicación
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-dashed border-muted-foreground/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-5 w-5" />
                Característica Desactivada
              </CardTitle>
              <CardDescription>
                Esta característica no está habilitada actualmente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>El generador de datos de prueba está desactivado en la configuración del sistema.</p>
              <Button 
                variant="default" 
                onClick={() => navigate('/admin/settings')}
                className="mt-4"
              >
                Ir a Configuración del Sistema
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/admin/dashboard')}
            className="rounded-full bg-muted/30 hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            Gestión de Datos de Prueba
          </h1>
        </div>
        <p className="text-muted-foreground ml-12">
          Esta herramienta te permite generar y gestionar datos de prueba para la aplicación
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <TestDataGenerator />
      </motion.div>
    </div>
  );
};

export default TestDataManagement;

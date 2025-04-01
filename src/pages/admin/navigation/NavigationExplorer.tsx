
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Navigation, ExternalLink, Map, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NavigationExplorer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Explorador de Navegación</h1>
          <p className="text-muted-foreground">
            Herramientas para visualizar y gestionar la navegación del sistema
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Diagrama de Navegación
            </CardTitle>
            <CardDescription>
              Visualiza la estructura de navegación de forma gráfica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Ver un diagrama interactivo de la estructura de navegación del sistema, incluyendo menús y sus relaciones.</p>
            <Button onClick={() => navigate('/admin/navigation-diagram')}>
              Ver Diagrama
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              Validador de Rutas
            </CardTitle>
            <CardDescription>
              Valida las rutas del sistema y detecta problemas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Detecta enlaces rotos, rutas duplicadas y otros problemas de navegación en el sistema.</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/route-validator')}
              className="relative"
            >
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Validar Rutas
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              Documentación
            </CardTitle>
            <CardDescription>
              Documentación técnica sobre la navegación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Consulta la documentación completa sobre la estructura de navegación del sistema.</p>
            <Button variant="outline" onClick={() => window.open('/docs/ESTRUCTURA_NAVEGACION.md', '_blank')}>
              Ver Documentación
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Roadmap ERP-LMS
            </CardTitle>
            <CardDescription>
              Plan detallado de implementación ERP-LMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Consulta el roadmap completo para la implementación del sistema ERP-LMS integrado.</p>
            <Button variant="outline" onClick={() => window.open('/docs/ROADMAP_ERP_LMS.md', '_blank')}>
              Ver Roadmap
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NavigationExplorer;


import React from 'react';
import { FileText, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageSection } from '@/layouts/SectionPageLayout';

export const AdminDashboardStats: React.FC = () => {
  return (
    <PageSection
      title="Recursos y Soporte"
      description="Ayuda y herramientas para la administración"
      variant="card"
      className="order-5 md:order-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="bg-muted/40">
          <CardContent className="p-4 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Centro de Ayuda</h4>
              <p className="text-xs text-muted-foreground mt-1">Accede a guías y tutoriales</p>
              <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                Ver documentación
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardContent className="p-4 flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Contacto Técnico</h4>
              <p className="text-xs text-muted-foreground mt-1">Asistencia técnica especializada</p>
              <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                Abrir ticket
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardContent className="p-4 flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Guías de Administración</h4>
              <p className="text-xs text-muted-foreground mt-1">Manuales para administradores</p>
              <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                Ver guías
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardContent className="p-4 flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Foro de Administradores</h4>
              <p className="text-xs text-muted-foreground mt-1">Comunidad de administradores</p>
              <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-2">
                Unirse al foro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageSection>
  );
};


import React from 'react';
import { FileText, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Badge } from '@/components/ui/badge';

export const AdminDashboardStats: React.FC = () => {
  const supportResources = [
    {
      id: 1,
      icon: HelpCircle,
      title: "Centro de Ayuda",
      description: "Accede a guías y tutoriales",
      action: "Ver documentación",
      href: "#",
      status: "active"
    },
    {
      id: 2,
      icon: Mail,
      title: "Contacto Técnico",
      description: "Asistencia técnica especializada",
      action: "Abrir ticket",
      href: "#",
      status: "active"
    },
    {
      id: 3,
      icon: FileText,
      title: "Guías de Administración",
      description: "Manuales para administradores",
      action: "Ver guías",
      href: "#",
      status: "development"
    },
    {
      id: 4,
      icon: MessageSquare,
      title: "Foro de Administradores",
      description: "Comunidad de administradores",
      action: "Unirse al foro",
      href: "#",
      status: "development"
    }
  ];
  
  return (
    <PageSection
      title="Recursos y Soporte"
      description="Ayuda y herramientas para la administración"
      variant="card"
      className="order-5 md:order-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {supportResources.map(resource => (
          <Card key={resource.id} className="bg-muted/40 relative">
            <CardContent className="p-3 flex items-start gap-2">
              <resource.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{resource.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{resource.description}</p>
                <Button size="sm" variant="link" className="px-0 py-0 h-auto mt-1 text-xs">
                  {resource.action}
                </Button>
              </div>
              
              {resource.status === "development" && (
                <Badge variant="outline" className="absolute top-1 right-1 bg-blue-100 text-blue-800 text-[0.6rem] px-1 py-0 h-auto border-blue-200">
                  Desarrollo
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
};

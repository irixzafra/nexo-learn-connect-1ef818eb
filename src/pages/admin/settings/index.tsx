
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  ToggleLeft, 
  Palette, 
  Plug, 
  Database, 
  FileText, 
  BarChart, 
  Shield,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

const settingsCards = [
  {
    title: "General",
    description: "Configuración general del sistema",
    icon: Settings,
    path: "/admin/settings",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Funcionalidades",
    description: "Habilitar o deshabilitar características",
    icon: ToggleLeft,
    path: "/admin/settings/features",
    image: "https://images.unsplash.com/photo-1581093458791-9b7fa935f04b?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Diseño",
    description: "Personaliza la apariencia de la plataforma",
    icon: Palette,
    path: "/admin/settings/design",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Integraciones",
    description: "Conecta servicios externos",
    icon: Plug,
    path: "/admin/settings/integrations",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Datos",
    description: "Administra la información del sistema",
    icon: Database,
    path: "/admin/settings/data",
    image: "https://images.unsplash.com/photo-1563129017-36a5200c4f57?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Páginas",
    description: "Gestiona el contenido de la plataforma",
    icon: FileText,
    path: "/admin/settings/pages",
    image: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Analíticas",
    description: "Visualiza estadísticas y reportes",
    icon: BarChart,
    path: "/admin/settings/analytics",
    image: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Roles y Permisos",
    description: "Administra roles y permisos de usuarios",
    icon: Shield,
    path: "/admin/settings/roles",
    badge: "Nuevo",
    image: "https://images.unsplash.com/photo-1606765962248-7ff407b51667?q=80&w=2940&auto=format&fit=crop",
  },
];

const SystemSettings: React.FC = () => {
  return (
    <AdminPageLayout 
      title="Configuración del Sistema" 
      subtitle="Administra todos los aspectos de la plataforma desde un solo lugar"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Centro de Configuración</CardTitle>
            </div>
            <CardDescription>
              Selecciona una categoría para comenzar a configurar tu plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {settingsCards.map((card, index) => (
                <Link 
                  to={card.path} 
                  key={index}
                  className="group"
                >
                  <Card className="overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <div className="flex items-center gap-2">
                          <card.icon className="h-5 w-5 text-white" />
                          <h3 className="font-medium text-white">{card.title}</h3>
                          {card.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {card.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-3 pb-2">
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 pb-3">
                      <Button variant="ghost" size="sm" className="ml-auto text-xs">
                        Configurar
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentación y Recursos</CardTitle>
            <CardDescription>
              Enlaces útiles para configurar y personalizar tu plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start" asChild>
                <a href="#" target="_blank">
                  <FileText className="mr-2 h-4 w-4" /> Guía de Configuración
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="#" target="_blank">
                  <Shield className="mr-2 h-4 w-4" /> Seguridad y Permisos
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="#" target="_blank">
                  <Plug className="mr-2 h-4 w-4" /> Integraciones Disponibles
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <a href="#" target="_blank">
                  <Palette className="mr-2 h-4 w-4" /> Personalización de Temas
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default SystemSettings;

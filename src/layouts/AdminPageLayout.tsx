
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminTabItem } from '@/components/admin/AdminTabs';
import MainNavigationMenu from '@/components/layout/header/MainNavigationMenu';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Database,
  Settings,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminPageLayoutProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  backLink?: string;
  backAction?: () => void;
  actions?: React.ReactNode;
  tabs?: AdminTabItem[];
  defaultTabValue?: string;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  title,
  subtitle,
  backLink,
  backAction,
  actions,
  tabs,
  defaultTabValue
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTabValue || (tabs && tabs.length > 0 ? tabs[0].value : ''));
  
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Admin Navigation Menu */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4">
          <NavigationMenu className="py-2">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/admin/dashboard" className={navigationMenuTriggerStyle()}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  <span>Dashboard</span>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Usuarios</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/admin/users"
                        >
                          <Shield className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Gestión de Usuarios
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Administra usuarios, roles y permisos de la plataforma
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/admin/users"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Usuarios</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Gestión de cuentas de usuario
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/roles"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Roles</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Configuración de roles y permisos
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/analytics/users"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Analítica</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Estadísticas y tendencias de usuarios
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Cursos</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/admin/courses"
                        >
                          <BookOpen className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Contenido Educativo
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Gestiona cursos, categorías y certificados
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/admin/courses"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Cursos</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Administra todos los cursos
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categories"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Categorías</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Organiza tus cursos por categorías
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/learning-paths"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Rutas de Aprendizaje</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Crea rutas de formación
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/certificates"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Certificados</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Gestiona certificaciones
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/analytics/courses"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Analíticas</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Estadísticas de cursos y participación
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Finanzas</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/admin/billing"
                        >
                          <CreditCard className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Gestión Financiera
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Administra pagos y suscripciones
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/admin/billing"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Cobros</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Gestión de pagos e ingresos
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/subscriptions"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Suscripciones</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Gestiona planes de suscripción
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/analytics/finance"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Analíticas</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Reportes financieros y tendencias
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Datos</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/admin/test-data"
                        >
                          <Database className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Datos y Auditoría
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Gestiona datos del sistema y registros de actividad
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/admin/test-data"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Datos de Prueba</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Genera o elimina datos de prueba
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/audit-log"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Logs (Auditoría)</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Historial de actividades y cambios
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/analytics/data"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Analíticas</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Estadísticas de uso del sistema
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Config</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/admin/settings"
                        >
                          <Settings className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Configuración
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Personaliza los ajustes de la plataforma
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/admin/settings"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Funcionalidades</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Activa o desactiva características
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/settings/security"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Seguridad</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Configura opciones de seguridad
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/settings/appearance"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Apariencia</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Personaliza la apariencia
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/settings/content"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Contenido</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Gestiona el contenido del sitio
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/settings/analytics"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Analíticas</div>
                        <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                          Configura integraciones analíticas
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="max-w-7xl w-full mx-auto p-8">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {subtitle && (
                  <p className="text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex items-center gap-2">
                  {actions}
                </div>
              )}
            </div>
            
            {/* Tabs or Direct Content */}
            {tabs ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="bg-background">
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value} className="bg-background rounded-md border p-6 shadow-sm">
                    {tab.content}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="bg-background rounded-md border p-6 shadow-sm">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;

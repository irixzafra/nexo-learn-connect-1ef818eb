
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { GlobalDataTable } from '@/components/global-table';
import { TableColumn } from '@/components/global-table/types';
import { Badge } from '@/components/ui/badge';
import { TableDrawer } from '@/components/global-table/TableDrawer';
import { useToast } from '@/components/ui/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { 
  Toggle, 
  ToggleLeft, 
  Settings, 
  Layers, 
  Paintbrush,
  UserCheck,
  Bell,
  Shield,
  Globe,
  Code
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'platform' | 'content' | 'users' | 'appearance' | 'notification' | 'security' | 'system' | 'integration';
  status: 'active' | 'inactive' | 'experimental' | 'deprecated';
  isCore: boolean;
  requiresPermission: boolean;
  updatedAt: string;
}

// Helper function to get icon by category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'platform': return <Settings className="h-4 w-4" />;
    case 'content': return <Layers className="h-4 w-4" />;
    case 'appearance': return <Paintbrush className="h-4 w-4" />;
    case 'users': return <UserCheck className="h-4 w-4" />;
    case 'notification': return <Bell className="h-4 w-4" />;
    case 'security': return <Shield className="h-4 w-4" />;
    case 'integration': return <Globe className="h-4 w-4" />;
    default: return <Code className="h-4 w-4" />;
  }
};

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="success" className="bg-green-600">Activa</Badge>;
    case 'inactive':
      return <Badge variant="outline">Inactiva</Badge>;
    case 'experimental':
      return <Badge variant="default" className="bg-amber-500">Experimental</Badge>;
    case 'deprecated':
      return <Badge variant="destructive">Obsoleta</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const FeatureManagement: React.FC = () => {
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for features (in a real app, this would come from your API/database)
  const [features] = useState<Feature[]>([
    {
      id: "feature-1",
      name: "Gestión de usuarios",
      description: "Permite a los administradores crear, editar y eliminar usuarios del sistema",
      category: "users",
      status: "active",
      isCore: true,
      requiresPermission: true,
      updatedAt: "2023-04-15T10:30:00Z"
    },
    {
      id: "feature-2",
      name: "Gestión de roles",
      description: "Permite definir roles de usuario con diferentes permisos",
      category: "security",
      status: "active",
      isCore: true,
      requiresPermission: true,
      updatedAt: "2023-04-10T14:45:00Z"
    },
    {
      id: "feature-3",
      name: "Autenticación multifactor",
      description: "Habilita la verificación en dos pasos para mayor seguridad",
      category: "security",
      status: "active",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-03-22T09:15:00Z"
    },
    {
      id: "feature-4",
      name: "Tema oscuro",
      description: "Cambia la apariencia del sistema a modo oscuro",
      category: "appearance",
      status: "active",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-02-18T16:20:00Z"
    },
    {
      id: "feature-5",
      name: "Editor de contenido avanzado",
      description: "Editor WYSIWYG con opciones avanzadas de formateo",
      category: "content",
      status: "active",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-03-05T11:40:00Z"
    },
    {
      id: "feature-6",
      name: "Notificaciones en tiempo real",
      description: "Sistema de alertas instantáneas para eventos importantes",
      category: "notification",
      status: "experimental",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-04-02T13:10:00Z"
    },
    {
      id: "feature-7",
      name: "Analíticas avanzadas",
      description: "Estadísticas detalladas sobre uso del sistema",
      category: "platform",
      status: "inactive",
      isCore: false,
      requiresPermission: true,
      updatedAt: "2023-01-25T08:50:00Z"
    },
    {
      id: "feature-8",
      name: "Importación de datos",
      description: "Herramienta para importar datos desde Excel y CSV",
      category: "system",
      status: "active",
      isCore: false,
      requiresPermission: true,
      updatedAt: "2023-03-12T15:30:00Z"
    },
    {
      id: "feature-9",
      name: "Exportación de informes",
      description: "Generación de informes en múltiples formatos",
      category: "system",
      status: "active",
      isCore: false,
      requiresPermission: true,
      updatedAt: "2023-02-28T10:20:00Z"
    },
    {
      id: "feature-10",
      name: "API para desarrolladores",
      description: "Acceso externo a funcionalidades del sistema mediante API REST",
      category: "integration",
      status: "experimental",
      isCore: false,
      requiresPermission: true,
      updatedAt: "2023-04-08T14:00:00Z"
    },
    {
      id: "feature-11",
      name: "Motor de búsqueda avanzado",
      description: "Búsqueda con filtros avanzados y relevancia",
      category: "content",
      status: "active",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-03-18T09:40:00Z"
    },
    {
      id: "feature-12",
      name: "Sincronización con servicios externos",
      description: "Integración con plataformas de terceros",
      category: "integration",
      status: "inactive",
      isCore: false,
      requiresPermission: true,
      updatedAt: "2023-02-15T11:25:00Z"
    },
    {
      id: "feature-13",
      name: "Gamificación",
      description: "Sistema de puntos, insignias y logros para usuarios",
      category: "platform",
      status: "experimental",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-04-05T16:15:00Z"
    },
    {
      id: "feature-14",
      name: "Auditoría de acciones",
      description: "Registro detallado de todas las acciones realizadas en el sistema",
      category: "security",
      status: "active",
      isCore: true,
      requiresPermission: true,
      updatedAt: "2023-03-28T13:50:00Z"
    },
    {
      id: "feature-15",
      name: "Personalización de interfaz",
      description: "Ajustes de UI para adaptarse a las preferencias del usuario",
      category: "appearance",
      status: "active",
      isCore: false,
      requiresPermission: false,
      updatedAt: "2023-02-20T10:30:00Z"
    }
  ]);

  // Define table columns
  const columns: TableColumn<Feature>[] = [
    {
      id: "name",
      header: "Nombre",
      accessorKey: "name",
      type: 'text',
      required: true,
      editable: true,
      cell: ({ getValue }) => (
        <div className="font-medium">{getValue() as string}</div>
      )
    },
    {
      id: "category",
      header: "Categoría",
      accessorKey: "category",
      type: 'select',
      editable: true,
      options: [
        { label: 'Plataforma', value: 'platform' },
        { label: 'Contenido', value: 'content' },
        { label: 'Usuarios', value: 'users' },
        { label: 'Apariencia', value: 'appearance' },
        { label: 'Notificaciones', value: 'notification' },
        { label: 'Seguridad', value: 'security' },
        { label: 'Sistema', value: 'system' },
        { label: 'Integración', value: 'integration' },
      ],
      cell: ({ getValue }) => {
        const category = getValue() as string;
        const labels: Record<string, string> = {
          platform: 'Plataforma',
          content: 'Contenido',
          users: 'Usuarios',
          appearance: 'Apariencia',
          notification: 'Notificaciones',
          security: 'Seguridad',
          system: 'Sistema',
          integration: 'Integración'
        };
        
        return (
          <div className="flex items-center gap-2">
            {getCategoryIcon(category)}
            <span>{labels[category] || category}</span>
          </div>
        );
      }
    },
    {
      id: "status",
      header: "Estado",
      accessorKey: "status",
      type: 'select',
      editable: true,
      options: [
        { label: 'Activa', value: 'active' },
        { label: 'Inactiva', value: 'inactive' },
        { label: 'Experimental', value: 'experimental' },
        { label: 'Obsoleta', value: 'deprecated' },
      ],
      cell: ({ getValue }) => getStatusBadge(getValue() as string)
    },
    {
      id: "isCore",
      header: "Núcleo",
      accessorKey: "isCore",
      type: 'boolean',
      editable: true,
      cell: ({ getValue }) => (
        <div className="text-center">
          {getValue() ? (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              Esencial
            </Badge>
          ) : null}
        </div>
      )
    },
    {
      id: "requiresPermission",
      header: "Permisos",
      accessorKey: "requiresPermission",
      type: 'boolean',
      editable: true,
      cell: ({ getValue }) => (
        <div className="text-center">
          {getValue() ? (
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              Restringida
            </Badge>
          ) : null}
        </div>
      )
    },
    {
      id: "updatedAt",
      header: "Actualizado",
      accessorKey: "updatedAt",
      type: 'date',
      editable: false,
    },
  ];

  // Handler for creating a new feature
  const handleCreate = () => {
    setSelectedFeature(null);
    setIsDrawerOpen(true);
  };

  // Handler for editing an existing feature
  const handleEdit = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsDrawerOpen(true);
  };

  // Handler for toggling a feature's status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your API
      // For now, let's simulate a status toggle
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      toast({
        title: "Estado actualizado",
        description: `La funcionalidad ha cambiado a "${newStatus === 'active' ? 'Activa' : 'Inactiva'}"`,
      });
      
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la funcionalidad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for form submission (create/update)
  const handleSubmit = async (data: Feature) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your API
      if (selectedFeature) {
        // Update existing feature
        toast({
          title: "Funcionalidad actualizada",
          description: "La funcionalidad ha sido actualizada correctamente",
        });
      } else {
        // Create new feature
        toast({
          title: "Funcionalidad creada",
          description: "La funcionalidad ha sido creada correctamente",
        });
      }
      
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error al guardar funcionalidad:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la funcionalidad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader 
          title="Gestión de Funcionalidades" 
          description="Administra todas las funcionalidades disponibles en el sistema"
        />
        
        <GlobalDataTable
          tableName="features"
          title="Funcionalidades del Sistema"
          description="Lista completa de funcionalidades disponibles"
          columns={columns}
          data={features}
          searchPlaceholder="Buscar funcionalidades..."
          searchColumn="name"
          showSearch={true}
          exportable={true}
          exportFilename="funcionalidades-sistema"
          onCreate={handleCreate}
          onEdit={handleEdit}
          createButtonLabel="Agregar Funcionalidad"
          emptyState={
            <div className="flex flex-col items-center justify-center py-10">
              <ToggleLeft className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center">No hay funcionalidades definidas</p>
            </div>
          }
        />
        
        <TableDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedFeature ? "Editar Funcionalidad" : "Crear Funcionalidad"}
          data={selectedFeature}
          columns={columns}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default FeatureManagement;

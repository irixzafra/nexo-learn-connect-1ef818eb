
export interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'platform' | 'content' | 'users' | 'appearance' | 'notification' | 'security' | 'system' | 'integration';
  status: 'active' | 'inactive' | 'experimental' | 'deprecated';
  isCore: boolean;
  requiresPermission: boolean;
  updatedAt: string;
}

export const features: Feature[] = [
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
];

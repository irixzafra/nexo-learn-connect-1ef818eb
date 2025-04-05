
import React from 'react';
import { 
  Settings, 
  Layers, 
  Paintbrush,
  UserCheck,
  Bell,
  Shield,
  Globe,
  Code
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const getCategoryIcon = (category: string) => {
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

export const getStatusBadge = (status: string) => {
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

export const getCategoryLabel = (category: string): string => {
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
  
  return labels[category] || category;
};

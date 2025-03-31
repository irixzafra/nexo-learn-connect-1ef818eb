
import React from 'react';
import { AlertCircle, CheckCircle, Bell, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AdminDashboardAlerts: React.FC = () => {
  const systemAlerts = [
    {
      id: 1,
      type: "default",
      title: "Actualización de Seguridad Pendiente",
      description: "Se recomienda actualizar los módulos de seguridad a la última versión.",
      icon: <ShieldAlert className="h-4 w-4" />,
      time: "Hace 1 día"
    },
    {
      id: 2,
      type: "success",
      title: "Auditoría Completada",
      description: "La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.",
      icon: <CheckCircle className="h-4 w-4" />,
      time: "Hace 2 días"
    },
    {
      id: 3,
      type: "default",
      title: "Nuevos Usuarios Registrados",
      description: "12 nuevos usuarios se han registrado esta semana. Revisa sus perfiles.",
      icon: <Bell className="h-4 w-4" />,
      time: "Hace 3 días"
    }
  ];

  return (
    <div className="space-y-3">
      {systemAlerts.map(alert => (
        <Alert key={alert.id} variant={alert.type as "default" | "destructive" | "success" | null}>
          <div className="flex items-start">
            <div className="mr-2 mt-0.5">{alert.icon}</div>
            <div className="flex-1">
              <AlertTitle className="text-sm font-medium">{alert.title}</AlertTitle>
              <AlertDescription className="text-xs">{alert.description}</AlertDescription>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

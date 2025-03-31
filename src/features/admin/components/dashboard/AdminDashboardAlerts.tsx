
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AdminDashboardAlerts: React.FC = () => {
  const systemAlerts = [
    {
      id: 1,
      type: "info",
      title: "Actualización de Seguridad Pendiente",
      description: "Se recomienda actualizar los módulos de seguridad a la última versión.",
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      id: 2,
      type: "success",
      title: "Auditoría Completada",
      description: "La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.",
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-4">
      {systemAlerts.map(alert => (
        <Alert key={alert.id} variant={alert.type as "default" | "destructive" | "success" | null}>
          <div className="flex items-start">
            <div className="mr-2 mt-0.5">{alert.icon}</div>
            <div>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

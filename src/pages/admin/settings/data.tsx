
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Database, History, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const DataManagementPage: React.FC = () => {
  const [backupProgress, setBackupProgress] = React.useState(0);
  const [isBackingUp, setIsBackingUp] = React.useState(false);
  
  const handleBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast.success('Copia de seguridad completada con éxito');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <AdminPageLayout 
      title="Gestión de Datos" 
      subtitle="Administra copias de seguridad y operaciones de base de datos"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Copias de Seguridad</CardTitle>
            </div>
            <CardDescription>
              Gestiona las copias de seguridad de la base de datos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1 p-4 border rounded-md">
                  <h3 className="font-medium text-sm mb-1">Última copia de seguridad</h3>
                  <p className="text-sm text-muted-foreground">22/06/2023 14:30</p>
                </div>
                <div className="flex-1 p-4 border rounded-md">
                  <h3 className="font-medium text-sm mb-1">Programación</h3>
                  <p className="text-sm text-muted-foreground">Diaria (02:00 AM)</p>
                </div>
                <div className="flex-1 p-4 border rounded-md">
                  <h3 className="font-medium text-sm mb-1">Retención</h3>
                  <p className="text-sm text-muted-foreground">30 días</p>
                </div>
              </div>
              
              {isBackingUp && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso de la copia de seguridad</span>
                    <span>{backupProgress}%</span>
                  </div>
                  <Progress value={backupProgress} className="h-2" />
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleBackup} disabled={isBackingUp}>
                  <Database className="h-4 w-4 mr-2" />
                  Crear copia de seguridad
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar última copia
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Historial de Copias</CardTitle>
            </div>
            <CardDescription>
              Visualiza el historial de copias de seguridad realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '22/06/2023 14:30', size: '120 MB', status: 'success' },
                { date: '21/06/2023 02:00', size: '118 MB', status: 'success' },
                { date: '20/06/2023 02:00', size: '117 MB', status: 'success' },
                { date: '19/06/2023 02:00', size: '115 MB', status: 'warning' }
              ].map((backup, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{backup.date}</p>
                    <p className="text-sm text-muted-foreground">Tamaño: {backup.size}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {backup.status === 'warning' && (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              Ver historial completo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default DataManagementPage;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  DatabaseZap, 
  Database, 
  Trash2, 
  Download, 
  Upload, 
  Users, 
  BookOpen, 
  GraduationCap,
  UserCog,
  BarChart,
  Clock,
  AlertTriangle,
  FileCode,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

interface DataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const DataSettings: React.FC<DataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dataType, setDataType] = useState<string>("users");
  const [amount, setAmount] = useState<string>("10");
  
  const handleGenerateTestData = () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast.success(`${amount} registros de ${getDataTypeName(dataType)} generados correctamente`);
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };
  
  const getDataTypeName = (type: string): string => {
    switch(type) {
      case "users": return "Usuarios";
      case "courses": return "Cursos";
      case "enrollments": return "Inscripciones";
      case "instructors": return "Instructores";
      case "lessons": return "Lecciones";
      case "comments": return "Comentarios";
      case "activity": return "Actividad";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Datos de Prueba */}
      <Card>
        <CardHeader>
          <CardTitle>Datos de Prueba</CardTitle>
          <CardDescription>
            Genera datos de prueba para desarrollo y testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enable_test_data_generator">Habilitar Generador en este Entorno</Label>
              <p className="text-sm text-muted-foreground">
                Permite la generación de datos de prueba (recomendado solo en desarrollo)
              </p>
            </div>
            <Switch 
              id="enable_test_data_generator"
              checked={featuresConfig.enable_test_data_generator || false}
              onCheckedChange={(checked) => onToggleFeature('enable_test_data_generator', checked)}
              disabled={isLoading}
            />
          </div>
          
          {(featuresConfig.enable_test_data_generator || false) && (
            <div className="rounded-md border p-4 space-y-4">
              <h3 className="font-medium">Generador de Datos</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-type">Tipo de Datos</Label>
                  <Select 
                    value={dataType} 
                    onValueChange={setDataType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Usuarios</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="courses">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Cursos</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="enrollments">
                        <div className="flex items-center">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          <span>Inscripciones</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="instructors">
                        <div className="flex items-center">
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Instructores</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="activity">
                        <div className="flex items-center">
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>Datos de Actividad</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-amount">Cantidad</Label>
                  <Input 
                    id="data-amount" 
                    type="number" 
                    min="1" 
                    max="200" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              {isGenerating ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Generando {amount} {getDataTypeName(dataType)}...</Label>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={handleGenerateTestData}
                    disabled={isLoading}
                  >
                    <DatabaseZap className="mr-2 h-4 w-4" />
                    Generar Datos
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar Datos de Prueba
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar todos los datos de prueba?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará todos los datos de prueba generados. Los datos reales
                          no se verán afectados. Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => {
                            toast.success("Datos de prueba eliminados correctamente");
                          }}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          )}
          
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">Advertencia</h3>
                <p className="text-sm text-amber-700">
                  La generación de datos de prueba solo debe utilizarse en entornos de desarrollo y prueba.
                  No genere datos de prueba en entornos de producción.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Exportación/Importación */}
      <Card>
        <CardHeader>
          <CardTitle>Exportación/Importación</CardTitle>
          <CardDescription>
            Opciones para exportar e importar datos del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="export">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </TabsTrigger>
              <TabsTrigger value="import" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Importar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="export" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Seleccionar Datos para Exportar</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-users" className="rounded" defaultChecked />
                    <Label htmlFor="export-users">Usuarios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-courses" className="rounded" defaultChecked />
                    <Label htmlFor="export-courses">Cursos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-enrollments" className="rounded" defaultChecked />
                    <Label htmlFor="export-enrollments">Inscripciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-pages" className="rounded" defaultChecked />
                    <Label htmlFor="export-pages">Páginas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="export-config" className="rounded" defaultChecked />
                    <Label htmlFor="export-config">Configuración</Label>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="export-format">Formato</Label>
                <Select defaultValue="json">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="sql">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar Datos
              </Button>
            </TabsContent>
            
            <TabsContent value="import" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Archivo para Importar</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos aceptados: JSON, CSV, SQL
                </p>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">Precaución</h3>
                    <p className="text-sm text-amber-700">
                      La importación puede sobrescribir datos existentes. Asegúrese de hacer una
                      copia de seguridad antes de proceder.
                    </p>
                  </div>
                </div>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Iniciar Importación
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Auditoría */}
      <Card>
        <CardHeader>
          <CardTitle>Auditoría</CardTitle>
          <CardDescription>
            Registro de actividades y cambios en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Registro de Auditoría</h3>
                <p className="text-sm text-muted-foreground">
                  Visualiza el historial de acciones realizadas en el sistema
                </p>
              </div>
            </div>
            <Button>
              Ver Log de Auditoría
            </Button>
          </div>
          
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">Configuración de Retención</h3>
            <div className="flex items-center space-x-4">
              <Label htmlFor="retention-period" className="whitespace-nowrap">Mantener logs por</Label>
              <Select defaultValue="90">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 días</SelectItem>
                  <SelectItem value="90">90 días</SelectItem>
                  <SelectItem value="180">6 meses</SelectItem>
                  <SelectItem value="365">1 año</SelectItem>
                  <SelectItem value="0">Indefinidamente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Base de Datos */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas de Base de Datos</CardTitle>
          <CardDescription>
            Opciones avanzadas para administradores de base de datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Analisis y Optimización</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Herramientas avanzadas para la gestión de la base de datos
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <FileCode className="mr-2 h-4 w-4" />
                    SQL Console
                  </Button>
                  <Button variant="outline" size="sm">
                    <Info className="mr-2 h-4 w-4" />
                    Ver Estadísticas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground mb-2">
            <Info className="inline h-4 w-4 mr-1" />
            Las herramientas avanzadas de base de datos son para usuarios con experiencia.
            El uso incorrecto puede resultar en pérdida de datos.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataSettings;

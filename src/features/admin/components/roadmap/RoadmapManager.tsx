
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Clock, AlertCircle, Eye, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import useRoadmapManager from '@/features/admin/hooks/useRoadmapManager';
import { TaskStatus } from '@/features/admin/services/roadmapService';

// Componente para mostrar el estado de una tarea con un ícono
const StatusIcon: React.FC<{ status: TaskStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-gray-500" />;
    case 'review':
      return <Eye className="h-5 w-5 text-amber-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-red-500" />;
  }
};

// Componente para mostrar el texto del estado
const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const statusConfig = {
    'completed': { text: 'Completado', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
    'in-progress': { text: 'En progreso', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
    'pending': { text: 'Pendiente', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
    'review': { text: 'En revisión', className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' }
  };

  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.text}
    </Badge>
  );
};

// Componente para editar el estado de una tarea
const TaskItem: React.FC<{ 
  taskId: string;
  description: string;
  status: TaskStatus;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  isDisabled?: boolean;
}> = ({ taskId, description, status, onStatusChange, isDisabled = false }) => {
  const handleStatusChange = (newStatus: TaskStatus) => {
    if (isDisabled) return;
    onStatusChange(taskId, newStatus);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-border/60 last:border-0">
      <div className="flex items-start gap-3">
        <StatusIcon status={status} />
        <span className="text-sm">{description}</span>
      </div>
      <div className="flex gap-2 items-center">
        <StatusBadge status={status} />
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant={status === 'completed' ? 'default' : 'outline'} 
            onClick={() => handleStatusChange('completed')}
            title="Marcar como completado"
            disabled={isDisabled}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={status === 'in-progress' ? 'default' : 'outline'} 
            onClick={() => handleStatusChange('in-progress')}
            title="Marcar en progreso"
            disabled={isDisabled}
          >
            <Clock className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={status === 'pending' ? 'default' : 'outline'} 
            onClick={() => handleStatusChange('pending')}
            title="Marcar como pendiente"
            disabled={isDisabled}
          >
            <AlertCircle className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={status === 'review' ? 'default' : 'outline'} 
            onClick={() => handleStatusChange('review')}
            title="Marcar en revisión"
            disabled={isDisabled}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Estado de carga para las tareas
const TaskSkeleton: React.FC = () => (
  <div className="flex items-center justify-between p-3 border-b border-border/60 last:border-0">
    <div className="flex items-center gap-3">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 w-64" />
    </div>
    <Skeleton className="h-8 w-32" />
  </div>
);

// Componente principal para administrar el roadmap
export const RoadmapManager: React.FC = () => {
  const { 
    phases, 
    isLoading, 
    activePhase, 
    setActivePhase, 
    updateTaskStatus, 
    generateRoadmapContent, 
    calculatePhaseProgress 
  } = useRoadmapManager();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestor del Roadmap</CardTitle>
        <CardDescription>
          Administra y actualiza el estado de las tareas en el roadmap del proyecto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs 
          defaultValue={activePhase.toString()} 
          value={activePhase.toString()}
          onValueChange={(value) => setActivePhase(Number(value))}
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            {phases.map(phase => (
              <TabsTrigger key={phase.id} value={phase.id.toString()} className="text-xs">
                Fase {phase.id}
                <span className="ml-1.5 text-muted-foreground">
                  ({calculatePhaseProgress(phase.id)}%)
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {phases.map(phase => (
            <TabsContent key={phase.id} value={phase.id.toString()} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Fase {phase.id}: {phase.title}</h3>
                <Button 
                  size="sm" 
                  onClick={generateRoadmapContent}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exportar Roadmap
                </Button>
              </div>
              
              <div className="p-4 rounded-md bg-muted/40">
                <h4 className="font-medium mb-2">Objetivo:</h4>
                <p className="text-sm text-muted-foreground">{phase.objective}</p>
              </div>
              
              <div className="border rounded-md divide-y">
                <div className="p-3 bg-muted/30 font-medium text-sm">
                  Tareas clave
                </div>
                
                {isLoading ? (
                  <>
                    <TaskSkeleton />
                    <TaskSkeleton />
                    <TaskSkeleton />
                  </>
                ) : phase.tasks.length > 0 ? (
                  phase.tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      taskId={task.id}
                      description={task.description}
                      status={task.status}
                      onStatusChange={updateTaskStatus}
                      isDisabled={isLoading}
                    />
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No hay tareas definidas para esta fase
                  </div>
                )}
              </div>
              
              <div className="p-4 rounded-md bg-muted/40">
                <h4 className="font-medium mb-2">Funcionalidad desde esta fase:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {phase.functionality.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50">
                <h4 className="font-medium mb-2 text-amber-800 dark:text-amber-400">Hito:</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">{phase.milestone}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RoadmapManager;

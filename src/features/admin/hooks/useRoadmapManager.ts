
import { useState, useEffect } from 'react';
import { 
  fetchRoadmapData, 
  updateRoadmapTask, 
  exportRoadmapToMarkdown,
  RoadmapPhase,
  TaskStatus
} from '../services/roadmapService';
import { toast } from 'sonner';

export const useRoadmapManager = () => {
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activePhase, setActivePhase] = useState<number>(0);

  // Cargar datos iniciales
  useEffect(() => {
    const loadRoadmapData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRoadmapData();
        setPhases(data);
      } catch (error) {
        console.error('Error loading roadmap data:', error);
        toast.error('No se pudieron cargar los datos del roadmap');
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmapData();
  }, []);

  // Función para actualizar el estado de una tarea
  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    setIsLoading(true);
    try {
      const success = await updateRoadmapTask(taskId, newStatus);
      
      if (success) {
        // Actualizar estado local
        setPhases(prevPhases => 
          prevPhases.map(phase => ({
            ...phase,
            tasks: phase.tasks.map(task => 
              task.id === taskId 
                ? { ...task, status: newStatus } 
                : task
            )
          }))
        );
        
        toast.success('Estado de la tarea actualizado correctamente');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('No se pudo actualizar el estado de la tarea');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para generar y exportar el contenido del roadmap
  const generateRoadmapContent = async () => {
    setIsLoading(true);
    try {
      const markdownContent = await exportRoadmapToMarkdown(phases);
      
      if (markdownContent) {
        // En un caso real, esto podría descargar el archivo o mostrarlo en un modal
        console.log('Generated markdown content:', markdownContent);
        
        // Crear un elemento para descargar el archivo
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ROADMAP.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Contenido del roadmap generado y descargado correctamente');
      }
    } catch (error) {
      console.error('Error generating roadmap content:', error);
      toast.error('No se pudo generar el contenido del roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular porcentaje de progreso para una fase
  const calculatePhaseProgress = (phaseId: number) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase || phase.tasks.length === 0) return 0;
    
    const completedTasks = phase.tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = phase.tasks.filter(task => task.status === 'in-progress').length;
    
    // Completadas cuentan 100%, en progreso cuentan 50%
    return Math.round((completedTasks + inProgressTasks * 0.5) / phase.tasks.length * 100);
  };

  return {
    phases,
    isLoading,
    activePhase,
    setActivePhase,
    updateTaskStatus,
    generateRoadmapContent,
    calculatePhaseProgress
  };
};

export default useRoadmapManager;

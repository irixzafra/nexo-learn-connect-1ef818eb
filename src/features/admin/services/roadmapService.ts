
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Tipos para el roadmap
export type TaskStatus = 'completed' | 'in-progress' | 'pending' | 'review';

export interface RoadmapTask {
  id: string;
  description: string;
  status: TaskStatus;
  phase: number;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  objective: string;
  tasks: RoadmapTask[];
  functionality: string[];
  milestone: string;
}

// Función para generar el contenido markdown del roadmap
export const generateRoadmapMarkdown = (phases: RoadmapPhase[]): string => {
  // Encabezado del documento
  let markdown = `# Roadmap Definitivo: Nexo Learning ERP/LMS/Comunidad Educativa

Este roadmap está estructurado en cinco fases principales, más una fase inicial de preparación (Fase 0). Cada una tiene objetivos claros, tareas específicas y un hito que marca su finalización. El enfoque es construir una plataforma modular, robusta y preparada para el crecimiento futuro, sin comprometer calidad ni innovación.

> **Leyenda de estado:**
> - ✅ Completado
> - 🔄 En progreso
> - 🕐 Pendiente
> - 🔍 En revisión

`;

  // Generar contenido por fase
  phases.forEach(phase => {
    markdown += `\n## Fase ${phase.id}: ${phase.title}\n\n`;
    markdown += `**Objetivo:** ${phase.objective}\n\n`;
    
    markdown += `**Tareas Clave:**\n`;
    phase.tasks.forEach(task => {
      let statusIcon;
      switch (task.status) {
        case 'completed':
          statusIcon = '✅';
          break;
        case 'in-progress':
          statusIcon = '🔄';
          break;
        case 'pending':
          statusIcon = '🕐';
          break;
        case 'review':
          statusIcon = '🔍';
          break;
      }
      markdown += `- ${statusIcon} ${task.description}\n`;
    });
    
    markdown += `\n**Funcionalidad desde esta fase:**\n`;
    phase.functionality.forEach(functionality => {
      markdown += `- ${functionality}\n`;
    });
    
    markdown += `\n**Hito:** ${phase.milestone}\n`;
  });

  // Añadir secciones finales
  markdown += `
## Principios Estratégicos para Funcionalidad Temprana

Para garantizar que Nexo Learning sea funcional desde las primeras fases, este roadmap se basa en los siguientes principios:

- **Valor Incremental:** Cada fase entrega funcionalidades que los usuarios pueden utilizar de inmediato (e.g., explorar cursos en Fase 1, pagar en Fase 2).
- **Modularidad:** Las nuevas características se construyen sobre una base estable, permitiendo lanzamientos parciales sin comprometer la experiencia.
- **Feedback Continuo:** Las pruebas con usuarios desde la Fase 1 permiten ajustes basados en retroalimentación real.
- **Escalabilidad Progresiva:** La optimización del backend y la escalabilidad se abordan desde la Fase 2, preparando la plataforma para el crecimiento.
- **Innovación Gradual:** Tecnologías avanzadas como AR/VR y blockchain se integran en la Fase 5, una vez que la plataforma es estable y escalable.

## Conclusión

Este Roadmap Definitivo asegura que Nexo Learning sea funcional y valioso desde las fases tempranas, mientras evoluciona hacia una plataforma ERP/LMS/Comunidad Educativa de clase mundial. Con cada etapa entregando funcionalidades clave y preparando el terreno para el futuro, este plan está diseñado para atraer usuarios, fomentar la adopción y liderar en innovación.

**Última actualización:** ${new Date().toISOString().split('T')[0]}

**Estado global del proyecto:**
`;

  // Calcular estado global
  phases.forEach(phase => {
    const totalTasks = phase.tasks.length;
    if (totalTasks === 0) {
      markdown += `- Fase ${phase.id}: 🕐 Pendiente (0% completado)\n`;
      return;
    }
    
    const completedTasks = phase.tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = phase.tasks.filter(t => t.status === 'in-progress').length;
    
    // Completadas valen 100%, en progreso valen 50%
    const progress = Math.round((completedTasks + inProgressTasks * 0.5) / totalTasks * 100);
    
    let statusIcon = '🕐'; // Pendiente por defecto
    if (progress === 100) {
      statusIcon = '✅'; // Completado
    } else if (progress > 0) {
      statusIcon = '🔄'; // En progreso
    }
    
    markdown += `- Fase ${phase.id}: ${statusIcon} ${progress === 100 ? 'Completado' : progress > 0 ? 'En progreso' : 'Pendiente'} (${progress}% completado)\n`;
  });

  return markdown;
};

// Función para obtener los datos actuales del roadmap
export const fetchRoadmapData = async (): Promise<RoadmapPhase[]> => {
  try {
    // Intentamos obtener datos de la base de datos
    const { data: roadmapPhases, error } = await supabase
      .from('roadmap_phases')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching from Supabase:', error);
      throw error;
    }
    
    if (roadmapPhases && roadmapPhases.length > 0) {
      // Si hay datos en la base de datos, conseguimos las tareas para cada fase
      const phases: RoadmapPhase[] = [];
      
      for (const phase of roadmapPhases) {
        const { data: tasks, error: tasksError } = await supabase
          .from('roadmap_tasks')
          .select('*')
          .eq('phase', phase.id)
          .order('id');
          
        if (tasksError) {
          console.error(`Error fetching tasks for phase ${phase.id}:`, tasksError);
          continue;
        }
        
        phases.push({
          ...phase,
          tasks: tasks || []
        });
      }
      
      return phases;
    }
    
    // Si no hay datos en la base de datos, usamos datos de prueba
    return [
      {
        id: 0,
        title: "Auditoría y Estabilización Base",
        objective: "Establecer una base técnica sólida y confiable para el desarrollo.",
        tasks: [
          { id: "task-0-1", description: "Reorganizar la estructura del código para facilitar la modularidad (e.g., /src/features/).", status: "completed", phase: 0 },
          { id: "task-0-2", description: "Configurar la infraestructura backend (autenticación, políticas de seguridad, base de datos).", status: "in-progress", phase: 0 },
          { id: "task-0-3", description: "Definir y documentar el modelo de datos completo.", status: "pending", phase: 0 },
          { id: "task-0-4", description: "Auditar y eliminar código o rutas obsoletas.", status: "in-progress", phase: 0 },
          { id: "task-0-5", description: "Implementar pruebas unitarias iniciales con alta cobertura.", status: "pending", phase: 0 },
          { id: "task-0-6", description: "Documentar la arquitectura base del sistema.", status: "pending", phase: 0 },
          { id: "task-0-7", description: "Preparar datos de prueba para demostraciones internas.", status: "completed", phase: 0 }
        ],
        functionality: [
          "El equipo de desarrollo cuenta con una base de código limpia y organizada.",
          "La autenticación básica permite pruebas internas seguras.",
          "Los datos de prueba facilitan la validación de funcionalidades futuras."
        ],
        milestone: "Sistema básico funcional y listo para pruebas internas."
      },
      {
        id: 1,
        title: "Consolidación UI/UX y Núcleo del LMS",
        objective: "Crear una experiencia de usuario unificada y lanzar el núcleo del sistema educativo.",
        tasks: [
          { id: "task-1-1", description: "Estandarizar interfaces para todos los roles (admin, instructor, estudiante).", status: "in-progress", phase: 1 },
          { id: "task-1-2", description: "Desarrollar el catálogo de cursos con filtros y búsqueda avanzada.", status: "pending", phase: 1 },
          { id: "task-1-3", description: "Implementar el visualizador de lecciones con seguimiento de progreso del estudiante.", status: "pending", phase: 1 },
          { id: "task-1-4", description: "Configurar SEO básico para visibilidad en buscadores.", status: "pending", phase: 1 },
          { id: "task-1-5", description: "Asegurar responsividad y accesibilidad (cumpliendo WCAG 2.1 AA).", status: "in-progress", phase: 1 },
          { id: "task-1-6", description: "Introducir soporte multi-idioma básico (e.g., español e inglés).", status: "pending", phase: 1 },
          { id: "task-1-7", description: "Garantizar una navegación intuitiva y consistente en toda la plataforma.", status: "in-progress", phase: 1 }
        ],
        functionality: [
          "Los usuarios pueden explorar y buscar cursos en un catálogo intuitivo.",
          "Los estudiantes pueden ver lecciones y seguir su progreso.",
          "La plataforma es accesible y usable en diferentes dispositivos e idiomas."
        ],
        milestone: "Versión beta lista para pruebas con usuarios seleccionados."
      }
    ];
  } catch (error) {
    console.error('Error fetching roadmap data:', error);
    toast.error('No se pudieron cargar los datos del roadmap');
    return [];
  }
};

// Función para actualizar el roadmap
export const updateRoadmapTask = async (
  taskId: string, 
  newStatus: TaskStatus
): Promise<boolean> => {
  try {
    // Check if we're using database or mock data
    const { data, error: checkError } = await supabase
      .from('roadmap_tasks')
      .select('id')
      .eq('id', taskId)
      .limit(1);
      
    if (checkError) {
      console.error('Error checking for task:', checkError);
      throw checkError;
    }
    
    // If the task exists in database, update it
    if (data && data.length > 0) {
      const { error } = await supabase
        .from('roadmap_tasks')
        .update({ status: newStatus })
        .eq('id', taskId);
        
      if (error) {
        console.error('Error updating task in Supabase:', error);
        throw error;
      }
      
      return true;
    }
    
    // If not using database yet, just return success (mock update)
    return true;
  } catch (error) {
    console.error('Error updating roadmap task:', error);
    toast.error('No se pudo actualizar la tarea del roadmap');
    return false;
  }
};

// Función para exportar el contenido del roadmap (en un caso real, esto podría actualizar directamente el archivo)
export const exportRoadmapToMarkdown = async (phases: RoadmapPhase[]): Promise<string> => {
  try {
    const markdown = generateRoadmapMarkdown(phases);
    
    // En un caso real, esto enviaría el markdown al backend para actualizar el archivo
    // Por ahora solo devolvemos el contenido generado
    
    toast.success('Contenido del roadmap generado correctamente');
    return markdown;
  } catch (error) {
    console.error('Error exporting roadmap to markdown:', error);
    toast.error('No se pudo generar el contenido del roadmap');
    return '';
  }
};

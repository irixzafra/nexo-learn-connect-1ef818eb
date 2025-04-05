
import React from 'react';
import { SidebarContent as ShadcnSidebarContent } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import CursosNavigation from './navigation/CursosNavigation';
import MisCursosNavigation from './navigation/MisCursosNavigation';
import AprendizajeNavigation from './navigation/AprendizajeNavigation';

const CustomSidebarContent: React.FC = () => {
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = React.useState({
    cursos: true,
    misCursos: true,
    aprendizaje: true,
  });

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <ShadcnSidebarContent>
      <div className="space-y-2">
        <CursosNavigation
          isOpen={openGroups.cursos}
          onToggle={() => toggleGroup('cursos')}
        />
        <MisCursosNavigation
          isOpen={openGroups.misCursos}
          onToggle={() => toggleGroup('misCursos')}
        />
        <AprendizajeNavigation
          isOpen={openGroups.aprendizaje}
          onToggle={() => toggleGroup('aprendizaje')}
        />
      </div>
    </ShadcnSidebarContent>
  );
};

export default CustomSidebarContent;

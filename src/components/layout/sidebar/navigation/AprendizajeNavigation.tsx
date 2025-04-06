
import React from 'react';
import { BookOpen, Award, GraduationCap, Lightbulb } from 'lucide-react';
import MenuItem from '@/components/layout/sidebar/navigation/common/MenuItem';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';

interface AprendizajeNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AprendizajeNavigation: React.FC<AprendizajeNavigationProps> = ({ 
  isOpen,
  onToggle 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="px-3 py-2">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span>Aprendizaje</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-1 space-y-1 px-1">
          <MenuItem
            to="/app/learning/path"
            icon={BookOpen}
            label="Rutas de Aprendizaje"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/app/certificates"
            icon={Award}
            label="Certificados"
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/app/recommendations"
            icon={Lightbulb}
            label="Recomendaciones"
            isCollapsed={isCollapsed}
          />
        </div>
      )}
    </div>
  );
};

export default AprendizajeNavigation;

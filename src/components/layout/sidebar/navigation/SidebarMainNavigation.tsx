
import React, { useState } from 'react';
import DashboardNavigation from './DashboardNavigation';
import EstudianteNavigation from './EstudianteNavigation';
import CursosNavigation from './CursosNavigation';
import ComunidadNavigation from './ComunidadNavigation';
import CalendarNavigation from './CalendarNavigation';
import ConfiguracionNavigation from './ConfiguracionNavigation';
import AdminNavigation from './AdminNavigation';
import GamificationNavigation from './GamificationNavigation';

interface SidebarMainNavigationProps {
  isCollapsed: boolean;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ isCollapsed }) => {
  const [openSections, setOpenSections] = useState({
    dashboard: true,
    estudiante: true,
    cursos: false,
    comunidad: false,
    calendar: false,
    gamification: false,
    admin: false,
    configuracion: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-1">
      <DashboardNavigation 
        isOpen={openSections.dashboard} 
        onToggle={() => toggleSection('dashboard')} 
      />
      
      <EstudianteNavigation 
        isOpen={openSections.estudiante} 
        onToggle={() => toggleSection('estudiante')} 
      />
      
      <CursosNavigation 
        isOpen={openSections.cursos} 
        onToggle={() => toggleSection('cursos')} 
      />
      
      <ComunidadNavigation 
        isOpen={openSections.comunidad} 
        onToggle={() => toggleSection('comunidad')} 
        messagesCount={3}
      />
      
      <CalendarNavigation 
        isOpen={openSections.calendar} 
        onToggle={() => toggleSection('calendar')} 
      />
      
      <GamificationNavigation 
        isOpen={openSections.gamification} 
        onToggle={() => toggleSection('gamification')} 
      />
      
      <AdminNavigation 
        isOpen={openSections.admin} 
        onToggle={() => toggleSection('admin')} 
      />
      
      <ConfiguracionNavigation 
        isOpen={openSections.configuracion} 
        onToggle={() => toggleSection('configuracion')} 
      />
    </div>
  );
};

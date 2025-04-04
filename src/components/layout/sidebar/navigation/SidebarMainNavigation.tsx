
import React, { useState } from 'react';
import { UserRoleType } from '@/types/auth';
import { getNavigationByRole } from '@/config/navigation/roleBasedNavigation';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import NavGroup from '@/components/navigation/NavGroup';
import NavItem from '@/components/navigation/NavItem';
import NavDivider from '@/components/navigation/NavDivider';
import { LucideIcon } from 'lucide-react';

interface SidebarMainNavigationProps {
  isCollapsed?: boolean;
  effectiveRole?: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ 
  isCollapsed = false,
  effectiveRole = 'student',
}) => {
  const { state } = useSidebar();
  const sidebarCollapsed = isCollapsed || state === "collapsed";
  
  // Estado para controlar qué secciones están expandidas (por defecto, dashboard y primera sección)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Determinar qué secciones expandir por defecto según el rol
    const initialExpanded: Record<string, boolean> = { dashboard: true };
    
    // Para cada rol, expandir una sección adicional específica
    if (effectiveRole === 'admin') initialExpanded.academic = true;
    if (effectiveRole === 'instructor') initialExpanded.academicManagement = true;
    if (effectiveRole === 'student') initialExpanded.community = true;
    
    return initialExpanded;
  });
  
  // Toggle para expandir/contraer una sección
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Obtener la navegación específica para el rol actual
  const roleNavigation = getNavigationByRole(effectiveRole);
  
  // Si no hay navegación para este rol, no renderizar nada
  if (!roleNavigation) return null;

  // Función helper para renderizar un elemento de navegación
  const renderNavItem = (item: {
    icon?: LucideIcon;
    label: string;
    path?: string;
    badge?: number;
    isHighlighted?: boolean;
    disabled?: boolean;
  }) => {
    return (
      <NavItem 
        key={item.path || item.label}
        href={item.path || '#'} 
        title={item.label}
        icon={item.icon}
        badge={item.badge}
        isCollapsed={sidebarCollapsed}
        disabled={item.disabled}
        tooltip={item.label}
      />
    );
  };

  return (
    <div className="space-y-2 px-2">
      {/* Renderizar todas las secciones de navegación para el rol */}
      {Object.entries(roleNavigation).map(([sectionId, items], index) => {
        // Si no hay elementos en esta sección o está vacía, no renderizar
        if (!items || items.length === 0) return null;
        
        // Si no es dashboard y es la primera sección después de dashboard, añadir un separador
        const needsDivider = sectionId !== 'dashboard' && index === 1;
        
        // Título de la sección (convertir camelCase a Title Case)
        const sectionTitle = sectionId
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        
        // Obtener el primer icono de la sección para usarlo como icono de grupo
        const sectionIcon = items.length > 0 ? items[0].icon : undefined;
        
        return (
          <React.Fragment key={sectionId}>
            {needsDivider && <NavDivider />}
            
            <NavGroup
              title={sectionTitle}
              icon={sectionIcon}
              defaultExpanded={expandedSections[sectionId]}
              isCollapsed={sidebarCollapsed}
            >
              {items.map(item => renderNavItem(item))}
            </NavGroup>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SidebarMainNavigation;

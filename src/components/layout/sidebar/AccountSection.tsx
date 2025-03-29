
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { Info, HelpCircle } from 'lucide-react';

interface AccountSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const AccountSection: React.FC<AccountSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Cuenta" 
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/about-us" icon={Info} label="Acerca de Nosotros" />
      <MenuItem to="/help" icon={HelpCircle} label="Ayuda" disabled={true} />
    </SidebarGroup>
  );
};

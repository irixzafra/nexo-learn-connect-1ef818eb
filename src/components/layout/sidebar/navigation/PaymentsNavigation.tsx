
import React from 'react';
import { CreditCard, Receipt } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface PaymentsNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const PaymentsNavigation: React.FC<PaymentsNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Pagos"
      icon={CreditCard}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/invoices"
          icon={Receipt}
          label="Mis Facturas"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default PaymentsNavigation;

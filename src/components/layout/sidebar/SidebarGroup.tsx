
import React, { useState } from 'react';
import { 
  SidebarGroup as UISidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu
} from '@/components/ui/sidebar';

interface SidebarGroupProps {
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ 
  label, 
  isExpanded, 
  onToggle, 
  children 
}) => {
  return (
    <UISidebarGroup>
      <GroupLabel 
        label={label} 
        isExpanded={isExpanded} 
        onClick={onToggle} 
      />
      {isExpanded && (
        <SidebarGroupContent>
          <SidebarMenu>
            {children}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </UISidebarGroup>
  );
};

interface GroupLabelProps {
  label: string;
  isExpanded: boolean;
  onClick: () => void;
}

const GroupLabel: React.FC<GroupLabelProps> = ({ label, isExpanded, onClick }) => (
  <SidebarGroupLabel 
    onClick={onClick}
    className="cursor-pointer flex items-center justify-between px-2 py-2 text-sm font-medium transition-colors hover:text-primary"
  >
    {label}
    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </SidebarGroupLabel>
);

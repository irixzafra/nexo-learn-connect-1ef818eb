
import React from 'react';

interface SidebarMenuProps {
  children: React.ReactNode;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => (
  <nav className="grid gap-1">{children}</nav>
);

interface SidebarMenuItemProps {
  children: React.ReactNode;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ children }) => (
  <div className="rounded-md hover:bg-secondary">
    {children}
  </div>
);

interface SidebarMenuButtonProps {
  children: React.ReactNode;
}

export const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({ children }) => (
  <div className="px-3 py-2 text-sm font-medium transition-colors hover:text-foreground">
    {children}
  </div>
);

interface SidebarGroupProps {
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ children }) => (
  <div>{children}</div>
);

interface SidebarGroupLabelProps {
  children: React.ReactNode;
}

export const SidebarGroupLabel: React.FC<SidebarGroupLabelProps> = ({ children }) => (
  <div className="mb-2 px-4 text-sm font-semibold opacity-75">{children}</div>
);

interface SidebarGroupContentProps {
  children: React.ReactNode;
}

export const SidebarGroupContent: React.FC<SidebarGroupContentProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

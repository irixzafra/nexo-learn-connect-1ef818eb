
import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import SidebarNavGroup from './SidebarNavGroup';
import { Home, Book, Users, Settings, Activity } from 'lucide-react';

// Wrapper para proporcionar el contexto necesario
const SidebarContextWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-64 p-4 border rounded-md bg-background">
    {children}
  </div>
);

// Mock simple para los hooks
const mockLocation = { pathname: '/app/dashboard' };
const mockSidebar = { state: 'expanded' };

// En Storybook no necesitamos jest.mock, podemos simular el comportamiento 
// directamente en el componente wrapper o usando el decorador

const meta: Meta<typeof SidebarNavGroup> = {
  title: "Components/Layout/SidebarNavGroup",
  component: SidebarNavGroup,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: 'light',
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarContextWrapper>
        <Story />
      </SidebarContextWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarNavGroup>;

export const Default: Story = {
  args: {
    title: "Dashboard",
    icon: Activity,
    defaultOpen: true,
    id: "dashboard",
    items: [
      { label: "Home", path: "/app/dashboard", icon: Home },
      { label: "Analytics", path: "/app/analytics", icon: Activity },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    title: "Dashboard",
    icon: Activity,
    defaultOpen: false,
    id: "dashboard",
    items: [
      { label: "Home", path: "/app/dashboard", icon: Home },
      { label: "Analytics", path: "/app/analytics", icon: Activity },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    title: "Management",
    icon: Settings,
    defaultOpen: true,
    id: "management",
    items: [
      { label: "Messages", path: "/app/messages", icon: Book, badge: 5 },
      { label: "Users", path: "/app/users", icon: Users, badge: 0 },
      { label: "Settings", path: "/app/settings", icon: Settings },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    title: "Features",
    icon: Book,
    defaultOpen: true,
    id: "features",
    items: [
      { label: "Current", path: "/app/features/current", icon: Activity },
      { label: "Coming Soon", path: "/app/features/upcoming", icon: Book, disabled: true },
      { label: "Beta Access", path: "/app/features/beta", icon: Users, disabled: true, badge: 3 },
    ],
  },
};

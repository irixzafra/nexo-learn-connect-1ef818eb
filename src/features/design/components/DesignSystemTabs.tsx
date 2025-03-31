
import React from 'react';
import { List, Palette, Type, Maximize, Code, Wand2 } from 'lucide-react';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { ColorPaletteTab } from './tabs/ColorPaletteTab';
import { TypographyTab } from './tabs/TypographyTab';
import { SpacingTab } from './tabs/SpacingTab';
import { CustomCSSTab } from './tabs/CustomCSSTab';
import { AIDesignAssistantTab } from './tabs/AIDesignAssistantTab';
import { ThemeOverviewTab } from './tabs/ThemeOverviewTab';

const DesignSystemTabs: React.FC = () => {
  const tabs: AdminTabItem[] = [
    {
      value: 'overview',
      label: 'Vista General',
      icon: <List className="h-4 w-4" />,
      content: <ThemeOverviewTab />
    },
    {
      value: 'colors',
      label: 'Colores',
      icon: <Palette className="h-4 w-4" />,
      content: <ColorPaletteTab />
    },
    {
      value: 'typography',
      label: 'Tipografía',
      icon: <Type className="h-4 w-4" />,
      content: <TypographyTab />
    },
    {
      value: 'spacing',
      label: 'Espaciado',
      icon: <Maximize className="h-4 w-4" />,
      content: <SpacingTab />
    },
    {
      value: 'custom-css',
      label: 'CSS Personalizado',
      icon: <Code className="h-4 w-4" />,
      content: <CustomCSSTab />
    },
    {
      value: 'ai-assistant',
      label: 'Asistente IA',
      icon: <Wand2 className="h-4 w-4" />,
      content: <AIDesignAssistantTab />
    }
  ];

  return <AdminNavTabs tabs={tabs} defaultValue="overview" />;
};

export default DesignSystemTabs;

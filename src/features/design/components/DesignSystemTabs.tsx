
import React from 'react';
import { List, Palette, Type, Maximize, Code, Wand2, BookTemplate, LayoutTemplate } from 'lucide-react';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { ColorPaletteTab } from './tabs/ColorPaletteTab';
import { TypographyTab } from './tabs/TypographyTab';
import { SpacingTab } from './tabs/SpacingTab';
import { CustomCSSTab } from './tabs/CustomCSSTab';
import AIDesignAssistantTab from './tabs/AIDesignAssistantTab';
import { ThemeOverviewTab } from './tabs/ThemeOverviewTab';
import { ThemePresetsTab } from './tabs/ThemePresetsTab';
import { ComponentAccordionTab } from './tabs/ComponentAccordionTab';
import { useDesignSystem } from '@/contexts/DesignSystemContext';

const DesignSystemTabs: React.FC = () => {
  const { designFeatureEnabled } = useDesignSystem();
  
  if (!designFeatureEnabled) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6 bg-muted/20 rounded-lg border border-border">
        <BookTemplate className="w-16 h-16 text-muted-foreground/50" />
        <div className="text-center max-w-md space-y-2">
          <h3 className="text-xl font-medium">Sistema de Diseño Desactivado</h3>
          <p className="text-muted-foreground">
            El sistema de diseño está actualmente desactivado. Puede habilitarlo desde la configuración del sistema.
          </p>
        </div>
      </div>
    );
  }

  const tabs: AdminTabItem[] = [
    {
      value: 'overview',
      label: 'Vista General',
      icon: <List className="h-4 w-4" />,
      content: <ThemeOverviewTab />
    },
    {
      value: 'presets',
      label: 'Presets',
      icon: <BookTemplate className="h-4 w-4" />,
      content: <ThemePresetsTab />
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
      value: 'components',
      label: 'Componentes',
      icon: <LayoutTemplate className="h-4 w-4" />,
      content: <ComponentAccordionTab />
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

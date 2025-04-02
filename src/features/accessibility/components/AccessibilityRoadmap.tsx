
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Lightbulb, Accessibility } from "lucide-react";
import { useFeature } from '@/hooks/useFeature';
import { useLocalization } from '@/hooks/useLocalization';
import { useAccessibility } from '@/hooks/useAccessibility';
import SafeLink from '@/components/SafeLink';

interface RoadmapItem {
  title: string;
  description: string;
  status: 'implemented' | 'in-progress' | 'planned' | 'under-review';
  priority: 'high' | 'medium' | 'low';
  completionPercentage?: number;
  targetRelease?: string;
  link?: string;
}

export const AccessibilityRoadmap: React.FC = () => {
  const { t } = useLocalization();
  const { isHighContrastEnabled } = useAccessibility();
  const enableAdvancedAccessibility = useFeature('enableAdvancedAccessibility');
  
  const roadmapItems: Record<string, RoadmapItem[]> = {
    current: [
      {
        title: t('accessibility.roadmap.highContrast.title', { default: 'High Contrast Mode' }),
        description: t('accessibility.roadmap.highContrast.description', { 
          default: 'Enhances visibility for users with visual impairments by increasing contrast between elements' 
        }),
        status: 'implemented',
        priority: 'high',
        completionPercentage: 100
      },
      {
        title: t('accessibility.roadmap.textResize.title', { default: 'Text Size Adjustment' }),
        description: t('accessibility.roadmap.textResize.description', { 
          default: 'Allows users to adjust text size for better readability' 
        }),
        status: 'implemented',
        priority: 'high',
        completionPercentage: 100
      },
      {
        title: t('accessibility.roadmap.reduceMotion.title', { default: 'Reduced Motion' }),
        description: t('accessibility.roadmap.reduceMotion.description', { 
          default: 'Minimizes animations for users sensitive to motion' 
        }),
        status: 'implemented',
        priority: 'high',
        completionPercentage: 100
      }
    ],
    upcoming: [
      {
        title: t('accessibility.roadmap.screenReader.title', { default: 'Screen Reader Optimization' }),
        description: t('accessibility.roadmap.screenReader.description', { 
          default: 'Enhanced support for screen readers with improved ARIA landmarks and descriptions' 
        }),
        status: 'in-progress',
        priority: 'high',
        completionPercentage: 65,
        targetRelease: 'Q2 2023'
      },
      {
        title: t('accessibility.roadmap.keyboardNavigation.title', { default: 'Advanced Keyboard Navigation' }),
        description: t('accessibility.roadmap.keyboardNavigation.description', { 
          default: 'Improved keyboard shortcuts and focus management for keyboard-only users' 
        }),
        status: 'in-progress',
        priority: 'medium',
        completionPercentage: 40,
        targetRelease: 'Q3 2023'
      },
      {
        title: t('accessibility.roadmap.colorBlind.title', { default: 'Color Blindness Support' }),
        description: t('accessibility.roadmap.colorBlind.description', { 
          default: 'Multiple color themes optimized for different types of color blindness' 
        }),
        status: 'planned',
        priority: 'medium',
        targetRelease: 'Q3 2023'
      }
    ],
    future: [
      {
        title: t('accessibility.roadmap.voiceControl.title', { default: 'Voice Control Integration' }),
        description: t('accessibility.roadmap.voiceControl.description', { 
          default: 'Control the platform using voice commands for motor-impaired users' 
        }),
        status: 'planned',
        priority: 'medium',
        targetRelease: 'Q4 2023'
      },
      {
        title: t('accessibility.roadmap.realTimeCaption.title', { default: 'Real-time Captioning' }),
        description: t('accessibility.roadmap.realTimeCaption.description', { 
          default: 'Automatic captioning for video content and live sessions' 
        }),
        status: 'under-review',
        priority: 'medium',
        targetRelease: 'Q1 2024'
      },
      {
        title: t('accessibility.roadmap.cognitiveTools.title', { default: 'Cognitive Accessibility Tools' }),
        description: t('accessibility.roadmap.cognitiveTools.description', { 
          default: 'Reading guides, focus aids, and simplified views for cognitive disabilities' 
        }),
        status: 'planned',
        priority: 'low',
        targetRelease: 'Q2 2024'
      },
      {
        title: t('accessibility.roadmap.customShortcuts.title', { default: 'Customizable Shortcuts' }),
        description: t('accessibility.roadmap.customShortcuts.description', { 
          default: 'Allow users to customize keyboard shortcuts to their preferences' 
        }),
        status: 'planned',
        priority: 'low',
        targetRelease: 'Q2 2024'
      }
    ]
  };

  const getStatusIcon = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'implemented':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'planned':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'under-review':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'implemented':
        return t('accessibility.roadmap.status.implemented', { default: 'Implemented' });
      case 'in-progress':
        return t('accessibility.roadmap.status.inProgress', { default: 'In Progress' });
      case 'planned':
        return t('accessibility.roadmap.status.planned', { default: 'Planned' });
      case 'under-review':
        return t('accessibility.roadmap.status.underReview', { default: 'Under Review' });
      default:
        return '';
    }
  };

  const getPriorityBadge = (priority: RoadmapItem['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            {t('accessibility.roadmap.priority.high', { default: 'High Priority' })}
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            {t('accessibility.roadmap.priority.medium', { default: 'Medium Priority' })}
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            {t('accessibility.roadmap.priority.low', { default: 'Low Priority' })}
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderRoadmapItem = (item: RoadmapItem) => (
    <Card key={item.title} className={`mb-4 border-l-4 ${
      item.status === 'implemented' ? 'border-l-green-500' :
      item.status === 'in-progress' ? 'border-l-blue-500' :
      item.status === 'planned' ? 'border-l-amber-500' : 'border-l-purple-500'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {getStatusIcon(item.status)}
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className={`${
                item.status === 'implemented' ? 'bg-green-100 text-green-800 border-green-200' :
                item.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                item.status === 'planned' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                'bg-purple-100 text-purple-800 border-purple-200'
              }`}>
                {getStatusText(item.status)}
              </Badge>
              {getPriorityBadge(item.priority)}
              {item.targetRelease && (
                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                  {item.targetRelease}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-foreground/70 mt-1">
          {item.description}
        </CardDescription>
        
        {item.completionPercentage !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>{t('accessibility.roadmap.completion', { default: 'Completion' })}</span>
              <span>{item.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${item.completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {item.link && (
          <div className="mt-3">
            <SafeLink 
              to={item.link} 
              className="text-sm text-primary hover:underline"
            >
              {t('accessibility.roadmap.learnMore', { default: 'Learn more' })}
            </SafeLink>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!enableAdvancedAccessibility) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-primary" />
            <CardTitle>{t('accessibility.roadmap.title', { default: 'Accessibility Roadmap' })}</CardTitle>
          </div>
          <CardDescription>
            {t('accessibility.roadmap.advancedDisabled', { 
              default: 'Advanced accessibility features are currently disabled. Enable them in the settings to view the complete roadmap.'
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SafeLink 
            to="/admin/settings/features" 
            className="text-primary hover:underline"
          >
            {t('accessibility.roadmap.enableFeatures', { default: 'Go to Features Settings' })}
          </SafeLink>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={isHighContrastEnabled ? 'border-2 border-primary' : ''}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Accessibility className="h-5 w-5 text-primary" />
          <CardTitle>{t('accessibility.roadmap.title', { default: 'Accessibility Roadmap' })}</CardTitle>
        </div>
        <CardDescription>
          {t('accessibility.roadmap.description', { 
            default: 'Our plan for improving accessibility features across the platform.'
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">
              {t('accessibility.roadmap.tabs.current', { default: 'Current' })}
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              {t('accessibility.roadmap.tabs.upcoming', { default: 'Upcoming' })}
            </TabsTrigger>
            <TabsTrigger value="future">
              {t('accessibility.roadmap.tabs.future', { default: 'Future' })}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="mt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                {t('accessibility.roadmap.tabs.currentDescription', { 
                  default: 'Features that are already implemented and available for use.'
                })}
              </p>
              {roadmapItems.current.map(renderRoadmapItem)}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                {t('accessibility.roadmap.tabs.upcomingDescription', { 
                  default: 'Features that are currently in development or planned for near-term releases.'
                })}
              </p>
              {roadmapItems.upcoming.map(renderRoadmapItem)}
            </div>
          </TabsContent>
          
          <TabsContent value="future" className="mt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                {t('accessibility.roadmap.tabs.futureDescription', { 
                  default: 'Features that are on our long-term roadmap.'
                })}
              </p>
              {roadmapItems.future.map(renderRoadmapItem)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccessibilityRoadmap;
